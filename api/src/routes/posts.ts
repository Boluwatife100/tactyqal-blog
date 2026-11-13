import { Router } from "express";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { optionalAuth, requireAuth } from "../lib/auth.js";
import { readTime, toSlug, uniquePostSlug } from "../lib/content.js";

export const postsRouter = Router();

const include = {
  category: { select: { name: true, slug: true } },
  tags: { select: { name: true, slug: true } },
  author: { select: { name: true } },
} satisfies Prisma.PostInclude;

const listQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  q: z.string().trim().optional(),
  category: z.string().optional(), // category slug
  tag: z.string().optional(), // tag slug
  status: z.enum(["DRAFT", "PUBLISHED", "ALL"]).optional(), // admin only
});

const postBody = z.object({
  title: z.string().min(3).max(200),
  excerpt: z.string().min(1).max(400),
  content: z.string().min(1),
  coverImage: z.string().url().nullish(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  category: z.string().min(1).nullish(), // category name, created if new
  tags: z.array(z.string().min(1)).default([]), // tag names, created if new
});

const categoryConnect = (name?: string | null) =>
  name
    ? { connectOrCreate: { where: { slug: toSlug(name) }, create: { name, slug: toSlug(name) } } }
    : undefined;

const tagConnect = (names: string[]) =>
  names.map((name) => ({ where: { slug: toSlug(name) }, create: { name, slug: toSlug(name) } }));

// LIST: public sees published only; an authenticated admin can request drafts
postsRouter.get("/", optionalAuth, async (req, res) => {
  const { page, limit, q, category, tag, status } = listQuery.parse(req.query);
  const isAdmin = Boolean(req.userId);

  const where: Prisma.PostWhereInput = {
    status: isAdmin ? (status === "ALL" ? undefined : (status ?? "PUBLISHED")) : "PUBLISHED",
    category: category ? { slug: category } : undefined,
    tags: tag ? { some: { slug: tag } } : undefined,
    OR: q
      ? [
          { title: { contains: q, mode: "insensitive" } },
          { excerpt: { contains: q, mode: "insensitive" } },
          { content: { contains: q, mode: "insensitive" } },
        ]
      : undefined,
  };

  const [total, items] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.findMany({
      where,
      include,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
      omit: { content: true }, // keep list payloads small
    }),
  ]);

  res.json({ items, page, limit, total, totalPages: Math.ceil(total / limit) });
});

// READ: by slug
postsRouter.get("/:slug", optionalAuth, async (req, res) => {
  const post = await prisma.post.findUnique({ where: { slug: String(req.params.slug) }, include });
  if (!post || (post.status !== "PUBLISHED" && !req.userId)) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post);
});

// CREATE
postsRouter.post("/", requireAuth, async (req, res) => {
  const body = postBody.parse(req.body);
  const post = await prisma.post.create({
    data: {
      slug: await uniquePostSlug(body.title),
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage ?? null,
      status: body.status,
      readTimeMin: readTime(body.content),
      publishedAt: body.status === "PUBLISHED" ? new Date() : null,
      author: { connect: { id: req.userId! } },
      category: categoryConnect(body.category),
      tags: { connectOrCreate: tagConnect(body.tags) },
    },
    include,
  });
  res.status(201).json(post);
});

// UPDATE: partial
postsRouter.patch("/:id", requireAuth, async (req, res) => {
  const id = String(req.params.id);
  const body = postBody.partial().parse(req.body);
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ error: "Post not found" });

  const publishing = body.status === "PUBLISHED" && existing.status !== "PUBLISHED";
  const post = await prisma.post.update({
    where: { id },
    data: {
      title: body.title,
      slug: body.title && body.title !== existing.title ? await uniquePostSlug(body.title, id) : undefined,
      excerpt: body.excerpt,
      content: body.content,
      readTimeMin: body.content ? readTime(body.content) : undefined,
      coverImage: body.coverImage,
      status: body.status,
      publishedAt: publishing ? new Date() : body.status === "DRAFT" ? null : undefined,
      category:
        body.category === undefined
          ? undefined
          : body.category
            ? categoryConnect(body.category)
            : { disconnect: true },
      tags: body.tags ? { set: [], connectOrCreate: tagConnect(body.tags) } : undefined,
    },
    include,
  });
  res.json(post);
});

// DELETE
postsRouter.delete("/:id", requireAuth, async (req, res) => {
  await prisma.post.delete({ where: { id: String(req.params.id) } });
  res.status(204).end();
});
