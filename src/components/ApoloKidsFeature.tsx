import { useState } from "react";
import {
  BookOpen,
  BookMarked,
  Check,
  Gamepad2,
  ShieldCheck,
  Sparkles,
  Swords,
  type LucideIcon,
} from "lucide-react";
import { useParallaxOffset, useReveal } from "../hooks/useReveal";
import { ApoloKidsManuscriptPreview } from "./ApoloKidsManuscriptPreview";

const APOLO_KIDS_PREORDER_URL =
  "mailto:hello@kbpublish.org?subject=Apolo-Kids%20Pre-order&body=I%27d%20like%20to%20pre-order%20Apolo-Kids%20%28%2449.99%29.%20Please%20send%20me%20payment%20instructions.%20Thank%20you!";

const highlights: { icon: LucideIcon; title: string; copy: string }[] = [
  {
    icon: Gamepad2,
    title: "Gamified learning",
    copy: "Quests, badges, and challenges turn apologetics into an adventure.",
  },
  {
    icon: ShieldCheck,
    title: "Christian foundation",
    copy: "Every answer is rooted in Scripture and trustworthy theology.",
  },
  {
    icon: Swords,
    title: "Defend your faith",
    copy: "Answers to culture, science, religions, and competing worldviews.",
  },
];

export function ApoloKidsFeature() {
  const [previewSession, setPreviewSession] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [imageRef, imageOffset] = useParallaxOffset<HTMLDivElement>(0.12);
  const [headerRef, headerVisible] = useReveal<HTMLDivElement>();
  const [bodyRef, bodyVisible] = useReveal<HTMLDivElement>();

  return (
    <section id="apolo-kids" className="relative snap-section overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-50 via-parchment to-parchment" />
        <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-gold-300/35 blur-[110px]" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] translate-x-1/3 rounded-full bg-ink-200/60 blur-[140px]" />
      </div>

      {/*
        Layout:
          - Mobile (single column, source order): header → book → body
          - Desktop (lg+): book on the left spanning both rows, header in
            top-right, body in bottom-right.
      */}
      <div className="container-page py-20 sm:py-24 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr,1fr] lg:gap-x-20 lg:gap-y-10">
          <div
            ref={headerRef}
            className={`relative text-center lg:col-start-2 lg:row-start-1 lg:text-left transition-all duration-[900ms] ease-out ${
              headerVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300">
              <Sparkles className="h-3.5 w-3.5" /> New Release · Pre-order
            </span>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-ink-950 sm:text-5xl lg:text-6xl">
              Apolo-Kids
            </h2>
            <p className="mt-3 font-serif text-xl italic text-gold-700 sm:text-2xl">
              Apologetics for Young Defenders
            </p>
          </div>

          <div
            ref={imageRef}
            className="relative mx-auto w-full max-w-[460px] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center"
            style={{
              transform: `translate3d(0, ${imageOffset}px, 0)`,
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-gold-300/40 via-transparent to-ink-100/40 blur-3xl"
            />
            <div className="relative animate-float-slow [perspective:1200px]">
              <div
                className="relative drop-shadow-[0_40px_60px_rgba(36,31,61,0.35)]"
                style={{
                  transform: "rotate3d(1, -0.3, 0, 4deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src="/featured/apolo-kids.png?v=3"
                  alt="Apolo-Kids — Apologetics for Young Defenders, a hardcover Christian textbook for kids 14+"
                  loading="lazy"
                  className="block w-full select-none"
                  draggable={false}
                />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-10 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full bg-ink-950/30 blur-2xl"
              />
            </div>
          </div>

          <div
            ref={bodyRef}
            className={`relative lg:col-start-2 lg:row-start-2 transition-all duration-[900ms] ease-out ${
              bodyVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <p className="max-w-xl text-lg leading-relaxed text-ink-700">
              A gamified Christian textbook for ages <strong>14+</strong> —
              built to equip the next generation with bold, Scripture-rooted
              answers to culture, science, world religions, and competing
              worldviews.
            </p>

            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h.title} className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink-950 text-gold-300">
                    <h.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-950">{h.title}</p>
                    <p className="mt-0.5 text-sm text-ink-700">{h.copy}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-5 rounded-3xl border border-ink-900/10 bg-white/85 p-6 shadow-soft backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">
                  Hardcover textbook
                </p>
                <p className="mt-1 font-serif text-3xl font-semibold text-ink-950 sm:text-4xl">
                  $49.99
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-ink-700">
                  <Check className="h-3.5 w-3.5 text-gold-700" />
                  Free U.S. shipping on launch
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[220px]">
                <button
                  type="button"
                  onClick={() => {
                    setPreviewSession((s) => s + 1);
                    setPreviewOpen(true);
                  }}
                  className="btn-ghost w-full justify-center border-ink-900/20 text-base"
                >
                  <BookMarked className="h-4 w-4" />
                  Preview manuscript
                </button>
                <a
                  href={APOLO_KIDS_PREORDER_URL}
                  className="btn-gold w-full justify-center text-base"
                >
                  <BookOpen className="h-4 w-4" />
                  Pre-order Online
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ApoloKidsManuscriptPreview
        key={previewSession}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </section>
  );
}
