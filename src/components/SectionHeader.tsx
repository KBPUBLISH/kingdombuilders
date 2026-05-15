import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  actionTo,
  align = "left",
}: SectionHeaderProps) {
  if (align === "center") {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow justify-center">
          <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-ink-700 lg:text-lg">
            {description}
          </p>
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">
          <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-ink-700 lg:text-lg">
            {description}
          </p>
        )}
      </div>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-ink-900 hover:text-gold-700"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
