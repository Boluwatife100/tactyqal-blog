import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";

const faqs = [
  ["What if my teen has no coding experience?", "No problem! The program is designed for beginners. We use no-code tools and guide students step by step."],
  ["How do you guarantee university admissions?", "We help students build standout projects that strengthen their university applications."],
  ["What kind of apps do students typically build?", "Apps range from AI-powered tools and e-commerce platforms to subscription services and social good projects. We help students pick ideas that excite them."],
  ["How much time commitment is required?", "About 2–3 hours per week, including 1 hour of live mentoring and independent work."],
  ["What is the success rate?", "100% of our students launch a working app and achieve their goals."],
  ["Can my teen generate real revenue?", "Yes! Many of our students have generated real revenue and even won grants and media coverage."],
  ["What universities have your students gotten into?", "Our alumni have been admitted to top universities in the US and UK, including Ivy League schools."],
  ["What ongoing support do you provide?", "Ongoing support, an alumni community, and guidance even after the program ends."],
];

export function Faq() {
  return (
    <section id="faq" className="cv-auto scroll-mt-20 bg-neutral-50 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <Reveal>
          <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
            {faqs.map(([q, a]) => (
              <details key={q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {q}
                  <ChevronDown size={18} className="shrink-0 text-neutral-400 transition duration-500 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-neutral-600">{a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
