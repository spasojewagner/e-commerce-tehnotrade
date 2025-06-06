import express from 'express';
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  getCart,
  clearCart
} from '../controllers/cartController';
import { protectRoute } from '../midleware/auth'; // prilagodi putanju

const router = express.Router();

router.post   ('/add',      protectRoute, addToCart);
router.delete ('/remove/:productId', protectRoute, removeFromCart);
router.put    ('/update/:productId', protectRoute, updateCartItemQuantity);
router.get    ('/',         protectRoute, getCart);
router.delete ('/clear',    protectRoute, clearCart);

export default router;
