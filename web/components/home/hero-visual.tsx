"use client";

import Image from "next/image";
import {
  m,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import type { PointerEvent } from "react";

const IMG = "/apps";

function Shot({ src, priority = false }: { src: string; priority?: boolean }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white bg-gradient-to-br from-indigo-100 to-violet-100 shadow-xl">
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1024px) 220px, 45vw"
        className="object-cover object-top"
      />
    </div>
  );
}

/** Layered depth: each layer moves at its own speed on scroll and reacts to the cursor. */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yBack = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yA = useTransform(scrollYProgress, [0, 1], [70, -90]);
  const yB = useTransform(scrollYProgress, [0, 1], [-20, 130]);
  const yChip = useTransform(scrollYProgress, [0, 1], [90, -140]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });
  const xBack = useTransform(sx, [-1, 1], [10, -10]);
  const xA = useTransform(sx, [-1, 1], [-16, 16]);
  const xB = useTransform(sx, [-1, 1], [-26, 26]);
  const xChip = useTransform(sx, [-1, 1], [-40, 40]);
  const dy = useTransform(sy, [-1, 1], [-8, 8]);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="fade-up relative mx-auto w-full max-w-md"
      style={{ "--d": "400ms" } as React.CSSProperties}
    >
      <m.div style={{ y: yBack, x: xBack }} className="absolute -inset-8">
        <div className="drift h-full w-full rounded-[2.5rem] bg-gradient-to-tr from-indigo-200 via-violet-200 to-pink-200 opacity-70 blur-2xl" />
      </m.div>

      <div className="relative grid grid-cols-2 gap-4">
        <m.div style={{ y: yA, x: xA }} className="mt-10">
          <div className="float-slow -rotate-3">
            <Shot src={`${IMG}/krishidrishti1.png`} priority />
          </div>
        </m.div>
        <m.div style={{ y: yB, x: xB }}>
          <div className="float-slow rotate-3 [animation-delay:-3.5s]">
            <Shot src={`${IMG}/olc1.png`} priority />
          </div>
        </m.div>
      </div>

      <m.div
        style={{ y: yChip, x: xChip }}
        className="absolute -left-2 bottom-12 z-10 sm:-left-8"
      >
        <div className="float-slow [animation-delay:-1.5s] rounded-xl border border-neutral-200 bg-white/90 px-4 py-3 text-sm shadow-lg backdrop-blur">
          <p className="text-xs text-neutral-500">Launched in</p>
          <p className="font-semibold text-neutral-900">8 weeks ✓</p>
        </div>
      </m.div>
      <m.div
        style={{ y: dy, x: xA }}
        className="absolute -right-2 top-2 z-10 sm:-right-6"
      >
        <div className="float-slow [animation-delay:-5s] rounded-xl border border-neutral-200 bg-white/90 px-4 py-3 text-sm shadow-lg backdrop-blur">
          <p className="text-xs text-neutral-500">First week revenue</p>
          <p className="font-semibold text-indigo-700">₹9,000</p>
        </div>
      </m.div>
    </div>
  );
}
