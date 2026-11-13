"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { savePost } from "@/app/admin/actions";
import type { Post } from "@/lib/api";

const field = "mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

export function PostForm({ post }: { post?: Post }) {
  const [state, action, pending] = useActionState(savePost, null);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [content, setContent] = useState(post?.content ?? "");
  const err = (k: string) => state?.fieldErrors?.[k]?.[0];

  return (
    <form action={action} className="space-y-6">
      {post && <input type="hidden" name="id" value={post.id} />}

      <label className="block text-sm font-medium">
        Title
        <input name="title" required defaultValue={post?.title} className={field} />
        {err("title") && <span className="text-xs text-red-600">{err("title")}</span>}
      </label>

      <label className="block text-sm font-medium">
        Excerpt <span className="font-normal text-neutral-500">(shown on cards, max 400 characters)</span>
        <textarea name="excerpt" required rows={2} maxLength={400} defaultValue={post?.excerpt} className={field} />
        {err("excerpt") && <span className="text-xs text-red-600">{err("excerpt")}</span>}
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Cover image URL
          <input name="coverImage" type="url" defaultValue={post?.coverImage ?? ""} placeholder="https://…" className={field} />
          {err("coverImage") && <span className="text-xs text-red-600">Enter a full https:// URL</span>}
        </label>
        <label className="block text-sm font-medium">
          Category
          <input name="category" defaultValue={post?.category?.name ?? ""} placeholder="Startup business ideas" className={field} />
        </label>
      </div>

      <label className="block text-sm font-medium">
        Tags <span className="font-normal text-neutral-500">(comma separated)</span>
        <input name="tags" defaultValue={post?.tags.map((t) => t.name).join(", ") ?? ""} className={field} />
      </label>

      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Content (Markdown)</span>
          <div className="flex gap-1 rounded-lg bg-neutral-200 p-0.5 text-xs">
            {(["write", "preview"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-md px-3 py-1 capitalize ${tab === t ? "bg-white shadow-sm" : "text-neutral-600"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        {/* Always mounted so it is submitted even while the preview tab is open */}
        <textarea
          name="content"
          required
          rows={18}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`${field} font-mono ${tab === "preview" ? "hidden" : ""}`}
        />
        {tab === "preview" && (
          <div className="prose prose-neutral mt-1 min-h-[24rem] max-w-none rounded-lg border border-neutral-300 bg-white p-6">
            {content.trim() ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown> : <p className="text-neutral-400">Nothing to preview yet.</p>}
          </div>
        )}
      </div>

      {state?.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6">
        <label className="flex items-center gap-2 text-sm">
          Status
          <select name="status" defaultValue={post?.status ?? "DRAFT"} className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm">
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </label>
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-sm text-neutral-600 hover:underline">
            Cancel
          </Link>
          <button disabled={pending} className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
            {pending ? "Saving…" : post ? "Save changes" : "Create post"}
          </button>
        </div>
      </div>
    </form>
  );
}
