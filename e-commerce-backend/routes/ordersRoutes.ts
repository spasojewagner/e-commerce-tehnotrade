// routes/orders.ts

import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  deleteOrder,
  getOrderById,
  updateOrderStatus
} from "../controllers/ordersController";
import { protectRoute } from "../midleware/auth";
import { authorizeRoles } from "../midleware/authorize";

const router = express.Router();
console.log('[ordersRoutes] module loaded');

// ------------------------------------------
// Apply authentication to all routes
// ------------------------------------------
router.use(protectRoute);

// ------------------------------------------  
// Admin-only routes (specific paths to avoid conflicts)
// ------------------------------------------
router.get(
  "/admin/all",
  authorizeRoles("admin"),
  (req, res, next) => {
    console.log(">>> getAllOrders, req.user =", (req as any).user);
    next();
  },
  getAllOrders
);

router.put("/:orderId/status", authorizeRoles("admin"), updateOrderStatus);

// ------------------------------------------
// Routes available to ALL authenticated users  
// ------------------------------------------
router.post("/", createOrder);
router.get("/user/:userId", getUserOrders);
router.delete("/:orderId", deleteOrder);

// This should come last to avoid conflicts with other routes
router.get("/:orderId", getOrderById);

export default router;