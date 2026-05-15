import { Link } from "react-router-dom";

type LogoProps = {
  variant?: "dark" | "light";
};

export function Logo({ variant = "dark" }: LogoProps) {
  const textColor = variant === "light" ? "text-parchment" : "text-ink-900";
  const subColor = variant === "light" ? "text-parchment/70" : "text-ink-700/70";
  return (
    <Link
      to="/"
      className="group flex items-center gap-3"
      aria-label="Kingdom Builders Publishing home"
    >
      <span className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-ink-950 shadow-soft ring-1 ring-gold-500/40 transition group-hover:ring-gold-500/70">
        <img
          src="/logo.png"
          alt=""
          width={44}
          height={44}
          className="block h-full w-full object-cover"
          draggable={false}
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={`font-serif text-lg font-semibold tracking-tight ${textColor}`}
        >
          Kingdom Builders
        </span>
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${subColor}`}
        >
          Publishing
        </span>
      </span>
    </Link>
  );
}
