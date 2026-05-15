import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-parchment via-parchment to-ink-50" />
        <div className="absolute -top-32 left-1/2 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-gold-300/25 blur-[120px]" />
      </div>

      <div className="container-page py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <p className="eyebrow justify-center">
            <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
          </p>
          <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink-950 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-lg leading-relaxed text-ink-700">{description}</p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
