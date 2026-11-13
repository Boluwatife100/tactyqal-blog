import Link from "next/link";
import { EMAIL, NAV, PHONE, PHONE_HREF } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">Tactyqal Labs</p>
          <p className="mt-3 max-w-xs text-sm">
            We work with aspiring entrepreneurs and young builders to turn ideas into real-world applications.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={`mailto:${EMAIL}`} className="hover:text-white">
                {EMAIL}
              </a>
            </li>
            <li>
              <a href={PHONE_HREF} className="hover:text-white">
                {PHONE}
              </a>
            </li>
            <li>Mon–Sat, 9am–7pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-800 py-5 text-center text-xs">
        © {new Date().getFullYear()} Tactyqal Labs. All rights reserved.
      </div>
    </footer>
  );
}
