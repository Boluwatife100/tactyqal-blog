"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { adminFetch, API, TOKEN_COOKIE } from "@/lib/admin";

export type FormState = { error?: string; fieldErrors?: Record<string, string[]> } | null;

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: String(formData.get("email") ?? ""), password: String(formData.get("password") ?? "") }),
    cache: "no-store",
  }).catch(() => null);

  if (!res) return { error: "Can't reach the API. Is it running?" };
  if (!res.ok) return { error: res.status === 401 ? "Wrong email or password." : "Login failed." };

  const { token } = (await res.json()) as { token: string };
  (await cookies()).set(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(TOKEN_COOKIE);
  redirect("/admin/login");
}

export async function savePost(_prev: FormState, formData: FormData): Promise<FormState> {
  const text = (k: string) => String(formData.get(k) ?? "").trim();
  const id = text("id");

  const body = {
    title: text("title"),
    excerpt: text("excerpt"),
    content: String(formData.get("content") ?? ""),
    coverImage: text("coverImage") || null,
    status: text("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
    category: text("category") || null,
    tags: text("tags").split(",").map((t) => t.trim()).filter(Boolean),
  };

  const res = await adminFetch(id ? `/api/posts/${id}` : "/api/posts", {
    method: id ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const j = (await res.json().catch(() => ({}))) as { error?: string; issues?: Record<string, string[]> };
    return { error: j.error ?? "Save failed.", fieldErrors: j.issues };
  }

  revalidatePath("/", "layout"); // refreshes the homepage, /blog and every post page
  redirect("/admin");
}

export async function deletePost(id: string) {
  await adminFetch(`/api/posts/${id}`, { method: "DELETE" });
  revalidatePath("/", "layout");
}
