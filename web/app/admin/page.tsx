import Link from "next/link";
import { adminFetch } from "@/lib/admin";
import { formatDate, type PostList, type PostSummary } from "@/lib/api";
import { DeleteButton } from "@/components/admin/delete-button";
import { deletePost } from "./actions";

type Row = PostSummary & { status: "DRAFT" | "PUBLISHED" };
type Search = { page?: string; q?: string };

export default async function AdminPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const qs = new URLSearchParams({ status: "ALL", limit: "15", page: String(page) });
  if (sp.q) qs.set("q", sp.q);

  const res = await adminFetch(`/api/posts?${qs}`);
  const data = (await res.json()) as Omit<PostList, "items"> & { items: Row[] };

  const href = (p: number) => `/admin?${new URLSearchParams({ ...(sp.q ? { q: sp.q } : {}), page: String(p) })}`;

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Posts</h1>
          <p className="text-sm text-neutral-500">{data.total} total</p>
        </div>
        <Link href="/admin/new" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          New post
        </Link>
      </div>

      <form action="/admin" className="mb-6">
        <input
          name="q"
          defaultValue={sp.q}
          placeholder="Search posts…"
          className="w-full max-w-sm rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </form>

      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="hidden px-4 py-3 md:table-cell">Category</th>
              <th className="hidden px-4 py-3 md:table-cell">Published</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {data.items.map((p) => (
              <tr key={p.id}>
                <td className="max-w-xs px-4 py-3 font-medium">
                  <span className="line-clamp-2">{p.title}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${p.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {p.status === "PUBLISHED" ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="hidden px-4 py-3 text-neutral-600 md:table-cell">{p.category?.name ?? "–"}</td>
                <td className="hidden px-4 py-3 text-neutral-600 md:table-cell">{formatDate(p.publishedAt) || "–"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    {p.status === "PUBLISHED" && (
                      <Link href={`/blog/${p.slug}`} className="text-sm text-neutral-600 hover:underline">
                        View
                      </Link>
                    )}
                    <Link href={`/admin/${p.slug}/edit`} className="text-sm text-indigo-700 hover:underline">
                      Edit
                    </Link>
                    <form action={deletePost.bind(null, p.id)}>
                      <DeleteButton title={p.title} />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {data.items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-neutral-500">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between text-sm">
          {page > 1 ? <Link href={href(page - 1)} className="rounded-lg border bg-white px-4 py-2 hover:bg-neutral-50">← Previous</Link> : <span />}
          <span className="text-neutral-500">Page {data.page} of {data.totalPages}</span>
          {page < data.totalPages ? <Link href={href(page + 1)} className="rounded-lg border bg-white px-4 py-2 hover:bg-neutral-50">Next →</Link> : <span />}
        </div>
      )}
    </>
  );
}
