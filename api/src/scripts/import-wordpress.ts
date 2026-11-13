/**
 * Imports published posts from a WordPress site via its REST API.
 *
 *   npm run import:wp              # import
 *   npm run import:wp -- --dry     # preview only, writes nothing
 *
 * Env: WP_BASE_URL (default https://tactyqal.com/blog), ADMIN_EMAIL (post author)
 * Idempotent: posts are upserted by their WordPress ID (Post.wpId).
 */
import TurndownService from "turndown";
import { prisma } from "../lib/prisma.js";
import { readTime, toSlug } from "../lib/content.js";

const BASE = (process.env.WP_BASE_URL ?? "https://tactyqal.com/blog").replace(/\/$/, "");
const DRY = process.argv.includes("--dry");

interface WpTerm { name: string; slug: string }
interface WpPost {
  id: number;
  slug: string;
  date_gmt: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: { source_url?: string }[];
    "wp:term"?: WpTerm[][];
  };
}

const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-" });
td.remove(["script", "style", "iframe"]);

const NAMED: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  hellip: "…", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“",
};
const decode = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => NAMED[n.toLowerCase()] ?? m);

const stripHtml = (html: string) => decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

async function fetchPage(page: number) {
  const url = `${BASE}/wp-json/wp/v2/posts?per_page=50&page=${page}&status=publish&_embed=1`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (res.status === 400) return { posts: [] as WpPost[], totalPages: page }; // past the last page
  if (!res.ok) {
    throw new Error(
      `WordPress REST API returned ${res.status} for ${url}. ` +
        `Check WP_BASE_URL, and that /wp-json isn't blocked by a plugin or firewall.`,
    );
  }
  return {
    posts: (await res.json()) as WpPost[],
    totalPages: Number(res.headers.get("x-wp-totalpages") ?? 1),
  };
}

async function uniqueSlug(wantedSlug: string, wpId: number) {
  const hit = await prisma.post.findUnique({ where: { slug: wantedSlug }, select: { wpId: true } });
  return !hit || hit.wpId === wpId ? wantedSlug : `${wantedSlug}-${wpId}`;
}

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@tactyqal.com";
  const author = await prisma.user.findUnique({ where: { email } });
  if (!author) throw new Error(`Author ${email} not found. Run "npm run db:seed" first.`);

  let page = 1;
  let totalPages = 1;
  let imported = 0;

  do {
    const { posts, totalPages: tp } = await fetchPage(page);
    totalPages = tp;

    for (const wp of posts) {
      const title = decode(wp.title.rendered);
      const content = td.turndown(wp.content.rendered).trim();
      const excerpt = stripHtml(wp.excerpt.rendered).slice(0, 400) || content.slice(0, 300);
      const [cats = [], tags = []] = wp._embedded?.["wp:term"] ?? [];
      const category = cats[0];
      const coverImage = wp._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;

      console.log(`${DRY ? "[dry] " : ""}#${wp.id} ${title} (${tags.length} tags${category ? `, ${category.name}` : ""})`);
      if (DRY) continue;

      const data = {
        title,
        excerpt,
        content,
        coverImage,
        status: "PUBLISHED" as const,
        readTimeMin: readTime(content),
        publishedAt: new Date(`${wp.date_gmt}Z`),
        category: category
          ? { connectOrCreate: { where: { slug: category.slug }, create: { name: decode(category.name), slug: category.slug } } }
          : undefined,
        tags: {
          connectOrCreate: tags.map((t) => ({
            where: { slug: toSlug(t.slug || t.name) },
            create: { name: decode(t.name), slug: toSlug(t.slug || t.name) },
          })),
        },
      };

      await prisma.post.upsert({
        where: { wpId: wp.id },
        create: { ...data, wpId: wp.id, slug: await uniqueSlug(wp.slug, wp.id), author: { connect: { id: author.id } } },
        update: data,
      });
      imported++;
    }
    page++;
  } while (page <= totalPages);

  console.log(DRY ? "Dry run complete." : `Imported/updated ${imported} posts.`);
}

main()
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
