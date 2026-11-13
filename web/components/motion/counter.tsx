"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

export function Counter({ to, suffix = "", duration = 2.4 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, duration]);

  return <span ref={ref}>{`${to}${suffix}`}</span>;
}
