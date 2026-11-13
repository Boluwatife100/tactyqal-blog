const API = process.env.API_URL ?? "http://localhost:4000";

export type Term = { name: string; slug: string };

export type PostSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  status: "DRAFT" | "PUBLISHED";
  readTimeMin: number;
  publishedAt: string | null;
  category: Term | null;
  tags: Term[];
  author: { name: string };
};

export type Post = PostSummary & { content: string };

export type PostList = {
  items: PostSummary[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

async function get<T>(path: string): Promise<T | null> {
  const res = await fetch(`${API}${path}`, { next: { revalidate: 60 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${res.status} for ${path}`);
  return res.json() as Promise<T>;
}

export async function getPosts(params: {
  page?: number;
  q?: string;
  category?: string;
  limit?: number;
}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.q) qs.set("q", params.q);
  if (params.category) qs.set("category", params.category);
  return (await get<PostList>(`/api/posts?${qs}`))!;
}

export const getPost = (slug: string) =>
  get<Post>(`/api/posts/${encodeURIComponent(slug)}`);

export async function getCategories() {
  return (await get<(Term & { postCount: number })[]>("/api/categories")) ?? [];
}

export const formatDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
