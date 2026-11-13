import { SectionHeading } from "./section-heading";

const IMG = "https://www.tactyqal.com/application/assets/img/apps";

const stories = [
  { name: "KrishiDrishti", img: "krishidrishti1.png", text: "AI-powered soil analysis and crop recommendation app that can impact millions of local farmers in India.", tag: "AI · Social impact" },
  { name: "Elenor Vegan Handbags", img: "elenor1.png", text: "Corporate gifting platform selling vegan handbags, started by a 16-year-old. ₹9,000 in the first week.", tag: "E-commerce" },
  { name: "One Last Chapter", img: "olc1.png", text: "Book subscription service for kids, started by a 13-year-old and generating ₹1,00,000 a month.", tag: "Subscription" },
  { name: "Paws of Promise", img: "pop1.png", text: "Virtual pet adoption app that connects pet lovers with pets from shelters.", tag: "Social good" },
  { name: "AudioNova", img: "audionova1.png", text: "AI music and video production company.", tag: "AI · Media" },
  { name: "Converza", img: "converza1.png", text: "Spanish learning app featuring Luna, a friendly AI language-learning bot.", tag: "EdTech" },
];

export function Stories() {
  return (
    <section id="success" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Success stories"
          title="Real students. Real apps. Real success."
          subtitle="Every one of these was designed, built and launched by a teen working with a Tactyqal mentor."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s) => (
            <article key={s.name} className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-indigo-50 to-violet-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${IMG}/${s.img}`}
                  alt={`${s.name} app screenshot`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">{s.tag}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm text-neutral-600">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
