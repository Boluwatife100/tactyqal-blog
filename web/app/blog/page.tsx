import Link from "next/link";
import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { getCategories, getPosts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Blog | Tactyqal Labs",
  description: "Startup ideas, business models and problem-solving guides from Tactyqal Labs.",
};

type Search = { page?: string; q?: string; category?: string };

export default async function BlogPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const [data, categories] = await Promise.all([
    getPosts({ page, q: sp.q, category: sp.category, limit: 12 }),
    getCategories(),
  ]);

  const href = (over: Partial<Search>) => {
    const qs = new URLSearchParams();
    const merged = { ...sp, ...over };
    for (const [k, v] of Object.entries(merged)) if (v) qs.set(k, String(v));
    const s = qs.toString();
    return s ? `/blog?${s}` : "/blog";
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">The Tactyqal Blog</h1>
        <p className="mt-3 text-neutral-600">
          Startup ideas, business models and problem-solving guides for young builders.
        </p>
      </header>

      <form action="/blog" className="mb-6 flex gap-2">
        {sp.category && <input type="hidden" name="category" value={sp.category} />}
        <input
          name="q"
          defaultValue={sp.q}
          placeholder="Search articles…"
          className="w-full max-w-md rounded-lg border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          Search
        </button>
      </form>

      <nav className="mb-10 flex flex-wrap gap-2" aria-label="Categories">
        <Link
          href={href({ category: undefined, page: undefined })}
          className={`rounded-full border px-3 py-1 text-sm ${!sp.category ? "border-indigo-600 bg-indigo-600 text-white" : "border-neutral-300 text-neutral-700 hover:border-indigo-400"}`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={href({ category: c.slug, page: undefined })}
            className={`rounded-full border px-3 py-1 text-sm ${sp.category === c.slug ? "border-indigo-600 bg-indigo-600 text-white" : "border-neutral-300 text-neutral-700 hover:border-indigo-400"}`}
          >
            {c.name} <span className="opacity-60">{c.postCount}</span>
          </Link>
        ))}
      </nav>

      {data.items.length === 0 ? (
        <p className="py-20 text-center text-neutral-500">No articles found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}

      {data.totalPages > 1 && (
        <nav className="mt-12 flex items-center justify-between text-sm" aria-label="Pagination">
          {page > 1 ? (
            <Link href={href({ page: String(page - 1) })} className="rounded-lg border px-4 py-2 hover:bg-neutral-50">
              ← Previous
            </Link>
          ) : (
            <span />
          )}
          <span className="text-neutral-500">
            Page {data.page} of {data.totalPages}
          </span>
          {page < data.totalPages ? (
            <Link href={href({ page: String(page + 1) })} className="rounded-lg border px-4 py-2 hover:bg-neutral-50">
              Next →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </main>
  );
}
