"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 36,
  blur = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? "blur(10px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
