"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { ScrollProgress } from "./scroll-progress";

/** LazyMotion loads only the DOM animation features (~5 KB) instead of the full library. */
export function MotionProviders({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ScrollProgress />
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
