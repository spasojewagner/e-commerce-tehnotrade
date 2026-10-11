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
import { authorizeRoles } from "../midleware/authorize";

const router = express.Router();

// Public routes

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", protectRoute, getProfile);
router.get("/check-auth", protectRoute,checkAuth);
router.put("/update-profile", protectRoute, updateProfile);
router.post("/logout", protectRoute, logoutUser);

// Admin only
router.get("/", protectRoute, authorizeRoles("admin"), getAllUsers);

export default router;