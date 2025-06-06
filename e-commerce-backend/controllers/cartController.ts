// controllers/cartController.ts
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';              // prilagodi putanju
import { Product } from '../models/products';   // prilagodi putanju

// Interface za autentifikovani request
interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

// Dodavanje proizvoda u korpu
export async function addToCart(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Niste ulogovani' });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ success: false, message: 'Nevažeći ID proizvoda' });
      return;
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ success: false, message: 'Proizvod nije pronađen' });
      return;
    }
    if (product.stock !== undefined && product.stock < quantity) {
      res.status(400).json({ success: false, message: 'Nema dovoljno proizvoda na stanju' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: 'Korisnik nije pronađen' });
      return;
    }

    const existing = user.cart.find(item => item.product.toString() === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      user.cart.push({
        product: new mongoose.Types.ObjectId(productId),
        quantity,
        addedAt: new Date(),
      });
    }

    await user.save();
    await user.populate('cart.product');
    res.status(200).json({ success: true, message: 'Proizvod dodat u korpu', cart: user.cart });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ success: false, message: 'Serverska greška' });
  }
}

// Uklanjanje proizvoda iz korpe
export async function removeFromCart(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { productId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Niste ulogovani' });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ success: false, message: 'Nevažeći ID proizvoda' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: 'Korisnik nije pronađen' });
      return;
    }

    const idx = user.cart.findIndex(item => item.product.toString() === productId);
    if (idx === -1) {
      res.status(404).json({ success: false, message: 'Proizvod nije u korpi' });
      return;
    }

    // Splice umesto reassigna
    user.cart.splice(idx, 1);
    await user.save();
    await user.populate('cart.product');
    res.status(200).json({ success: true, message: 'Proizvod uklonjen', cart: user.cart });
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(500).json({ success: false, message: 'Serverska greška' });
  }
}

// Ažuriranje količine proizvoda u korpi
export async function updateCartItemQuantity(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Niste ulogovani' });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ success: false, message: 'Nevažeći ID proizvoda' });
      return;
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      res.status(400).json({ success: false, message: 'Količina mora biti pozitivan ceo broj' });
      return;
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ success: false, message: 'Proizvod nije pronađen' });
      return;
    }
    if (product.stock !== undefined && product.stock < quantity) {
      res.status(400).json({ 
        success: false, 
        message: `Nema dovoljno proizvoda na stanju. Dostupno: ${product.stock}` 
      });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: 'Korisnik nije pronađen' });
      return;
    }

    const item = user.cart.find(i => i.product.toString() === productId);
    if (!item) {
      res.status(404).json({ success: false, message: 'Proizvod nije u korpi' });
      return;
    }

    item.quantity = quantity;
    await user.save();
    await user.populate('cart.product');
    res.status(200).json({ success: true, message: 'Količina ažurirana', cart: user.cart });
  } catch (err) {
    console.error('Update quantity error:', err);
    res.status(500).json({ success: false, message: 'Serverska greška' });
  }
}

// Dohvatanje cele korpe
export async function getCart(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Niste ulogovani' });
      return;
    }

    const user = await User.findById(userId).populate('cart.product');
    if (!user) {
      res.status(404).json({ success: false, message: 'Korisnik nije pronađen' });
      return;
    }

    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    console.error('Get cart error:', err);
    res.status(500).json({ success: false, message: 'Serverska greška' });
  }
}

// Brisanje cele korpe
export async function clearCart(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Niste ulogovani' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: 'Korisnik nije pronađen' });
      return;
    }

    // Splice za potpuno čišćenje
    user.cart.splice(0, user.cart.length);
    await user.save();
    res.status(200).json({ success: true, message: 'Korpa obrisana', cart: user.cart });
  } catch (err) {
    console.error('Clear cart error:', err);
    res.status(500).json({ success: false, message: 'Serverska greška' });
  }
}
