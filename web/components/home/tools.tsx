import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const rowA = ["Startup Idea Generator", "Fundability Assessment", "Team Evaluation Tool", "Pitch Deck Analyzer"];
const rowB = ["Top 10 Traits for Business Success", "Cofounder Compatibility Test", "Problem–Solution Fit", "Website Landing Page Assessment"];

function Row({ items, reverse = false, dur }: { items: string[]; reverse?: boolean; dur: string }) {
  const loop = [...items, ...items, ...items, ...items]; // two identical halves, so -50% loops seamlessly
  return (
    <div className={`marquee ${reverse ? "marquee-rev" : ""}`}>
      <div className="marquee-track" style={{ "--dur": dur } as CSSProperties}>
        {loop.map((t, i) => (
          <span key={i} aria-hidden={i >= items.length} className="mx-1.5 whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Tools() {
  return (
    <section id="tools" className="cv-auto scroll-mt-20 overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-700 py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal blur className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-200">Free tools</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Free tools to get started</h2>
          <p className="mt-4 text-indigo-100">Our startup assessment tools, used by 1000+ entrepreneurs.</p>
        </Reveal>
      </div>
      <div className="space-y-4">
        <Row items={rowA} dur="55s" />
        <Row items={rowB} dur="65s" reverse />
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <a
          href="https://tactyqal.com/#tools"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-indigo-700 transition hover:bg-indigo-50"
        >
          Access all tools free <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
