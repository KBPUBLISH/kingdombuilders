import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { APOLO_KIDS_PAGE_PATH } from "../data/apoloKidsShop";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useReveal } from "../hooks/useReveal";

const GODLY_KIDS_APP_STORE_URL =
  "https://apps.apple.com/app/godly-kids/id6471334059";
const GODLY_KIDS_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.kbpublish.godlykidscb";

const PROMO_CLIPS = [
  "/promo/godly-kids/clip-01.mp4",
  "/promo/godly-kids/clip-02.mp4",
  "/promo/godly-kids/clip-03.mp4",
  "/promo/godly-kids/clip-04.mp4",
  "/promo/godly-kids/clip-05.mp4",
] as const;

const CLIP_SECONDS = 5;

function AppStoreBadge() {
  return (
    <a
      href={GODLY_KIDS_APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-xl bg-ink-950 px-4 py-3 text-parchment shadow-soft transition hover:bg-ink-900 hover:-translate-y-0.5"
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

function GooglePlayBadge() {
  return (
    <a
      href={GODLY_KIDS_PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-xl bg-[#01875f] px-4 py-3 text-white shadow-soft transition hover:bg-[#017050] hover:-translate-y-0.5"
    >
      {/* Geometry from Simple Icons (Google Play mark); solid white reads cleanly on brand green */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-7 w-6 shrink-0"
        aria-hidden
      >
        <path
          fill="#ffffff"
          d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"
        />
      </svg>
      <span className="text-left leading-none">
        <span className="block text-[11px] font-medium text-white/85">
          GET IT ON
        </span>
        <span className="mt-0.5 block font-sans text-lg font-semibold tracking-tight">
          Google Play
        </span>
      </span>
    </a>
  );
}

export function GodlyKidsPromo() {
  const [clipIndex, setClipIndex] = useState(0);
  const advancingRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  const [copyRef, copyVisible] = useReveal<HTMLDivElement>();
  const [deviceRef, deviceVisible] = useReveal<HTMLDivElement>();

  useEffect(() => {
    if (reduceMotion) return;
    const v = videoRef.current;
    if (!v) return;
    advancingRef.current = false;
    v.src = PROMO_CLIPS[clipIndex];
    v.load();
    void v.play().catch(() => {});
  }, [clipIndex, reduceMotion]);

  const bumpClip = useCallback(() => {
    if (advancingRef.current) return;
    advancingRef.current = true;
    setClipIndex((i) => (i + 1) % PROMO_CLIPS.length);
  }, []);

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || reduceMotion) return;
    if (v.currentTime >= CLIP_SECONDS) {
      v.pause();
      bumpClip();
    }
  }, [bumpClip, reduceMotion]);

  const onEnded = useCallback(() => {
    if (reduceMotion) return;
    bumpClip();
  }, [bumpClip, reduceMotion]);

  return (
    <section
      id="godly-kids-app"
      className="relative snap-section overflow-hidden bg-gradient-to-b from-parchment via-ink-50/40 to-parchment"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-0 h-[380px] w-[380px] rounded-full bg-gold-300/25 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-ink-200/40 blur-[140px]" />
      </div>

      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div
            ref={copyRef}
            className={`transition-all duration-[900ms] ease-out ${
              copyVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-700 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-gold-700" />
              Featured app · Godly Kids
            </span>

            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-6">
              <img
                src="/promo/godly-kids/app-icon.jpg?v=1"
                alt="Godly Kids app icon"
                width={112}
                height={112}
                loading="lazy"
                className="h-24 w-24 shrink-0 rounded-[22%] shadow-soft ring-2 ring-ink-900/10 sm:h-28 sm:w-28"
              />
              <div className="min-w-0">
                <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-ink-950 sm:text-5xl">
                  Faith-filled learning kids love.
                </h2>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-700">
                  Bible stories, audio adventures, games, and prayer — ad-free
                  and kid-safe. Grab the app, then explore Apolo-Kids for your
                  teens.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <AppStoreBadge />
              <GooglePlayBadge />
            </div>

            <Link
              to={APOLO_KIDS_PAGE_PATH}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 hover:text-gold-700"
            >
              Continue to Apolo-Kids textbook
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div
            ref={deviceRef}
            className={`flex justify-center lg:justify-end transition-all duration-[900ms] ease-out ${
              deviceVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative w-full max-w-[440px]">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.75rem] bg-gradient-to-br from-gold-400/35 via-transparent to-ink-300/25 blur-2xl"
              />
              {/* iPad-style frame */}
              <div className="rounded-[2.25rem] border-[10px] border-ink-900 bg-ink-900 shadow-[0_40px_80px_-20px_rgba(24,20,40,0.55)] ring-1 ring-white/15">
                <div className="relative overflow-hidden rounded-[1.35rem] bg-black aspect-[3/4]">
                  {reduceMotion ? (
                    <div className="flex h-full flex-col items-center justify-center gap-2 bg-ink-950 p-6 text-center text-sm text-parchment/80">
                      <p>Motion reduced — promo video paused.</p>
                      <p className="text-xs text-parchment/55">
                        Enable motion or open the app for full trailers.
                      </p>
                    </div>
                  ) : (
                    <video
                      ref={videoRef}
                      className="h-full w-full object-cover"
                      muted
                      playsInline
                      autoPlay
                      onTimeUpdate={onTimeUpdate}
                      onEnded={onEnded}
                    />
                  )}
                </div>
              </div>
              <p className="mt-3 text-center font-hand text-lg text-gold-700/95">
                five favorites · five seconds each · loops forever
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
