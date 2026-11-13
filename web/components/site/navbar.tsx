"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BOOKING_URL, NAV } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-sm text-white">
            T
          </span>
          Tactyqal Labs
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-neutral-600 transition hover:text-indigo-700">
              {n.label}
            </Link>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Book free consultation
          </a>
        </nav>

        <button
          className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-neutral-200 bg-white px-4 pb-4 lg:hidden" aria-label="Mobile">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b border-neutral-100 py-3 text-neutral-700"
            >
              {n.label}
            </Link>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block rounded-full bg-indigo-600 px-4 py-3 text-center font-medium text-white"
          >
            Book free consultation
          </a>
        </nav>
      )}
    </header>
  );
}
