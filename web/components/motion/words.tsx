import type { CSSProperties } from "react";

export type Word = { t: string; cls?: string };

/** Word-by-word masked rise. Pure CSS (see motion.css) so it runs on first paint, no JS needed. */
export function Words({ words, className = "" }: { words: Word[]; className?: string }) {
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="word-mask">
            <span className={`word ${w.cls ?? ""}`} style={{ "--i": i } as CSSProperties}>
              {w.t}
            </span>
          </span>{" "}
        </span>
      ))}
    </span>
  );
}
