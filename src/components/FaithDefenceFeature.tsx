import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Play,
  Shield,
  Sparkles,
} from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import {
  faithDefenceApi,
  type FaithDefenceCollection,
  type FaithDefenceContent,
} from "../services/api";

const FAITH_DEFENCE_APP_STORE_URL =
  "https://apps.apple.com/us/app/faith-defense/id6760212543";

function AppStoreBadgeLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={FAITH_DEFENCE_APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 rounded-xl bg-ink-950 px-4 py-3 text-parchment shadow-soft transition hover:bg-ink-900 hover:-translate-y-0.5 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        className="h-8 w-7 shrink-0 fill-current"
        aria-hidden
      >
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.9-88.5 20.9-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90.1-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
      </svg>
      <span className="text-left leading-none">
        <span className="block text-[11px] font-medium text-parchment/80">
          Download on the
        </span>
        <span className="mt-0.5 block font-sans text-lg font-semibold tracking-tight">
          App Store
        </span>
      </span>
    </a>
  );
}

export function FaithDefenceFeature() {
  const [collections, setCollections] = useState<FaithDefenceCollection[]>([]);
  const [content, setContent] = useState<FaithDefenceContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      faithDefenceApi.collections(),
      faithDefenceApi.content({ limit: 20 }),
    ])
      .then(([cols, items]) => {
        if (cancelled) return;
        setCollections([...cols].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)));
        setContent(items);
      })
      .catch(() => {
        if (!cancelled) {
          setCollections([]);
          setContent([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const [headerRef, headerVisible] = useReveal<HTMLDivElement>();

  return (
    <section
      id="faith-defense"
      className="relative snap-section overflow-hidden bg-gradient-to-b from-ink-50 via-parchment to-parchment"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-ink-300/25 blur-[140px]" />
        <div className="absolute -bottom-40 right-0 h-[520px] w-[520px] translate-x-1/4 rounded-full bg-gold-300/20 blur-[160px]" />
      </div>

      <div className="container-page py-20 sm:py-24 lg:py-28">
        <div
          ref={headerRef}
          className={`flex flex-col gap-6 transition-all duration-[900ms] ease-out sm:gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12 ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex max-w-3xl flex-col gap-5 sm:flex-row sm:items-start sm:gap-6 lg:max-w-none lg:flex-1">
            <img
              src="/promo/faith-defense/app-icon.png?v=1"
              alt="Faith Defense app icon"
              width={112}
              height={112}
              loading="lazy"
              className="h-24 w-24 shrink-0 rounded-[22%] shadow-soft ring-2 ring-ink-900/10 sm:h-28 sm:w-28"
            />
            <div className="min-w-0 lg:max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-700 backdrop-blur-sm">
                <Shield className="h-3.5 w-3.5 text-gold-700" />
                From our companion app · Faith Defense
              </span>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-ink-950 sm:text-5xl lg:text-6xl">
                Equip the next generation to{" "}
                <span className="italic text-ink-900">defend</span> their faith.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-700">
                Original apologetics dialogues built for teens and curious minds —
                honest answers to the hard questions about science, history,
                culture, and the Bible. Streamed inside our companion app, written
                and produced by Kingdom Builders Publishing.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <AppStoreBadgeLink />
                <a href="#faith-defense-dialogues" className="btn-ghost px-5 py-3 text-sm">
                  Preview samples below
                  <ChevronDown className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex max-w-xs shrink-0 flex-col justify-center gap-2 rounded-2xl border border-ink-900/10 bg-white/70 p-5 text-sm backdrop-blur-sm">
            <p className="font-semibold text-ink-950">Faith Defense app</p>
            <p className="text-xs leading-relaxed text-ink-600">
              Available on the App Store for iPhone &amp; iPad — full dialogue
              library, debate practice, and daily challenges.
            </p>
          </div>
        </div>

        {/* Featured dialogues */}
        {(content.length > 0 || loading) && (
          <div className="mt-14" id="faith-defense-dialogues">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-700">
                  Sample dialogues
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-ink-950 sm:text-3xl">
                  Real conversations, honest answers.
                </h3>
                <p className="mt-2 max-w-xl text-sm text-ink-700/90">
                  Cards drift slowly — hover, swipe, or use the arrows to browse.
                </p>
              </div>
              <a
                href={FAITH_DEFENCE_APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-gold-700"
              >
                Listen in the app
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <DialogueCarousel items={content} loading={loading} />
          </div>
        )}

        {/* Seasons strip */}
        {collections.length > 0 && (
          <div className="mt-14 flex flex-wrap items-center gap-3 rounded-3xl border border-ink-900/10 bg-white/70 p-6 backdrop-blur-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">
              Now playing:
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {collections.map((c) => (
                <span
                  key={c._id}
                  className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-3.5 py-1.5 text-xs font-semibold text-parchment"
                >
                  <span className="text-gold-300">{c.name}</span>
                  {c.subtitle && (
                    <span className="text-parchment/70">· {c.subtitle}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function DialogueCarousel({
  items,
  loading,
}: {
  items: FaithDefenceContent[];
  loading: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const hoverPausedRef = useRef(false);
  const focusWithinPausedRef = useRef(false);
  const interactionPauseUntilRef = useRef(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const eps = 4;
    setCanPrev(scrollLeft > eps);
    setCanNext(scrollLeft < scrollWidth - clientWidth - eps);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, [updateArrows, items.length, loading]);

  /** Pause auto-scroll briefly after manual wheel / touch (still allows hover pause). */
  const bumpInteractionPause = useCallback(() => {
    interactionPauseUntilRef.current = performance.now() + 4500;
  }, []);

  useEffect(() => {
    if (loading || items.length === 0) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const tick = () => {
      const el = scrollerRef.current;
      const reduced =
        mq.matches ||
        document.visibilityState === "hidden" ||
        hoverPausedRef.current ||
        focusWithinPausedRef.current ||
        performance.now() < interactionPauseUntilRef.current;

      if (!el || reduced) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const loopW = el.scrollWidth / 2;
      if (loopW <= el.clientWidth + 8) {
        raf = requestAnimationFrame(tick);
        return;
      }

      el.scrollLeft += 0.42;
      if (el.scrollLeft >= loopW - 1.5) {
        el.scrollLeft -= loopW;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loading, items.length]);

  const scrollBySlide = useCallback((dir: "prev" | "next") => {
    bumpInteractionPause();
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.querySelector("[data-carousel-slide]");
    const gap = 16;
    const step =
      slide instanceof HTMLElement
        ? slide.offsetWidth + gap
        : Math.min(340, el.clientWidth * 0.82);
    el.scrollBy({
      left: dir === "prev" ? -step : step,
      behavior: "smooth",
    });
  }, [bumpInteractionPause]);

  const slideClass =
    "w-[min(82vw,300px)] shrink-0 sm:w-[min(42vw,320px)] lg:w-[300px] xl:w-[320px]";

  const loopItems = loading ? [] : [...items, ...items];

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Faith Defense dialogues"
      onMouseEnter={() => {
        hoverPausedRef.current = true;
      }}
      onMouseLeave={() => {
        hoverPausedRef.current = false;
      }}
      onFocusCapture={() => {
        focusWithinPausedRef.current = true;
      }}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as Node | null;
        if (!next || !e.currentTarget.contains(next)) {
          focusWithinPausedRef.current = false;
        }
      }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-parchment to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-parchment to-transparent sm:w-16" />

      <button
        type="button"
        aria-label="Previous dialogues"
        disabled={!canPrev || loading}
        onClick={() => scrollBySlide("prev")}
        className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-ink-900/15 bg-white/95 p-2.5 text-ink-950 shadow-soft backdrop-blur-sm transition hover:border-gold-300/50 hover:bg-white disabled:pointer-events-none disabled:opacity-30 sm:left-1 sm:p-3"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Next dialogues"
        disabled={!canNext || loading}
        onClick={() => scrollBySlide("next")}
        className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-ink-900/15 bg-white/95 p-2.5 text-ink-950 shadow-soft backdrop-blur-sm transition hover:border-gold-300/50 hover:bg-white disabled:pointer-events-none disabled:opacity-30 sm:right-1 sm:p-3"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>

      <div
        ref={scrollerRef}
        onWheel={bumpInteractionPause}
        onTouchStart={bumpInteractionPause}
        className="flex gap-4 overflow-x-auto overscroll-x-contain scroll-smooth py-2 pl-1 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                data-carousel-slide={i === 0 ? "" : undefined}
                className={`${slideClass} rounded-2xl border border-ink-900/10 bg-white/70 p-3 sm:p-4`}
              >
                <div className="aspect-video w-full animate-pulse rounded-lg bg-ink-900/10" />
                <div className="mt-2.5 space-y-2 sm:mt-3">
                  <div className="h-2.5 w-16 animate-pulse rounded bg-ink-900/10" />
                  <div className="h-3.5 w-3/4 animate-pulse rounded bg-ink-900/10" />
                </div>
              </div>
            ))
          : loopItems.map((c, idx) => (
              <div
                key={`${c._id}-${idx}`}
                data-carousel-slide={idx === 0 ? "" : undefined}
                className={slideClass}
              >
                <DialogueCard content={c} />
              </div>
            ))}
      </div>
    </div>
  );
}

function DialogueCard({ content }: { content: FaithDefenceContent }) {
  const cat =
    content.categoryId && typeof content.categoryId !== "string"
      ? content.categoryId
      : undefined;
  const accent = cat?.color || "#7c3aed";
  const hasAudio = !!content.narrationUrl;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-900/10 bg-white/85 shadow-soft transition hover:-translate-y-1">
      <div className="relative aspect-video w-full overflow-hidden">
        {content.coverImageUrl ? (
          <img
            src={content.coverImageUrl}
            alt={content.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background: `linear-gradient(135deg, ${accent}55, ${accent}10)`,
            }}
          />
        )}
        {cat && (
          <span
            className="absolute left-1.5 top-1.5 inline-flex max-w-[calc(100%-12px)] items-center gap-1 truncate rounded-full px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-white shadow-soft sm:left-2.5 sm:top-2.5 sm:max-w-none sm:px-2.5 sm:text-[9px] sm:tracking-[0.14em]"
            style={{ backgroundColor: accent }}
          >
            <span className="shrink-0">{cat.icon}</span>
            <span className="truncate">{cat.name}</span>
          </span>
        )}
        {hasAudio && (
          <span className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-1 rounded-full bg-ink-950/85 px-1.5 py-0.5 text-[9px] font-semibold text-gold-300 backdrop-blur-sm sm:bottom-2.5 sm:right-2.5 sm:px-2.5 sm:py-1 sm:text-[10px]">
            <Headphones className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> Narrated
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h4 className="line-clamp-2 font-serif text-sm font-semibold leading-snug text-ink-950 sm:text-lg">
          {content.title}
        </h4>
        {content.description && (
          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-ink-700/90 sm:text-xs">
            {content.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-ink-900/10 pt-2.5 sm:pt-3">
          <span className="inline-flex min-w-0 items-center gap-1 truncate text-[10px] text-ink-700 sm:text-[11px]">
            {hasAudio ? (
              <>
                <Play className="h-2.5 w-2.5 shrink-0 fill-current text-gold-700 sm:h-3 sm:w-3" />
                <span className="truncate">Audio</span>
              </>
            ) : (
              <>
                <Sparkles className="h-2.5 w-2.5 shrink-0 text-gold-700 sm:h-3 sm:w-3" />
                <span className="truncate">Script</span>
              </>
            )}
          </span>
          <a
            href={FAITH_DEFENCE_APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-ink-900 transition hover:text-gold-700 sm:text-xs"
          >
            Listen
            <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
