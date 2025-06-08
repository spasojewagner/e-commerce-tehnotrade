import { Request, Response } from 'express';
import { Order, IOrder } from '../models/orders';
import { Product } from '../models/products';
import User from '../models/User';
import mongoose from 'mongoose';

// Kreiranje porudžbine
// Kreiranje porudžbine
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Received order data:', req.body); // Debug log

    const { userId, items, shippingAddress } = req.body;

    // Validacija obaveznih polja
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      console.log('Missing required fields:', { userId: !!userId, items: items, itemsLength: items?.length });
      res.status(400).json({ message: 'Nedostaju obavezni podaci (userId, items)' });
      return;
    }

    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.postalCode) {
      console.log('Missing shipping address data:', shippingAddress);
      res.status(400).json({ message: 'Nedostaju podaci o adresi dostave' });
      return;
    }

    // Validacija da li je userId valjan ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log('Invalid userId format:', userId);
      res.status(400).json({ message: 'Nevaljan format ID-a korisnika' });
      return;
    }

    // Validacija da li korisnik postoji
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found:', userId);
      res.status(404).json({ message: 'Korisnik nije pronađen' });
      return;
    }

    // Validacija i priprema stavki porudžbine
    const orderItems: Array<{
      product: mongoose.Types.ObjectId;
      quantity: number;
      priceAtTime: number;
    }> = [];

    let totalAmount = 0;

    for (const item of items) {
      if (!item.product || !item.quantity || item.quantity <= 0) {
        console.log('Invalid item data:', item);
        res.status(400).json({ message: 'Neispravni podaci o stavkama porudžbine' });
        return;
      }

      // Validacija da li je product ID valjan ObjectId
      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        console.log('Invalid product ID format:', item.product);
        res.status(400).json({ message: `Nevaljan format ID-a proizvoda: ${item.product}` });
        return;
      }

      const product = await Product.findById(item.product);
      if (!product) {
        console.log('Product not found:', item.product);
        res.status(404).json({ message: `Proizvod sa ID ${item.product} nije pronađen` });
        return;
      }

      // Provera da li ima dovoljno na stanju
      if (product.stock < item.quantity) {
        console.log('Insufficient stock:', { productId: item.product, available: product.stock, requested: item.quantity });
        res.status(400).json({
          message: `Nedovoljno na stanju za proizvod ${product.name}. Dostupno: ${product.stock}, traženo: ${item.quantity}`
        });
        return;
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product: new mongoose.Types.ObjectId(item.product),
        quantity: item.quantity,
        priceAtTime: product.price
      });
    }

    console.log('Creating order with data:', {
      userId,
      itemsCount: orderItems.length,
      totalAmount,
      shippingAddress
    });

    // Kreiranje porudžbine
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      shippingAddress: {
        street: shippingAddress.street,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country || 'Srbija',
        phone: shippingAddress.phone,
        note: shippingAddress.note
      },
      totalAmount: totalAmount,
      status: 'pending'
    });

    const savedOrder = await newOrder.save();
    console.log('Order saved successfully:', savedOrder._id);

    // Ažuriranje stanja proizvoda
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Populate porudžbine sa podacima o korisniku i proizvodima
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate('user', 'name surname email')
      .populate('items.product', 'name price sku images brand');

    console.log('Order populated and ready to send');

    res.status(201).json({
      message: 'Porudžbina je uspešno kreirana',
      order: populatedOrder
    });

  } catch (error) {
    console.error('Greška pri kreiranju porudžbine:', error);
    res.status(500).json({
      message: 'Greška pri kreiranju porudžbine',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
// Prikaz porudžbina određenog korisnika
export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    console.log('[Controller] getUserOrders called, userId =', userId);
    // Validacija da li je userId validan ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: 'Nevaljan ID korisnika' });
      return;
    }

    const orders = await Order.find({ user: userId })
      .populate('user', 'name surname email')
      .populate('items.product', 'name price sku images brand')
      .sort({ createdAt: -1 });

    console.log('[Controller] Found orders count =', orders.length);

    res.status(200).json({
      message: 'Porudžbine korisnika uspešno učitane',
      orders: orders
    });

  } catch (error) {
    console.error('Greška pri učitavanju porudžbina korisnika:', error);
    res.status(500).json({ message: 'Greška pri učitavanju porudžbina' });
  }
};

// Prikaz svih porudžbina (za admin)
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query: any = {};
    if (status && typeof status === 'string') {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate('user', 'name surname email phone')
      .populate('items.product', 'name price sku images brand')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const totalOrders = await Order.countDocuments(query);

    res.status(200).json({
      message: 'Sve porudžbine uspešno učitane',
      orders: orders,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalOrders / Number(limit)),
        totalOrders: totalOrders
      }
    });

  } catch (error) {
    console.error('Greška pri učitavanju svih porudžbina:', error);
    res.status(500).json({ message: 'Greška pri učitavanju porudžbina' });
  }
};

// Dobijanje jedne porudžbine po ID-u
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ message: 'Nevaljan ID porudžbine' });
      return;
    }

    const order = await Order.findById(orderId)
      .populate('user', 'name surname email phone')
      .populate('items.product', 'name price sku images brand');

    if (!order) {
      res.status(404).json({ message: 'Porudžbina nije pronađena' });
      return;
    }

    res.status(200).json({
      message: 'Porudžbina uspešno učitana',
      order: order
    });

  } catch (error) {
    console.error('Greška pri učitavanju porudžbine:', error);
    res.status(500).json({ message: 'Greška pri učitavanju porudžbine' });
  }
};

// Ažuriranje statusa porudžbine
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ message: 'Nevaljan ID porudžbine' });
      return;
    }

    const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: 'Nevaljan status porudžbine' });
      return;
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    )
      .populate('user', 'name surname email')
      .populate('items.product', 'name price sku images brand');

    if (!updatedOrder) {
      res.status(404).json({ message: 'Porudžbina nije pronađena' });
      return;
    }

    res.status(200).json({
      message: 'Status porudžbine je uspešno ažuriran',
      order: updatedOrder
    });

  } catch (error) {
    console.error('Greška pri ažuriranju statusa porudžbine:', error);
    res.status(500).json({ message: 'Greška pri ažuriranju statusa porudžbine' });
  }
};

// Brisanje porudžbine
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ message: 'Nevaljan ID porudžbine' });
      return;
    }

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: 'Porudžbina nije pronađena' });
      return;
    }

    // Vraćanje proizvoda na stanje (samo ako porudžbina nije završena)
    if (order.status !== 'completed') {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: item.quantity } }
        );
      }
    }

    await Order.findByIdAndDelete(orderId);

    res.status(200).json({
      message: 'Porudžbina je uspešno obrisana'
    });

  } catch (error) {
    console.error('Greška pri brisanju porudžbine:', error);
    res.status(500).json({ message: 'Greška pri brisanju porudžbine' });
  }
};