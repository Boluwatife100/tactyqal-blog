import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";

const quotes = [
  { name: "Aarav Sharma", text: "I had to struggle to find a tech cofounder." },
  { name: "Isha Patel", text: "Now I feel independent and can build anything I want." },
  { name: "Rohan Verma", text: "It's the future." },
  { name: "Simran Kaur", text: "I can focus on the creative side and don't have to worry about whether it can be built." },
  { name: "Devansh Mehta", text: "I went from having no idea to launching my app." },
  { name: "Priya Nair", text: "My impact app was only in my head till I built it." },
];

export function Testimonials() {
  return (
    <section className="cv-auto py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Testimonials" title="What our students say" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={(i % 3) * 0.12} className="h-full">
              <figure className="h-full rounded-2xl border border-neutral-200 bg-white p-6 transition duration-500 hover:-translate-y-1 hover:shadow-lg">
                <blockquote className="text-neutral-800">“{q.text}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                    {q.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <span className="text-sm font-medium">{q.name}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
