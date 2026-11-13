import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const secret = () => {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET is not set");
  return s;
};

export const signToken = (userId: string) =>
  jwt.sign({ sub: userId }, secret(), { expiresIn: "7d" });

function readToken(req: Request) {
  const h = req.headers.authorization;
  if (!h?.startsWith("Bearer ")) return null;
  try {
    const payload = jwt.verify(h.slice(7), secret());
    return typeof payload === "object" && payload.sub ? String(payload.sub) : null;
  } catch {
    return null;
  }
}

/** Attaches req.userId if a valid token is present; never rejects. */
export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  req.userId = readToken(req) ?? undefined;
  next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const id = readToken(req);
  if (!id) return res.status(401).json({ error: "Unauthorized" });
  req.userId = id;
  next();
}
