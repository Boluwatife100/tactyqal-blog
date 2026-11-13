import type { CSSProperties } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { BOOKING_URL } from "@/lib/site";
import { Words, type Word } from "@/components/motion/words";
import { Counter } from "@/components/motion/counter";
import { Magnetic } from "@/components/motion/magnetic";
import { HeroVisual } from "./hero-visual";

const grad = "bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent";

const headline: Word[] = [
  ..."Empower your kid to build the next app that".split(" ").map((t) => ({ t })),
  { t: "impacts", cls: grad },
  { t: "millions,", cls: grad },
  ..."in 8 weeks.".split(" ").map((t) => ({ t })),
];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-white">
      <div className="drift pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="drift pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl [animation-delay:-9s]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <span style={d(0)} className="fade-up inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-medium text-indigo-700">
            <Sparkles size={14} /> Limited-time offer · only 15 spots a month
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            <Words words={headline} />
          </h1>

          <p style={d(700)} className="fade-up mt-6 max-w-xl text-lg text-neutral-600">
            1:1 mentoring from idea to a launched full-stack app. No coding needed. Real projects that strengthen
            university applications, open doors to grants and earn media coverage.
          </p>

          <div style={d(850)} className="fade-up mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700"
              >
                Book free consultation <ArrowRight size={18} />
              </a>
            </Magnetic>
            <a href="#success" className="rounded-full border border-neutral-300 px-6 py-3 font-medium text-neutral-800 transition hover:border-indigo-400">
              See success stories
            </a>
          </div>

          <p style={d(950)} className="fade-up mt-5 text-sm text-neutral-600">
            <span className="text-neutral-400 line-through">₹25,000</span>{" "}
            <span className="text-xl font-bold text-neutral-900">₹16,000</span> · results guaranteed or money back
          </p>

          <dl style={d(1050)} className="fade-up mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-neutral-200 pt-8">
            <div>
              <dt className="text-2xl font-bold text-neutral-900">
                <Counter to={100} suffix="+" />
              </dt>
              <dd className="mt-1 text-xs text-neutral-500">Students mentored</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-neutral-900">Top</dt>
              <dd className="mt-1 text-xs text-neutral-500">University admissions</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-neutral-900">
                <Counter to={1000} suffix="s" />
              </dt>
              <dd className="mt-1 text-xs text-neutral-500">People impacted</dd>
            </div>
          </dl>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
