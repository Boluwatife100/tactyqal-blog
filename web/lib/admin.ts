import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const API = process.env.API_URL ?? "http://localhost:4000";
export const TOKEN_COOKIE = "admin_token";

export async function getToken() {
  return (await cookies()).get(TOKEN_COOKIE)?.value;
}

/** Authenticated, uncached call to the blog API. Redirects to the login page when not signed in. */
export async function adminFetch(path: string, init: RequestInit = {}) {
  const token = await getToken();
  if (!token) redirect("/admin/login");
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { ...init.headers, Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (res.status === 401) redirect("/admin/login");
  return res;
}
