import Link from "next/link";
import { formatDate, type PostSummary } from "@/lib/api";
import { RemoteImage } from "@/components/remote-image";

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition duration-500 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-indigo-50 to-violet-100">
          {post.coverImage && (
            <RemoteImage
              src={post.coverImage}
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          {post.category && (
            <span className="w-fit rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
              {post.category.name}
            </span>
          )}
          <h2 className="text-lg font-semibold leading-snug text-neutral-900 group-hover:text-indigo-700">{post.title}</h2>
          <p className="line-clamp-3 text-sm text-neutral-600">{post.excerpt}</p>
          <p className="mt-auto pt-2 text-xs text-neutral-500">
            {formatDate(post.publishedAt)} · {post.readTimeMin} min read
          </p>
        </div>
      </Link>
    </article>
  );
}
