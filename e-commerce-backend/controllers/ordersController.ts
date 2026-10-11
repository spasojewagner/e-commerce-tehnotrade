import { Response } from 'express';
import mongoose from 'mongoose';
import { AuthRequest } from '../midleware/auth';
import { Order } from '../models/orders';
import { Product } from '../models/products';

const ORDER_POPULATE = [
  { path: 'user', select: 'name surname email phone' },
  { path: 'items.product', select: 'name price sku images brand' },
];

const VALID_STATUSES = ['pending', 'processing', 'completed', 'cancelled'] as const;

const isAdmin = (req: AuthRequest) => req.user?.role === 'admin';
const ownsOrder = (req: AuthRequest, order: { user: unknown }) => String(order.user) === req.user?.id;

/** Puts stock back for the given lines. Used on cancellation and when an order fails half way. */
async function restock(items: Array<{ product: unknown; quantity: number }>) {
  for (const item of items) {
    await Product.updateOne({ _id: item.product }, { $inc: { stock: item.quantity } });
  }
}

// Kreiranje porudžbine
export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // The order always belongs to the signed-in user; a userId in the body is ignored.
    const userId = req.user!.id;
    const { items, shippingAddress } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: 'Nedostaju stavke porudžbine' });
      return;
    }
    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.postalCode) {
      res.status(400).json({ message: 'Nedostaju podaci o adresi dostave' });
      return;
    }

    // Merge duplicate lines and validate them before touching any stock.
    const quantities = new Map<string, number>();
    for (const item of items) {
      const quantity = Number(item?.quantity);
      if (!item?.product || !mongoose.Types.ObjectId.isValid(item.product) || !Number.isInteger(quantity) || quantity <= 0) {
        res.status(400).json({ message: 'Neispravni podaci o stavkama porudžbine' });
        return;
      }
      quantities.set(String(item.product), (quantities.get(String(item.product)) ?? 0) + quantity);
    }

    // Take stock line by line with a conditional update, so two buyers can never both get the last unit.
    // If a line fails, everything taken so far is returned.
    const taken: Array<{ product: mongoose.Types.ObjectId; quantity: number; priceAtTime: number }> = [];
    for (const [productId, quantity] of quantities) {
      const product = await Product.findOneAndUpdate(
        { _id: productId, stock: { $gte: quantity } },
        { $inc: { stock: -quantity } },
        { new: true },
      );
      if (!product) {
        await restock(taken);
        const existing = await Product.findById(productId).select('name stock');
        if (!existing) {
          res.status(404).json({ message: `Proizvod sa ID ${productId} nije pronađen` });
        } else {
          res.status(400).json({
            message: `Nedovoljno na stanju za proizvod ${existing.name}. Dostupno: ${existing.stock}, traženo: ${quantity}`,
          });
        }
        return;
      }
      // Prices always come from the database, never from the client.
      taken.push({ product: product._id as mongoose.Types.ObjectId, quantity, priceAtTime: product.price });
    }

    const totalAmount = taken.reduce((sum, line) => sum + line.priceAtTime * line.quantity, 0);

    let order;
    try {
      order = await Order.create({
        user: userId,
        items: taken,
        shippingAddress: {
          street: shippingAddress.street,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country || 'Srbija',
          phone: shippingAddress.phone,
          note: shippingAddress.note,
        },
        totalAmount,
        status: 'pending',
      });
    } catch (error) {
      await restock(taken);
      throw error;
    }

    const populatedOrder = await Order.findById(order._id).populate(ORDER_POPULATE);
    res.status(201).json({ message: 'Porudžbina je uspešno kreirana', order: populatedOrder });
  } catch (error) {
    console.error('Greška pri kreiranju porudžbine:', error);
    res.status(500).json({ message: 'Greška pri kreiranju porudžbine' });
  }
};

// Porudžbine jednog korisnika: svoje, ili bilo čije za admina
export const getUserOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: 'Nevaljan ID korisnika' });
      return;
    }
    if (userId !== req.user?.id && !isAdmin(req)) {
      res.status(403).json({ message: 'Nemate dozvolu za ovu akciju' });
      return;
    }

    const orders = await Order.find({ user: userId }).populate(ORDER_POPULATE).sort({ createdAt: -1 });
    res.status(200).json({ message: 'Porudžbine korisnika uspešno učitane', orders });
  } catch (error) {
    console.error('Greška pri učitavanju porudžbina korisnika:', error);
    res.status(500).json({ message: 'Greška pri učitavanju porudžbina' });
  }
};

// Sve porudžbine (admin)
export const getAllOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
    const { status } = req.query;

    const query: Record<string, unknown> = {};
    if (typeof status === 'string' && (VALID_STATUSES as readonly string[]).includes(status)) {
      query.status = status;
    }

    const [orders, totalOrders] = await Promise.all([
      Order.find(query)
        .populate(ORDER_POPULATE)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit),
      Order.countDocuments(query),
    ]);

    res.status(200).json({
      message: 'Sve porudžbine uspešno učitane',
      orders,
      pagination: { currentPage: page, totalPages: Math.ceil(totalOrders / limit), totalOrders },
    });
  } catch (error) {
    console.error('Greška pri učitavanju svih porudžbina:', error);
    res.status(500).json({ message: 'Greška pri učitavanju porudžbina' });
  }
};

// Jedna porudžbina: vlasnik ili admin. Ostali dobijaju 404, da se ID-jevi ne bi mogli pogađati.
export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ message: 'Nevaljan ID porudžbine' });
      return;
    }

    const order = await Order.findById(orderId);
    if (!order || (!ownsOrder(req, order) && !isAdmin(req))) {
      res.status(404).json({ message: 'Porudžbina nije pronađena' });
      return;
    }

    await order.populate(ORDER_POPULATE);
    res.status(200).json({ message: 'Porudžbina uspešno učitana', order });
  } catch (error) {
    console.error('Greška pri učitavanju porudžbine:', error);
    res.status(500).json({ message: 'Greška pri učitavanju porudžbine' });
  }
};

// Promena statusa (admin). Otkazivanje vraća robu na stanje; otkazana porudžbina se ne može ponovo otvoriti.
export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ message: 'Nevaljan ID porudžbine' });
      return;
    }
    if (!(VALID_STATUSES as readonly string[]).includes(status)) {
      res.status(400).json({ message: 'Nevaljan status porudžbine' });
      return;
    }

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: 'Porudžbina nije pronađena' });
      return;
    }
    if (order.status === 'cancelled' && status !== 'cancelled') {
      res.status(400).json({ message: 'Otkazana porudžbina ne može ponovo da se otvori' });
      return;
    }

    if (status === 'cancelled' && order.status !== 'cancelled') await restock(order.items);
    order.status = status;
    await order.save();
    await order.populate(ORDER_POPULATE);

    res.status(200).json({ message: 'Status porudžbine je uspešno ažuriran', order });
  } catch (error) {
    console.error('Greška pri ažuriranju statusa porudžbine:', error);
    res.status(500).json({ message: 'Greška pri ažuriranju statusa porudžbine' });
  }
};

// Brisanje: kupac može da povuče svoju porudžbinu dok je na čekanju, admin može da obriše bilo koju.
export const deleteOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ message: 'Nevaljan ID porudžbine' });
      return;
    }

    const order = await Order.findById(orderId);
    if (!order || (!ownsOrder(req, order) && !isAdmin(req))) {
      res.status(404).json({ message: 'Porudžbina nije pronađena' });
      return;
    }
    if (!isAdmin(req) && order.status !== 'pending') {
      res.status(400).json({ message: 'Porudžbina je već u obradi i ne može se obrisati' });
      return;
    }

    // Robu vraćamo na stanje ako porudžbina nije završena niti već otkazana.
    if (order.status !== 'completed' && order.status !== 'cancelled') await restock(order.items);
    await order.deleteOne();

    res.status(200).json({ message: 'Porudžbina je uspešno obrisana' });
  } catch (error) {
    console.error('Greška pri brisanju porudžbine:', error);
    res.status(500).json({ message: 'Greška pri brisanju porudžbine' });
  }
};
