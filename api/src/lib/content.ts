import slugify from "slugify";
import { prisma } from "./prisma.js";

export const toSlug = (s: string) => slugify(s, { lower: true, strict: true, trim: true });

export const readTime = (markdown: string) =>
  Math.max(1, Math.ceil(markdown.trim().split(/\s+/).length / 200));

/** Returns a post slug that is unique, appending -2, -3... on collision. */
export async function uniquePostSlug(title: string, ignoreId?: string) {
  const base = toSlug(title) || "post";
  let slug = base;
  let n = 2;
  for (;;) {
    const hit = await prisma.post.findUnique({ where: { slug }, select: { id: true } });
    if (!hit || hit.id === ignoreId) return slug;
    slug = `${base}-${n++}`;
  }
}
