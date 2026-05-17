import { useEffect, useState, type CSSProperties } from "react";

const INTRO_SEEN_KEY = "kbpublish_intro_seen_v1";

/** Total play time before the overlay starts its exit transition. */
const PLAY_MS = 2500;
/** Exit transition length (must match the .intro-overlay-exit keyframe). */
const EXIT_MS = 750;

type Stage = "playing" | "exiting" | "done";

/**
 * Cinematic landing overlay: cloud layers rush past the camera and the
 * Kingdom Builders castle logo blooms into focus, then the overlay lifts
 * up and fades out to reveal the site.
 *
 *  • Plays once per browser session (sessionStorage).
 *  • Skip via Skip button, click anywhere, or Esc / Enter / Space.
 *  • Honors `prefers-reduced-motion` — the overlay is never rendered.
 */
export function IntroAnimation() {
  const [stage, setStage] = useState<Stage>(() => {
    if (typeof window === "undefined") return "done";
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return "done";
    }
    try {
      if (window.sessionStorage.getItem(INTRO_SEEN_KEY) === "1") return "done";
    } catch {
      /* sessionStorage unavailable (private mode, etc.) — show intro anyway */
    }
    return "playing";
  });

  // Drive the play → exit → done timeline.
  useEffect(() => {
    if (stage !== "playing") return;
    const toExit = window.setTimeout(() => setStage("exiting"), PLAY_MS);
    return () => window.clearTimeout(toExit);
  }, [stage]);

  useEffect(() => {
    if (stage !== "exiting") return;
    const toDone = window.setTimeout(() => finish(), EXIT_MS);
    return () => window.clearTimeout(toDone);
  }, [stage]);

  // Lock body scroll + listen for skip keys while the overlay is up.
  useEffect(() => {
    if (stage === "done") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        skip();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [stage]);

  function finish() {
    setStage("done");
    try {
      window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  function skip() {
    // Jump straight to the exit animation so the dismissal still feels smooth.
    setStage((s) => (s === "playing" ? "exiting" : s));
  }

  if (stage === "done") return null;

  return (
    <div
      role="dialog"
      aria-label="Welcome to Kingdom Builders Publishing"
      aria-live="polite"
      onClick={skip}
      className={`fixed inset-0 z-[9999] grid place-items-center overflow-hidden bg-ink-950 ${
        stage === "exiting" ? "intro-overlay-exit pointer-events-none" : ""
      }`}
    >
      {/* Deep sky gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_42%,rgba(218,171,63,0.32),rgba(22,18,42,0)_55%),linear-gradient(180deg,#1a1739_0%,#241f3d_55%,#16122a_100%)]"
      />

      {/* Warm sun bloom behind the logo */}
      <div
        aria-hidden
        className="intro-sun absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,225,150,0.55),rgba(255,225,150,0)_70%)] blur-3xl"
      />

      {/* Cloud layers — each gets a unique trajectory + duration + delay */}
      {CLOUDS.map((c, i) => (
        <Cloud
          key={i}
          style={{
            ["--x" as string]: `${c.x}px`,
            ["--y" as string]: `${c.y}px`,
            ["--dur" as string]: `${c.dur}s`,
            ["--delay" as string]: `${c.delay}s`,
            width: `${c.w}px`,
            height: `${c.h}px`,
          }}
        />
      ))}

      {/* Castle logo bloom */}
      <img
        src="/logo.png?v=2"
        alt="Kingdom Builders Publishing"
        className="intro-logo-anim relative z-10 h-[44vmin] w-[44vmin] max-h-[440px] max-w-[440px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.65)]"
        draggable={false}
      />

      {/* Wordmark — fades in after the logo */}
      <p
        className="intro-logo-anim absolute bottom-[18vh] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-center font-serif text-sm font-semibold uppercase tracking-[0.32em] text-parchment/80 sm:text-base"
        style={{ animationDelay: "1.3s" }}
      >
        Kingdom Builders
        <span className="ml-3 text-gold-300">Publishing</span>
      </p>

      {/* Skip control */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          skip();
        }}
        className="absolute bottom-6 right-6 z-20 inline-flex items-center gap-1.5 rounded-full border border-parchment/20 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-parchment/80 backdrop-blur-sm transition hover:border-gold-300/60 hover:text-gold-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        aria-label="Skip intro animation"
      >
        Skip
      </button>
    </div>
  );
}

function Cloud({ style }: { style?: CSSProperties }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 110"
      preserveAspectRatio="xMidYMid meet"
      className="intro-cloud pointer-events-none absolute left-1/2 top-1/2"
      style={style}
    >
      <path
        d="M40,82 Q14,82 14,60 Q14,40 36,38 Q40,18 66,20 Q82,6 102,16 Q126,6 142,24 Q168,22 170,48 Q192,52 182,72 Q176,90 150,86 Q120,92 90,84 Q60,92 40,82 Z"
        fill="rgba(251,247,239,0.94)"
        stroke="rgba(101,90,163,0.22)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

type CloudCfg = {
  x: number; // starting offset from center (px); also determines exit direction
  y: number;
  w: number; // cloud size in px (before scale)
  h: number;
  dur: number; // seconds
  delay: number;
};

const CLOUDS: CloudCfg[] = [
  { x: -160, y: -90, w: 220, h: 120, dur: 2.2, delay: 0.0 },
  { x: 150, y: -70, w: 200, h: 110, dur: 2.4, delay: 0.15 },
  { x: -110, y: 110, w: 240, h: 130, dur: 2.3, delay: 0.3 },
  { x: 140, y: 130, w: 210, h: 115, dur: 2.5, delay: 0.1 },
  { x: -30, y: -150, w: 180, h: 100, dur: 2.1, delay: 0.5 },
  { x: 50, y: 160, w: 230, h: 125, dur: 2.4, delay: 0.6 },
];
