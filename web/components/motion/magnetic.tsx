"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

/** Wraps a button so it gently follows the cursor when it is nearby. */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={onLeave} className="inline-block">
      {children}
    </m.div>
  );
}
