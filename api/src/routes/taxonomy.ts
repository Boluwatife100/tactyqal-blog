import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const taxonomyRouter = Router();

taxonomyRouter.get("/categories", async (_req, res) => {
  const rows = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: { where: { status: "PUBLISHED" } } } } },
  });
  res.json(rows.map(({ _count, ...c }) => ({ ...c, postCount: _count.posts })));
});

taxonomyRouter.get("/tags", async (_req, res) => {
  const rows = await prisma.tag.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: { where: { status: "PUBLISHED" } } } } },
  });
  res.json(rows.map(({ _count, ...t }) => ({ ...t, postCount: _count.posts })));
});
