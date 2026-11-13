"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";

const phases = [
  { weeks: "Weeks 1–2", title: "Ideation & market research", text: "Find a problem worth solving and validate it with real people." },
  { weeks: "Weeks 3–4", title: "Design & prototyping", text: "Turn the idea into screens and a clickable prototype." },
  { weeks: "Weeks 5–6", title: "Full-stack development", text: "Build the working app with modern no-code tools and platforms." },
  { weeks: "Weeks 7–8", title: "Launch & marketing", text: "Go live, pitch it and launch on Product Hunt." },
];

export function Program() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="program" className="scroll-mt-20 bg-neutral-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The program"
          title="From idea to full app in 8 weeks"
          subtitle="Personal 1:1 live sessions, one hour each, with expert guidance on admissions, revenue, recognition and grants."
        />
        <ol ref={ref} className="relative grid gap-6 md:grid-cols-4">
          <div aria-hidden className="absolute left-0 right-0 top-[44px] hidden h-px bg-neutral-200 md:block" />
          <m.div
            aria-hidden
            style={{ width }}
            className="absolute left-0 top-[44px] hidden h-0.5 bg-gradient-to-r from-indigo-600 to-violet-600 md:block"
          />
          {phases.map((p, i) => (
            <li key={p.title} className="relative z-10">
              <Reveal delay={i * 0.15} className="h-full">
                <div className="h-full rounded-2xl border border-neutral-200 bg-white p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-indigo-600">{p.weeks}</p>
                  <h3 className="mt-1 font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{p.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal blur className="mx-auto mt-14 max-w-2xl text-center">
          <blockquote>
            <p className="text-xl font-medium italic text-neutral-800">
              “Learn to sell. Learn to build. If you can do both, you will be unstoppable.”
            </p>
            <footer className="mt-3 text-sm text-neutral-500">Naval Ravikant</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
