import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Headphones,
  Loader2,
  Lock,
  Pause,
  Play,
  Search,
} from "lucide-react";
import { PageHero } from "../components/PageHero";
import { NewsletterCTA } from "../components/NewsletterCTA";
import {
  getMediaUrl,
  playlistsApi,
  type Playlist,
  type PlaylistItem,
} from "../services/api";

export function Listen() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playingItemId, setPlayingItemId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    playlistsApi
      .list({ limit: 100 })
      .then((data) => {
        if (cancelled) return;
        const sorted = [...data].sort((a, b) => {
          if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
          return (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99);
        });
        setPlaylists(sorted);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load playlists", err);
        setError("We couldn't load audio series right now.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    playlists.forEach((p) => {
      (p.categories || []).forEach((c) => c && set.add(c));
      if (!p.categories?.length && p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set).sort()];
  }, [playlists]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return playlists.filter((p) => {
      const cats = p.categories?.length ? p.categories : p.category ? [p.category] : [];
      const inCat = category === "All" || cats.includes(category);
      const inQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.items || []).some((it) =>
          it.title?.toLowerCase().includes(q),
        );
      return inCat && inQuery;
    });
  }, [playlists, category, query]);

  function togglePlay(item: PlaylistItem) {
    if (!item.audioUrl) return;
    const id = item._id;
    if (playingItemId === id) {
      audioRef.current?.pause();
      setPlayingItemId(null);
      return;
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(item.audioUrl);
    audio.addEventListener("ended", () => setPlayingItemId(null));
    audio.addEventListener("error", () => setPlayingItemId(null));
    audioRef.current = audio;
    setPlayingItemId(id);
    void audio.play().catch(() => setPlayingItemId(null));
  }

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Audio Series"
        title={<>Press play on Scripture.</>}
        description="Listen to our growing library of original audio adventures, sermons, and devotionals. Preview any episode right here — full series available in the Kingdom Builders app."
      />

      <section className="section pt-0">
        <div className="container-page">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search series or episodes…"
                className="input-field pl-11"
              />
            </div>

            <div className="-mx-2 flex flex-nowrap items-center gap-2 overflow-x-auto px-2 pb-1 lg:flex-wrap lg:overflow-visible">
              {categories.map((c) => {
                const active = c === category;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "border-ink-900 bg-ink-900 text-parchment"
                        : "border-ink-900/15 bg-white/70 text-ink-700 hover:border-ink-900/30 hover:text-ink-900"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-6 text-sm text-ink-700">
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading audio
                series…
              </span>
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-ink-950">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "series" : "series"}
              </>
            )}
          </p>

          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-3xl border border-red-200 bg-red-50 p-5 text-red-900">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="mt-10 space-y-6">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <PlaylistSkeleton key={i} />
                ))
              : filtered.map((p) => (
                  <PlaylistRow
                    key={p._id}
                    playlist={p}
                    expanded={activeId === p._id}
                    onToggle={() =>
                      setActiveId(activeId === p._id ? null : p._id)
                    }
                    playingItemId={playingItemId}
                    onPlayItem={togglePlay}
                  />
                ))}
          </div>

          {!loading && filtered.length === 0 && !error && (
            <div className="mt-16 rounded-3xl border border-dashed border-ink-900/15 bg-white/60 p-12 text-center">
              <p className="font-serif text-2xl font-semibold text-ink-950">
                No series matched your search.
              </p>
              <p className="mt-2 text-ink-700">
                Try a different keyword or category — we add new episodes often.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <NewsletterCTA />
        </div>
      </section>
    </>
  );
}

function PlaylistRow({
  playlist,
  expanded,
  onToggle,
  playingItemId,
  onPlayItem,
}: {
  playlist: Playlist;
  expanded: boolean;
  onToggle: () => void;
  playingItemId: string | null;
  onPlayItem: (item: PlaylistItem) => void;
}) {
  const [errored, setErrored] = useState(false);
  const cover = getMediaUrl(playlist.coverImage);
  const items = (playlist.items || []).slice().sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  const episodes = items.length;
  const totalPlays = items.reduce((acc, it) => acc + (it.playCount || 0), 0);

  return (
    <article className="overflow-hidden rounded-3xl border border-ink-900/10 bg-white/85 shadow-soft">
      <div className="grid gap-6 p-5 sm:grid-cols-[180px,1fr] sm:p-6">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl ring-1 ring-ink-900/10 sm:w-[180px]">
          {cover && !errored ? (
            <img
              src={cover}
              alt={playlist.title}
              loading="lazy"
              onError={() => setErrored(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-900 to-ink-800 p-5 text-center">
              <p className="font-serif text-lg text-parchment">
                {playlist.title}
              </p>
            </div>
          )}
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink-950/85 px-3 py-1 text-[11px] font-semibold text-parchment backdrop-blur-sm">
            <Headphones className="h-3 w-3" />
            {playlist.type || "Audio"}
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            {(playlist.categories || []).slice(0, 3).map((c) => (
              <span
                key={c}
                className="rounded-full bg-ink-900/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink-700"
              >
                {c}
              </span>
            ))}
            {playlist.isFeatured && (
              <span className="rounded-full bg-gold-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold-700">
                Featured
              </span>
            )}
          </div>
          <h3 className="mt-2 font-serif text-2xl font-semibold text-ink-950">
            {playlist.title}
          </h3>
          {playlist.author && (
            <p className="mt-1 text-sm text-ink-700">by {playlist.author}</p>
          )}
          {playlist.description && (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-700">
              {playlist.description}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-ink-700">
            <span>{episodes} {episodes === 1 ? "episode" : "episodes"}</span>
            {totalPlays > 0 && <span>{totalPlays.toLocaleString()} plays</span>}
            {episodes > 0 && (
              <button
                type="button"
                onClick={onToggle}
                className="inline-flex items-center gap-1.5 font-semibold text-ink-900 hover:text-gold-700"
              >
                {expanded ? "Hide episodes" : "Show episodes"}
              </button>
            )}
          </div>
        </div>
      </div>

      {expanded && episodes > 0 && (
        <ol className="divide-y divide-ink-900/10 border-t border-ink-900/10 bg-parchment/50">
          {items.map((it, idx) => {
            const isPlaying = playingItemId === it._id;
            const locked = it.isMembersOnly;
            return (
              <li key={it._id} className="flex items-center gap-4 px-5 py-4 sm:px-6">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink-900/5 text-xs font-semibold text-ink-700">
                  {(idx + 1).toString().padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-ink-950">{it.title}</p>
                  {it.description && (
                    <p className="truncate text-xs text-ink-700">
                      {it.description}
                    </p>
                  )}
                </div>
                {(it.playCount ?? 0) > 0 && (
                  <span className="hidden text-xs text-ink-700 sm:inline">
                    {(it.playCount ?? 0).toLocaleString()} plays
                  </span>
                )}
                {locked ? (
                  <span
                    title="Members-only — available in the app"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 bg-white text-ink-700"
                  >
                    <Lock className="h-3.5 w-3.5" />
                  </span>
                ) : it.audioUrl ? (
                  <button
                    type="button"
                    onClick={() => onPlayItem(it)}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition ${
                      isPlaying
                        ? "bg-ink-900 text-parchment"
                        : "bg-gold-400 text-ink-950 hover:bg-gold-300"
                    }`}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 fill-current" />
                    ) : (
                      <Play className="h-4 w-4 fill-current" />
                    )}
                  </button>
                ) : (
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 bg-white/60 text-ink-500">
                    <Play className="h-3.5 w-3.5 fill-current" />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </article>
  );
}

function PlaylistSkeleton() {
  return (
    <div className="rounded-3xl border border-ink-900/10 bg-white/60 p-5 sm:p-6">
      <div className="grid gap-6 sm:grid-cols-[180px,1fr]">
        <div className="aspect-square w-full animate-pulse rounded-2xl bg-ink-900/10 sm:w-[180px]" />
        <div className="space-y-3">
          <div className="h-3 w-24 animate-pulse rounded bg-ink-900/10" />
          <div className="h-6 w-2/3 animate-pulse rounded bg-ink-900/10" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-ink-900/10" />
          <div className="h-2 w-full animate-pulse rounded bg-ink-900/10" />
          <div className="h-2 w-5/6 animate-pulse rounded bg-ink-900/10" />
        </div>
      </div>
    </div>
  );
}
