import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, signToken } from "../lib/auth.js";

export const authRouter = Router();

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });

authRouter.post("/login", async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email } });
  const ok = user && (await bcrypt.compare(password, user.passwordHash));
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  res.json({ token: signToken(user.id), user: { id: user.id, email: user.email, name: user.name } });
});

authRouter.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, email: true, name: true },
  });
  res.json(user);
});
