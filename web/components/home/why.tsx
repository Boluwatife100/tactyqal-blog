import { GraduationCap, HeartHandshake, Layers, Lightbulb, Presentation, TrendingUp, Trophy, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";

const features = [
  { icon: Users, title: "1:1 personalized mentoring", text: "Every student gets dedicated expert guidance. No group classes." },
  { icon: Layers, title: "Full-stack app, no code", text: "Build real apps using modern no-code tools and platforms." },
  { icon: Trophy, title: "Proven track record", text: "Real revenue, real apps and top university admits." },
  { icon: GraduationCap, title: "University admission edge", text: "Stand out with real-world projects and achievements." },
  { icon: TrendingUp, title: "Revenue generation", text: "Students learn to build, launch and monetize their own apps." },
  { icon: HeartHandshake, title: "Lifelong support", text: "From ideation to launch, and an alumni community after." },
  { icon: Presentation, title: "Pitch & presentation skills", text: "Learn to pitch, present and launch on Product Hunt." },
  { icon: Lightbulb, title: "Startup ideas 101", text: "Learn to identify and validate profitable ideas from our founder." },
];

export function Why() {
  return (
    <section id="why" className="cv-auto scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Why Tactyqal" title="Why parents choose Tactyqal Labs" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 4) * 0.1} className="h-full">
              <div className="group h-full rounded-2xl border border-neutral-200 p-6 transition duration-500 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600 transition duration-500 group-hover:rotate-6 group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
