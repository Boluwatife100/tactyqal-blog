import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { Reveal } from "@/components/motion/reveal";
import { getPosts, type PostSummary } from "@/lib/api";
import { SectionHeading } from "./section-heading";

export async function LatestPosts() {
  let posts: PostSummary[] = [];
  try {
    posts = (await getPosts({ limit: 3 })).items;
  } catch {
    return null; // API unreachable: skip the section instead of breaking the homepage
  }
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="cv-auto scroll-mt-20 bg-neutral-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="From the blog" title="Learn from industry experts" />
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.12} className="h-full">
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 font-medium text-indigo-700 hover:underline">
            Read all articles <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
