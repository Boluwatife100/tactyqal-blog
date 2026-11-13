import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";

const tools = [
  "Startup Idea Generator",
  "Fundability Assessment",
  "Team Evaluation Tool",
  "Pitch Deck Analyzer",
  "Top 10 Traits for Business Success",
  "Cofounder Compatibility Test",
  "Problem–Solution Fit",
  "Website Landing Page Assessment",
];

export function Tools() {
  return (
    <section id="tools" className="scroll-mt-20 bg-gradient-to-br from-indigo-600 to-violet-700 py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-200">Free tools</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Free tools to get started</h2>
          <p className="mt-4 text-indigo-100">Our startup assessment tools, used by 1000+ entrepreneurs.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((t) => (
            <div key={t} className="rounded-xl border border-white/20 bg-white/10 px-4 py-4 text-sm font-medium backdrop-blur">
              {t}
            </div>
          ))}
        </div>
        <a
          href="https://tactyqal.com/#tools"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-indigo-700 transition hover:bg-indigo-50"
        >
          Access all tools free <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
