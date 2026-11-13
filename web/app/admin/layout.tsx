import type { Metadata } from "next";
import Link from "next/link";
import { getToken } from "@/lib/admin";
import { logout } from "./actions";

export const metadata: Metadata = { title: "Admin | Tactyqal Blog", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const signedIn = Boolean(await getToken());
  return (
    <div className="min-h-[70vh] bg-neutral-50">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/admin" className="font-semibold">
            Blog admin
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/blog" className="text-neutral-600 hover:text-indigo-700">
              View blog
            </Link>
            {signedIn && (
              <form action={logout}>
                <button className="text-neutral-600 hover:text-red-600">Sign out</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">{children}</div>
    </div>
  );
}
