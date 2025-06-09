// middleware/auth.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extended Request interface to include both user ID and role
export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

const COOKIE_NAME = "jwt";
const SECRET = process.env.JWT_SECRET || "tajna-koja-bi-trebala-biti-u-env-fajlu";

/**
 * protectRoute
 *  - čita JWT iz Authorization header-a ili iz HttpOnly cookie-ja
 *  - verifikuje token i iz njega uzima `id` i `role`
 *  - postavlja `req.user = { id, role }`
 *  - u slučaju greške vraća 401
 */
export const protectRoute = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    let token: string | undefined;

    // 1) probamo iz Authorization header-a
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    // 2) ako ga nema u headeru, uzmemo iz cookie-ja
    if (!token && req.cookies && req.cookies[COOKIE_NAME]) {
      token = req.cookies[COOKIE_NAME];
    }

    if (!token) {
      res.status(401).json({ error: "Pristup nije dozvoljen. Nedostaje token." });
      return;
    }

    // 3) Verifikacija tokena i ekstrakcija payload-a
    //    Očekujemo da payload ima oblik { id: string; role: string }
    const decoded = jwt.verify(token, SECRET) as { id: string; role: string };

    // 4) Postavljamo req.user kako bi authorize middleware ili kontroleri mogli da provere rolu
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (err) {
    console.error("Greška u autentifikaciji:", err);
    res.status(401).json({ error: "Pristup nije dozvoljen. Nevažeći token." });
  }
};
