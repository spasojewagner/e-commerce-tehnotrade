import express from "express";
import {
  registerUser,
  loginUser,
  updateProfile,
  getAllUsers,
  getProfile,
  logoutUser,
  checkAuth,
} from "../controllers/userControllers";
import { protectRoute } from "../midleware/auth";

const router = express.Router();

// Public routes

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", protectRoute, getProfile);
router.get("/check-auth", protectRoute,checkAuth);
router.put("/update-profile", protectRoute, updateProfile);
router.post("/logout", protectRoute, logoutUser);

// Admin routes (možeš dodati admin middleware kasnije)
router.get("/", protectRoute, getAllUsers);

export default router;