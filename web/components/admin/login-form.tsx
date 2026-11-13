"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import type { FormEvent, PointerEvent, ReactNode } from "react";
import { m, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { login } from "@/app/admin/actions";
import { Words } from "@/components/motion/words";

// Same gradient the homepage hero uses
const grad = "bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent";

// Deterministic (no Math.random) so server and client render the same particles
const particles = Array.from({ length: 22 }, (_, i) => ({
  l: (i * 53 + 7) % 100,
  t: (i * 37 + 11) % 100,
  s: 2 + (i % 3),
  d: (i % 7) * 0.8,
  dur: 4 + (i % 5),
}));

const inputCls =
  "w-full rounded-xl border border-neutral-300 bg-white py-3 pl-10 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition duration-300 " +
  "focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12),0_8px_24px_rgba(99,102,241,0.15)]";

/** A layer that drifts with the cursor; larger depth = closer to the viewer. */
function Layer({
  sx,
  sy,
  depth,
  className,
  children,
}: {
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  depth: number;
  className?: string;
  children: ReactNode;
}) {
  const x = useTransform(sx, [-1, 1], [-depth, depth]);
  const y = useTransform(sy, [-1, 1], [-depth, depth]);
  return (
    <m.div style={{ x, y }} className={className}>
      {children}
    </m.div>
  );
}

function MiniCard({ chip, chipCls, lines = 2 }: { chip: string; chipCls: string; lines?: number }) {
  return (
    <div className="w-40 rounded-xl border border-neutral-200 bg-white/90 p-3 shadow-xl shadow-indigo-600/10 backdrop-blur">
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${chipCls}`}>{chip}</span>
      <div className="mt-2.5 h-2 w-3/4 rounded bg-neutral-300" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`mt-1.5 h-1.5 rounded bg-neutral-200 ${i === lines - 1 ? "w-1/2" : "w-full"}`} />
      ))}
    </div>
  );
}

function Orbit() {
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden className="h-full w-full">
      <defs>
        <radialGradient id="lg-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="40%" stopColor="#a78bfa" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lg-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f46e5" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <g className="lg-orbit lg-core">
        <circle cx="200" cy="200" r="80" fill="url(#lg-core)" />
        <circle cx="200" cy="200" r="22" fill="#4f46e5" />
        <circle cx="193" cy="193" r="7" fill="#ffffff" fillOpacity="0.55" />
      </g>

      <g className="lg-orbit lg-spin-a">
        <circle cx="200" cy="200" r="100" stroke="url(#lg-ring)" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="2 9" />
        <circle cx="300" cy="200" r="6" fill="#6366f1" />
      </g>

      <g className="lg-orbit lg-spin-b">
        <circle cx="200" cy="200" r="135" stroke="#6366f1" strokeOpacity="0.18" strokeWidth="1" />
        <circle
          className="lg-comet"
          cx="200"
          cy="200"
          r="135"
          stroke="url(#lg-ring)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="70 780"
        />
        <circle cx="200" cy="65" r="4.5" fill="#a855f7" />
      </g>

      <g className="lg-orbit lg-spin-c">
        <circle cx="200" cy="200" r="170" stroke="#818cf8" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="1 14" />
        <circle cx="200" cy="370" r="5" fill="#f0abfc" />
        <circle cx="30" cy="200" r="3" fill="#6366f1" />
      </g>
    </svg>
  );
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);
  const [show, setShow] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Cursor-driven values
  const px = useMotionValue(-600);
  const py = useMotionValue(-600);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 120, damping: 25 });
  const spy = useSpring(py, { stiffness: 120, damping: 25 });
  const smx = useSpring(mx, { stiffness: 40, damping: 20 });
  const smy = useSpring(my, { stiffness: 40, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spx}px ${spy}px, rgba(99,102,241,0.12), transparent 60%)`;

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    px.set(e.clientX);
    py.set(e.clientY);
    mx.set((e.clientX / window.innerWidth - 0.5) * 2);
    my.set((e.clientY / window.innerHeight - 0.5) * 2);
  }

  // Submit through startTransition so React 19 doesn't wipe the inputs after a failed attempt
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => formAction(fd));
  }

  // Replay the shake on every failed attempt without remounting the form
  useEffect(() => {
    const el = cardRef.current;
    if (!state?.error || !el) return;
    el.classList.remove("lg-shake");
    void el.offsetWidth;
    el.classList.add("lg-shake");
  }, [state]);

  return (
    <div
      onPointerMove={onPointerMove}
      className="fixed inset-0 z-[70] overflow-y-auto bg-gradient-to-b from-indigo-50/70 via-white to-white text-neutral-900"
    >
      {/* ---- background scene ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="drift absolute -left-24 top-10 h-80 w-80 rounded-full bg-indigo-200/50 blur-3xl" />
        <div className="drift absolute -bottom-16 right-0 h-96 w-96 rounded-full bg-violet-200/50 blur-3xl [animation-delay:-9s]" />
        <div className="drift absolute left-1/2 top-1/3 h-64 w-64 rounded-full bg-pink-200/40 blur-3xl [animation-delay:-4s]" />

        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_25%,transparent_75%)]">
          <div className="lg-grid absolute -inset-12 bg-[linear-gradient(rgba(79,70,229,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>

        {particles.map((p, i) => (
          <span
            key={i}
            className="lg-twinkle absolute rounded-full bg-indigo-400"
            style={{ left: `${p.l}%`, top: `${p.t}%`, width: p.s, height: p.s, animationDelay: `${p.d}s`, animationDuration: `${p.dur}s` }}
          />
        ))}
        <m.div style={{ backgroundImage: spotlight }} className="absolute inset-0" />
      </div>

      <Link href="/" className="absolute left-6 top-6 z-10 text-sm text-neutral-500 transition hover:text-indigo-700">
        ← Back to site
      </Link>

      <div className="relative mx-auto grid min-h-full max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-2">
        {/* ---- left: copy + orbit illustration ---- */}
        <div className="hidden flex-col gap-10 lg:flex">
          <div>
            <p className="fade-up inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-medium text-indigo-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Tactyqal blog admin
            </p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.1] tracking-tight text-neutral-900">
              <Words words={[{ t: "Write." }, { t: "Publish." }, { t: "Ship.", cls: grad }]} />
            </h1>
            <p style={{ "--d": "700ms" } as React.CSSProperties} className="fade-up mt-4 max-w-sm text-neutral-600">
              Manage every article from one calm place: drafts, categories, Markdown and live previews.
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[400px]">
            <Layer sx={smx} sy={smy} depth={8} className="absolute inset-0">
              <Orbit />
            </Layer>
            <Layer sx={smx} sy={smy} depth={24} className="absolute -left-6 top-[6%]">
              <div className="float-slow">
                <MiniCard chip="Published" chipCls="bg-emerald-50 text-emerald-700" />
              </div>
            </Layer>
            <Layer sx={smx} sy={smy} depth={32} className="absolute -right-8 top-[44%]">
              <div className="float-slow [animation-delay:-3s]">
                <MiniCard chip="Draft" chipCls="bg-amber-50 text-amber-700" lines={3} />
              </div>
            </Layer>
            <Layer sx={smx} sy={smy} depth={18} className="absolute bottom-[2%] left-[8%]">
              <div className="float-slow [animation-delay:-5s]">
                <MiniCard chip="Markdown" chipCls="bg-indigo-50 text-indigo-700" />
              </div>
            </Layer>
          </div>
        </div>

        {/* ---- right: login card ---- */}
        <div style={{ "--d": "300ms" } as React.CSSProperties} className="fade-up mx-auto w-full max-w-sm">
          <div ref={cardRef}>
            <div className="relative overflow-hidden rounded-3xl bg-neutral-200 p-px shadow-xl shadow-indigo-600/10">
              <div
                aria-hidden
                className="lg-spin-border absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_60%,#6366f1_80%,#a855f7_100%)]"
              />
              <form onSubmit={onSubmit} className="relative space-y-5 rounded-[23px] bg-white/95 p-8 backdrop-blur-xl">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Welcome back</h2>
                  <p className="mt-1 text-sm text-neutral-500">Sign in to manage the blog.</p>
                </div>

                <label className="block text-xs font-medium text-neutral-700">
                  Email
                  <span className="relative mt-2 block">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input name="email" type="email" required autoComplete="username" placeholder="you@tactyqal.com" className={inputCls} />
                  </span>
                </label>

                <label className="block text-xs font-medium text-neutral-700">
                  Password
                  <span className="relative mt-2 block">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      name="password"
                      type={show ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className={`${inputCls} pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => !s)}
                      aria-label={show ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-indigo-700"
                    >
                      {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </span>
                </label>

                {state?.error && (
                  <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    {state.error}
                  </p>
                )}

                <button
                  disabled={pending}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition duration-500 hover:shadow-indigo-600/40 disabled:opacity-70"
                >
                  <span aria-hidden className="lg-shimmer absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  <span className="relative flex items-center justify-center gap-2">
                    {pending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Signing in…
                      </>
                    ) : (
                      <>
                        Sign in <ArrowRight size={16} className="transition duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
