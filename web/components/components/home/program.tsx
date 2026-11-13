import { SectionHeading } from "./section-heading";

const phases = [
  { weeks: "Weeks 1–2", title: "Ideation & market research", text: "Find a problem worth solving and validate it with real people." },
  { weeks: "Weeks 3–4", title: "Design & prototyping", text: "Turn the idea into screens and a clickable prototype." },
  { weeks: "Weeks 5–6", title: "Full-stack development", text: "Build the working app with modern no-code tools and platforms." },
  { weeks: "Weeks 7–8", title: "Launch & marketing", text: "Go live, pitch it and launch on Product Hunt." },
];

export function Program() {
  return (
    <section id="program" className="scroll-mt-20 bg-neutral-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The program"
          title="From idea to full app in 8 weeks"
          subtitle="Personal 1:1 live sessions, one hour each, with expert guidance on admissions, revenue, recognition and grants."
        />
        <ol className="grid gap-6 md:grid-cols-4">
          {phases.map((p, i) => (
            <li key={p.title} className="relative rounded-2xl border border-neutral-200 bg-white p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-indigo-600">{p.weeks}</p>
              <h3 className="mt-1 font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{p.text}</p>
            </li>
          ))}
        </ol>
        <blockquote className="mx-auto mt-14 max-w-2xl text-center">
          <p className="text-xl font-medium italic text-neutral-800">
            “Learn to sell. Learn to build. If you can do both, you will be unstoppable.”
          </p>
          <footer className="mt-3 text-sm text-neutral-500">Naval Ravikant</footer>
        </blockquote>
      </div>
    </section>
  );
}
