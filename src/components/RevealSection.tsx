import { type ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Optional delay in ms for staggered entrances. */
  delay?: number;
};

/**
 * A presentational div that fades + slides up the first time it scrolls
 * into the viewport. Use inside existing layouts when you only want the
 * reveal effect (not the snap-section behavior).
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-[900ms] ease-out will-change-transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  /** Tailwind classes for the inner wrapper — animate as a single block. */
  innerClassName?: string;
  /** Optional id for hash links (e.g. /about#impact). */
  id?: string;
  /** Disable scroll-snap on this section (use for the hero or full-bleed footers). */
  noSnap?: boolean;
};

/**
 * A page section that:
 *  - Snaps loosely into view as you scroll (`scroll-snap-align: start`)
 *  - Fades + slides up its content the first time it enters the viewport
 */
export function RevealSection({
  children,
  className = "",
  innerClassName = "",
  id,
  noSnap = false,
}: RevealSectionProps) {
  const [ref, visible] = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      id={id}
      className={`${noSnap ? "" : "snap-section"} relative ${className}`}
    >
      <div
        className={`transition-all duration-[900ms] ease-out will-change-transform ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        } ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
