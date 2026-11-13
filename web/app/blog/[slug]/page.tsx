import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDate, getPost } from "@/lib/api";
import { RemoteImage } from "@/components/remote-image";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Tactyqal Labs`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.coverImage ? [post.coverImage] : [] },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link href="/blog" className="text-sm text-indigo-700 hover:underline">
        ← All articles
      </Link>

      <header className="mt-6">
        {post.category && (
          <Link
            href={`/blog?category=${post.category.slug}`}
            className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700"
          >
            {post.category.name}
          </Link>
        )}
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-neutral-900">{post.title}</h1>
        <p className="mt-4 text-sm text-neutral-500">
          {post.author.name} · {formatDate(post.publishedAt)} · {post.readTimeMin} min read
        </p>
      </header>

      {post.coverImage && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100">
          <RemoteImage src={post.coverImage} priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>
      )}

      <article className="prose prose-neutral mt-10 max-w-none prose-headings:tracking-tight prose-a:text-indigo-700 prose-img:rounded-xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}
