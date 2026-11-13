import { ArrowRight, Sparkles } from "lucide-react";
import { BOOKING_URL } from "@/lib/site";

const IMG = "https://www.tactyqal.com/application/assets/img/apps";

const stats = [
  { value: "100+", label: "Students mentored" },
  { value: "Top", label: "University admissions" },
  { value: "1000s", label: "People impacted" },
];

function Shot({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`aspect-[3/4] overflow-hidden rounded-2xl border border-white bg-gradient-to-br from-indigo-100 to-violet-100 shadow-xl ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover object-top" />
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-medium text-indigo-700">
            <Sparkles size={14} /> Limited-time offer · only 15 spots a month
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Empower your kid to build the next app that{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              impacts millions
            </span>
            , in 8 weeks.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-neutral-600">
            1:1 mentoring from idea to a launched full-stack app. No coding needed. Real projects that strengthen
            university applications, open doors to grants and earn media coverage.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700"
            >
              Book free consultation <ArrowRight size={18} />
            </a>
            <a href="#success" className="rounded-full border border-neutral-300 px-6 py-3 font-medium text-neutral-800 transition hover:border-indigo-400">
              See success stories
            </a>
          </div>

          <p className="mt-5 text-sm text-neutral-600">
            <span className="text-neutral-400 line-through">₹25,000</span>{" "}
            <span className="text-xl font-bold text-neutral-900">₹16,000</span> · results guaranteed or money back
          </p>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-neutral-200 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-bold text-neutral-900">{s.value}</dt>
                <dd className="mt-1 text-xs text-neutral-500">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-tr from-indigo-200 via-violet-200 to-pink-200 opacity-70 blur-2xl" />
          <div className="relative grid grid-cols-2 gap-4">
            <Shot src={`${IMG}/krishidrishti1.png`} className="mt-10 -rotate-3" />
            <Shot src={`${IMG}/olc1.png`} className="rotate-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
