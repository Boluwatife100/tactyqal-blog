import { Check } from "lucide-react";
import { BOOKING_URL } from "@/lib/site";
import { SectionHeading } from "./section-heading";

const included = [
  "8 weeks of 1:1 mentoring",
  "Full-stack app development",
  "Product Hunt launch",
  "Pitch deck creation",
  "Marketing strategy",
  "Ongoing support",
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Pricing" title="Start your teen's entrepreneurial journey" />
        <div className="mx-auto max-w-md rounded-3xl border-2 border-indigo-600 bg-white p-8 shadow-xl shadow-indigo-600/10">
          <p className="text-sm font-medium text-indigo-700">Limited-time offer · only 15 spots this month</p>
          <p className="mt-4 flex items-end gap-3">
            <span className="text-5xl font-extrabold">₹16,000</span>
            <span className="pb-1 text-lg text-neutral-400 line-through">₹25,000</span>
          </p>
          <ul className="mt-6 space-y-3">
            {included.map((i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <Check size={18} className="shrink-0 text-indigo-600" /> {i}
              </li>
            ))}
          </ul>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 block rounded-full bg-indigo-600 py-3 text-center font-medium text-white transition hover:bg-indigo-700"
          >
            Enroll now
          </a>
          <p className="mt-3 text-center text-xs text-neutral-500">Results guaranteed or money back</p>
        </div>
      </div>
    </section>
  );
}
