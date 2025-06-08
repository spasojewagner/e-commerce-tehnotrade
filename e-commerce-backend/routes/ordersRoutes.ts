import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  deleteOrder,
  
  getOrderById
} from "../controllers/ordersController";
import { protectRoute } from "../midleware/auth";

const router = express.Router();
console.log('[ordersRoutes] module loaded');
// Protected routes - sve rute zahtevaju autentifikaciju
router.post("/", protectRoute, createOrder);
router.get("/user/:userId", protectRoute, getUserOrders);
router.get("/:orderId", protectRoute, getOrderById);
// router.put("/:orderId", protectRoute, updateOrder);
router.delete("/:orderId", protectRoute, deleteOrder);

// Admin routes (možeš dodati admin middleware kasnije)
router.get("/", protectRoute, getAllOrders);

export default router;