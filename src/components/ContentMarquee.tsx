import { Headphones, ShoppingBag, BookOpen } from "lucide-react";
import { BookCover } from "./BookCover";
import {
  bookCoverUrl,
  getMediaUrl,
  type AmazonBook,
  type Book,
  type Playlist,
} from "../services/api";

export type MarqueeTile = {
  id: string;
  title: string;
  subtitle?: string;
  cover: string;
  /** Visual badge in the corner, e.g. Audio / Print. */
  kind: "book" | "audio" | "amazon";
};

type RowProps = {
  tiles: MarqueeTile[];
  /** Animation speed in seconds (higher = slower). */
  duration?: number;
  /** Reverse direction (true = scrolls right -> left flipped to left -> right). */
  reverse?: boolean;
};

/**
 * A horizontally-looping row of content tiles. Items are duplicated once so
 * the keyframe `translateX(-50%)` produces a seamless loop. Motion is disabled
 * when the user prefers reduced motion.
 */
function MarqueeRow({ tiles, duration = 90, reverse = false }: RowProps) {
  if (!tiles.length) return null;
  return (
    <div
      className="relative w-full min-w-0 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      role="presentation"
    >
      <div
        className="flex w-max gap-6 animate-marquee motion-reduce:animate-none"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...tiles, ...tiles].map((tile, i) => (
          <Tile key={`${tile.id}-${i}`} tile={tile} index={i} />
        ))}
      </div>
    </div>
  );
}

function Tile({ tile, index }: { tile: MarqueeTile; index: number }) {
  const palette = index % 6;
  const isSquare = tile.kind === "audio";
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl ring-1 ring-ink-900/10 shadow-soft ${
        isSquare
          ? "h-[120px] w-[120px] sm:h-[140px] sm:w-[140px]"
          : "h-[160px] w-[120px] sm:h-[180px] sm:w-[135px]"
      }`}
    >
      {tile.cover ? (
        <img
          src={tile.cover}
          alt={tile.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <BookCover title={tile.title} author={tile.subtitle} palette={palette} />
      )}
      <span className="pointer-events-none absolute left-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-ink-950/85 text-gold-300 backdrop-blur-sm">
        {tile.kind === "audio" ? (
          <Headphones className="h-3 w-3" />
        ) : tile.kind === "amazon" ? (
          <ShoppingBag className="h-3 w-3" />
        ) : (
          <BookOpen className="h-3 w-3" />
        )}
      </span>
    </div>
  );
}

export type ContentMarqueeProps = {
  books: Book[];
  playlists: Playlist[];
  amazonBooks: AmazonBook[];
};

/**
 * Two stacked rows that scroll in alternating directions:
 *   1. Books (digital + print)  →
 *   2. Audio series             ←
 *
 * Empty rows are hidden automatically.
 */
export function ContentMarquee({
  books,
  playlists,
  amazonBooks,
}: ContentMarqueeProps) {
  const bookTiles: MarqueeTile[] = books
    .map((b) => ({
      id: b._id,
      title: b.title,
      subtitle: b.author,
      cover: bookCoverUrl(b),
      kind: "book" as const,
    }))
    .filter((t) => !!t.title);

  const audioTiles: MarqueeTile[] = playlists
    .map((p) => ({
      id: p._id,
      title: p.title,
      subtitle: p.author,
      cover: getMediaUrl(p.coverImage),
      kind: "audio" as const,
    }))
    .filter((t) => !!t.title);

  const amazonTiles: MarqueeTile[] = amazonBooks
    .map((a) => ({
      id: a._id,
      title: a.title,
      subtitle: a.author,
      cover: getMediaUrl(a.coverImage || a.images?.[0]),
      kind: "amazon" as const,
    }))
    .filter((t) => !!t.title);

  // Interleave digital + print books so both surfaces are represented in
  // the single combined row without one type clustering at the start.
  const combinedBookTiles: MarqueeTile[] = [];
  const maxLen = Math.max(bookTiles.length, amazonTiles.length);
  for (let i = 0; i < maxLen; i++) {
    if (bookTiles[i]) combinedBookTiles.push(bookTiles[i]);
    if (amazonTiles[i]) combinedBookTiles.push(amazonTiles[i]);
  }

  return (
    <div className="relative w-full min-w-0 max-w-full space-y-5 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-br from-gold-300/30 via-transparent to-ink-200/40 blur-3xl"
      />
      <MarqueeRow tiles={combinedBookTiles} duration={110} />
      <MarqueeRow tiles={audioTiles} duration={120} reverse />
    </div>
  );
}
