import { notFound } from "next/navigation";
import { adminFetch } from "@/lib/admin";
import { PostForm } from "@/components/admin/post-form";
import type { Post } from "@/lib/api";

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await adminFetch(`/api/posts/${encodeURIComponent(slug)}`);
  if (res.status === 404) notFound();
  const post = (await res.json()) as Post & { status: "DRAFT" | "PUBLISHED" };

  return (
    <>
      <h1 className="mb-8 text-2xl font-bold">Edit post</h1>
      <PostForm post={post} />
    </>
  );
}
