import { useEffect, useState } from "react";
import {
  ArrowRight,
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

const FAITH_DEFENCE_APP_URL = "https://apps.apple.com/app/faith-defence";

export function FaithDefenceFeature() {
  const [collections, setCollections] = useState<FaithDefenceCollection[]>([]);
  const [content, setContent] = useState<FaithDefenceContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      faithDefenceApi.collections(),
      faithDefenceApi.content({ limit: 12 }),
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

  const featuredDialogues = content.slice(0, 3);

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
          className={`flex flex-col items-start gap-6 transition-all duration-[900ms] ease-out lg:flex-row lg:items-end lg:justify-between ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-2xl">
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
          </div>
          <a
            href={FAITH_DEFENCE_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0"
          >
            <Sparkles className="h-4 w-4" />
            Explore the Faith Defense app
          </a>
        </div>

        {/* Featured dialogues */}
        {(featuredDialogues.length > 0 || loading) && (
          <div className="mt-14">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-700">
                  Sample dialogues
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-ink-950 sm:text-3xl">
                  Real conversations, honest answers.
                </h3>
              </div>
              <a
                href={FAITH_DEFENCE_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-gold-700 sm:inline-flex"
              >
                Listen in the app
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-3xl border border-ink-900/10 bg-white/70 p-6"
                    >
                      <div className="aspect-video w-full animate-pulse rounded-2xl bg-ink-900/10" />
                      <div className="mt-5 space-y-3">
                        <div className="h-3 w-16 animate-pulse rounded bg-ink-900/10" />
                        <div className="h-5 w-3/4 animate-pulse rounded bg-ink-900/10" />
                        <div className="h-3 w-1/2 animate-pulse rounded bg-ink-900/10" />
                      </div>
                    </div>
                  ))
                : featuredDialogues.map((c) => (
                    <DialogueCard key={c._id} content={c} />
                  ))}
            </div>
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

function DialogueCard({ content }: { content: FaithDefenceContent }) {
  const cat =
    content.categoryId && typeof content.categoryId !== "string"
      ? content.categoryId
      : undefined;
  const accent = cat?.color || "#7c3aed";
  const hasAudio = !!content.narrationUrl;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-900/10 bg-white/85 shadow-soft transition hover:-translate-y-1">
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
            className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white shadow-soft"
            style={{ backgroundColor: accent }}
          >
            {cat.icon} {cat.name}
          </span>
        )}
        {hasAudio && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink-950/85 px-3 py-1.5 text-[11px] font-semibold text-gold-300 backdrop-blur-sm">
            <Headphones className="h-3 w-3" /> Narrated
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h4 className="font-serif text-xl font-semibold leading-snug text-ink-950">
          {content.title}
        </h4>
        {content.description && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-700/90">
            {content.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between border-t border-ink-900/10 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-700">
            {hasAudio ? (
              <>
                <Play className="h-3.5 w-3.5 fill-current text-gold-700" />
                Audio dialogue
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-gold-700" />
                Script
              </>
            )}
          </span>
          <a
            href={FAITH_DEFENCE_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 transition hover:text-gold-700"
          >
            Listen
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
