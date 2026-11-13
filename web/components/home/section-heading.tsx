import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <Reveal blur className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600">{eyebrow}</p>}
      <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-neutral-600">{subtitle}</p>}
    </Reveal>
  );
}
