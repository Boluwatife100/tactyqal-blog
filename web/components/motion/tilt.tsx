"use client";

import { m, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

/** 3D tilt that follows the cursor, with a soft light glare. Mouse only; touch is left alone. */
export function Tilt({ children, className = "", max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 110, damping: 16, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 110, damping: 16, mass: 0.6 });
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.45), transparent 60%)`;

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <div className="h-full [perspective:1000px]">
      <m.div
        ref={ref}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`group/tilt relative h-full will-change-transform ${className}`}
      >
        {children}
        <m.span
          aria-hidden
          style={{ backgroundImage: glare }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-700 group-hover/tilt:opacity-100"
        />
      </m.div>
    </div>
  );
}
