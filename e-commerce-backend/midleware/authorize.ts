// middleware/authorize.ts

import { RequestHandler } from "express";
import { AuthRequest } from "./auth";

/**
 * authorizeRoles
 *  – prima listu dozvoljenih rola
 *  – vraća Express middleware (RequestHandler) koji proverava `req.user.role`
 */
export const authorizeRoles = (...allowedRoles: string[]): RequestHandler => {
  const fn: RequestHandler = (req, res, next) => {
    const role = (req as AuthRequest).user?.role;
    if (!role || !allowedRoles.includes(role)) {
      res.status(403).json({ message: "Nemate dozvolu za ovu akciju" });
      return;
    }
    next();
  };
  return fn;
};
