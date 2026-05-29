import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Headphones,
  Loader2,
  Mail,
  Play,
  Sparkles,
  Star,
  Users,
  Globe2,
  Cross,
  Heart,
} from "lucide-react";
import { ApoloKidsFeature } from "../components/ApoloKidsFeature";
import { BookCover } from "../components/BookCover";
import { ContentMarquee } from "../components/ContentMarquee";
import { FaithDefenceFeature } from "../components/FaithDefenceFeature";
import { GodlyKidsPromo } from "../components/GodlyKidsPromo";
import { NewsletterCTA } from "../components/NewsletterCTA";
import { Reveal } from "../components/RevealSection";
import { SectionHeader } from "../components/SectionHeader";
import { UnlessApparel } from "../components/UnlessApparel";
import {
  APP_REVIEWS,
  APP_REVIEW_AVERAGE,
  APP_REVIEW_COUNT,
  type AppReview,
} from "../data/appReviews";
import {
  amazonBooksApi,
  bookCoverUrl,
  booksApi,
  getMediaUrl,
  playlistsApi,
  type AmazonBook,
  type Book,
  type Playlist,
} from "../services/api";
import { filterCatalogBooks } from "../utils/catalogFilters";

export function Home() {
  const [allFeaturedBooks, setAllFeaturedBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(true);
  const [amazonBooks, setAmazonBooks] = useState<AmazonBook[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      booksApi.list({ status: "published", isFeatured: true, limit: 12 }),
      booksApi.list({ status: "published", limit: 40 }),
    ])
      .then(([featuredRes, allRes]) => {
        if (cancelled) return;
        const sorted = filterCatalogBooks(
          [...(featuredRes.data || [])].sort(
            (a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99),
          ),
        );
        setAllFeaturedBooks(sorted);
        setAllBooks(filterCatalogBooks(allRes.data || []));
      })
      .catch(() => {
        if (!cancelled) {
          setAllFeaturedBooks([]);
          setAllBooks([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingBooks(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    playlistsApi
      .list({ limit: 24 })
      .then((data) => {
        if (cancelled) return;
        const sorted = [...data].sort((a, b) => {
          const af = a.isFeatured ? 0 : 1;
          const bf = b.isFeatured ? 0 : 1;
          if (af !== bf) return af - bf;
          return (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99);
        });
        setPlaylists(sorted);
      })
      .catch(() => {
        if (!cancelled) setPlaylists([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingPlaylists(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    amazonBooksApi
      .list({ limit: 25 })
      .then((res) => {
        if (cancelled) return;
        setAmazonBooks(res.data || []);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const featuredBooks = allFeaturedBooks.slice(0, 4);
  const featuredAudio = playlists.slice(0, 4);

  const marqueeBooks = allBooks.length ? allBooks : allFeaturedBooks;

  return (
    <>
      <Hero
        books={marqueeBooks}
        playlists={playlists}
        amazonBooks={amazonBooks}
        loading={loadingBooks}
      />
      <GodlyKidsPromo />
      <ApoloKidsFeature />
      <FaithDefenceFeature />
      <MissionStrip />
      <FeaturedBooks featured={featuredBooks} loading={loadingBooks} />
      <UnlessApparel />
      <FeaturedAudio playlists={featuredAudio} loading={loadingPlaylists} />
      <Testimonials />
      <NewsletterSection />
    </>
  );
}

function Hero({
  books,
  playlists,
  amazonBooks,
  loading,
}: {
  books: Book[];
  playlists: Playlist[];
  amazonBooks: AmazonBook[];
  loading: boolean;
}) {
  return (
    <section className="relative snap-section overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-parchment via-parchment to-ink-50" />
        <div className="absolute -top-40 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-gold-300/30 blur-[140px]" />
        <div className="absolute -bottom-32 -right-20 h-[420px] w-[420px] rounded-full bg-ink-200/60 blur-3xl" />
      </div>

      <div className="container-page grid items-center gap-12 pb-20 pt-20 lg:grid-cols-[1.05fr,1fr] lg:gap-16 lg:pb-28 lg:pt-28">
        <div className="min-w-0 animate-fade-up">
          <p className="eyebrow">
            <Sparkles className="h-3.5 w-3.5" /> Kingdom Builders Publishing
          </p>
          <h1 className="mt-5 break-words font-serif text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-ink-950 [text-wrap:balance] sm:text-5xl md:text-6xl lg:text-7xl">
            Help us <span className="italic text-ink-900">Build</span> the{" "}
            <span className="relative inline-block px-1.5">
              <span className="relative z-10">Kingdom</span>
              <span
                aria-hidden
                className="absolute inset-x-1 bottom-1.5 -z-0 h-3 bg-gold-300/80"
              />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700">
            Christian books and audio adventures for kids and families —
            grounded in Scripture and built for the next generation of
            Kingdom Builders.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/books" className="btn-primary">
              <BookOpen className="h-4 w-4" />
              Explore Books
            </Link>
            <Link to="/listen" className="btn-ghost">
              <Headphones className="h-4 w-4" />
              Listen to Audio Series
            </Link>
          </div>
        </div>

        {loading && books.length === 0 ? (
          <div className="space-y-5">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="flex gap-6 overflow-hidden"
                aria-hidden
              >
                {Array.from({ length: 5 }).map((_, j) => (
                  <div
                    key={j}
                    className="h-[170px] w-[125px] shrink-0 animate-pulse rounded-2xl bg-ink-900/10"
                    style={{ animationDelay: `${(i * 5 + j) * 60}ms` }}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <ContentMarquee
            books={books}
            playlists={playlists}
            amazonBooks={amazonBooks}
          />
        )}
      </div>
    </section>
  );
}

function MissionStrip() {
  const items = [
    {
      icon: Cross,
      title: "Faithful Publishing",
      copy: "Every title is anchored in Scripture and shaped with prayer.",
    },
    {
      icon: Users,
      title: "Empower Ministries",
      copy: "We equip nonprofits with tools to grow and engage supporters.",
    },
    {
      icon: Globe2,
      title: "Global Reach",
      copy: "From neighborhood churches to nations — content that travels well.",
    },
    {
      icon: Heart,
      title: "Author-Centric",
      copy: "We walk with our writers from manuscript to mission impact.",
    },
  ];
  return (
    <section className="section snap-section pt-0">
      <div className="container-page">
        <Reveal className="grid gap-4 rounded-3xl border border-ink-900/10 bg-white/70 p-6 shadow-soft backdrop-blur-sm sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink-950 text-gold-300">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-ink-950">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-ink-700">{copy}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedBooks({
  featured,
  loading,
}: {
  featured: Book[];
  loading: boolean;
}) {
  return (
    <section className="section snap-section pt-0">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            eyebrow="Latest Publications"
            title="New releases and beloved titles"
            description="Discover our newest releases and upcoming titles from talented authors across devotionals, theology, memoir, and children's books."
            actionLabel="Browse all books"
            actionTo="/books"
          />
        </Reveal>

        <Reveal delay={120} className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-ink-900/10 bg-white/60 p-3 sm:p-4"
                >
                  <div className="aspect-[3/4] w-full animate-pulse rounded-lg bg-ink-900/10" />
                  <div className="mt-3 space-y-2">
                    <div className="h-2.5 w-16 animate-pulse rounded bg-ink-900/10" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-ink-900/10" />
                    <div className="h-2.5 w-1/2 animate-pulse rounded bg-ink-900/10" />
                  </div>
                </div>
              ))
            : featured.map((book, idx) => (
                <FeaturedBookCard key={book._id} book={book} palette={idx} />
              ))}
          {!loading && featured.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-ink-900/15 bg-white/60 p-10 text-center text-ink-700">
              <p className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4" /> No featured titles available right now.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedBookCard({ book, palette }: { book: Book; palette: number }) {
  const cover = bookCoverUrl(book);
  const cats = book.categories?.length
    ? book.categories
    : book.category
      ? [book.category]
      : [];
  const [errored, setErrored] = useState(false);
  return (
    <article className="group relative flex flex-col rounded-2xl border border-ink-900/10 bg-white/70 p-3 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-soft sm:p-4">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg ring-1 ring-ink-900/10">
        {cover && !errored ? (
          <img
            src={cover}
            alt={book.title}
            loading="lazy"
            onError={() => setErrored(true)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <BookCover
            title={book.title}
            author={book.author}
            palette={palette}
            badge={book.isFeatured ? "Featured" : undefined}
          />
        )}
      </div>
      <div className="mt-3 flex flex-1 flex-col">
        {cats[0] && (
          <p className="text-[10px] uppercase tracking-[0.16em] text-gold-700">
            {cats[0]}
          </p>
        )}
        <h3 className="mt-1 font-serif text-base font-semibold leading-snug text-ink-950 sm:text-lg">
          {book.title}
        </h3>
        {book.author && (
          <p className="mt-0.5 text-xs text-ink-700">by {book.author}</p>
        )}
        {book.description && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-700/90">
            {book.description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between border-t border-ink-900/10 pt-3">
          <span className="inline-flex items-center gap-1 text-[11px] text-ink-700">
            <BookOpen className="h-3 w-3" />
            {(book.readCount ?? 0).toLocaleString()}
          </span>
          <Link
            to="/books"
            aria-label={`Learn more about ${book.title}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-ink-900 transition hover:text-gold-700"
          >
            More
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function FeaturedAudio({
  playlists,
  loading,
}: {
  playlists: Playlist[];
  loading: boolean;
}) {
  return (
    <section className="section snap-section pt-0">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            eyebrow="Audio Series"
            title="Stories your kids will press play on, again and again."
            description="Original audio adventures and devotionals — fully voiced, packed with Scripture, and ready for the car ride home."
            actionLabel="Browse all series"
            actionTo="/listen"
          />
        </Reveal>

        <Reveal delay={120} className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-ink-900/10 bg-white/70 p-3 sm:p-4"
                >
                  <div className="aspect-square w-full animate-pulse rounded-lg bg-ink-900/10" />
                  <div className="mt-3 space-y-2">
                    <div className="h-2.5 w-16 animate-pulse rounded bg-ink-900/10" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-ink-900/10" />
                    <div className="h-2.5 w-1/2 animate-pulse rounded bg-ink-900/10" />
                  </div>
                </div>
              ))
            : playlists.map((p) => <PlaylistCard key={p._id} playlist={p} />)}
          {!loading && playlists.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-ink-900/15 bg-white/60 p-10 text-center text-ink-700">
              No audio series available right now.
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function PlaylistCard({ playlist }: { playlist: Playlist }) {
  const [errored, setErrored] = useState(false);
  const cover = getMediaUrl(playlist.coverImage);
  const episodes = playlist.items?.length || 0;
  const totalPlays = (playlist.items || []).reduce(
    (acc, it) => acc + (it.playCount || 0),
    0,
  );
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-900/10 bg-white/80 p-3 shadow-soft transition hover:-translate-y-1 sm:p-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg ring-1 ring-ink-900/10">
        {cover && !errored ? (
          <img
            src={cover}
            alt={playlist.title}
            loading="lazy"
            onError={() => setErrored(true)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-900 to-ink-800 p-4 text-center">
            <p className="font-serif text-base text-parchment">{playlist.title}</p>
          </div>
        )}
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-ink-950/85 px-2 py-0.5 text-[9px] font-semibold text-parchment backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
          <Headphones className="h-2.5 w-2.5" />
          {playlist.type || "Audio"}
        </span>
        <span className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-gold-400 text-ink-950 shadow-soft transition group-hover:scale-110 sm:bottom-3 sm:right-3 sm:h-9 sm:w-9">
          <Play className="h-3 w-3 fill-current sm:h-3.5 sm:w-3.5" />
        </span>
      </div>
      <div className="mt-3 flex flex-1 flex-col">
        {(playlist.categories?.[0] || playlist.category) && (
          <p className="text-[10px] uppercase tracking-[0.16em] text-gold-700">
            {playlist.categories?.[0] || playlist.category}
          </p>
        )}
        <h3 className="mt-1 line-clamp-2 font-serif text-base font-semibold leading-snug text-ink-950 sm:text-lg">
          {playlist.title}
        </h3>
        {playlist.description && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-700/90">
            {playlist.description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between border-t border-ink-900/10 pt-3 text-[11px] text-ink-700">
          <span>{episodes} {episodes === 1 ? "ep" : "eps"}</span>
          {totalPlays > 0 && <span>{totalPlays.toLocaleString()} plays</span>}
        </div>
      </div>
    </article>
  );
}

function Testimonials() {
  const spotlights = APP_REVIEWS.filter((r) => r.spotlight).slice(0, 3);
  const featured: AppReview[] = spotlights.length
    ? spotlights
    : APP_REVIEWS.slice(0, 3);

  return (
    <section className="section snap-section pt-0">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            eyebrow={`${APP_REVIEW_COUNT}+ App Store Reviews · ${APP_REVIEW_AVERAGE}.0 average`}
            title="What parents are saying"
            description="Real reviews from families using the Godly Kids app — kids who can't stop watching, parents who can finally relax."
          />
        </Reveal>

        <Reveal delay={120} className="mt-12 grid gap-6 lg:grid-cols-3">
          {featured.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Reveal>

        <Reveal
          delay={240}
          className="mt-10 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-6"
        >
          <span className="inline-flex items-center gap-2 text-sm text-ink-700">
            <Star className="h-4 w-4 fill-current text-gold-500" />
            Rated {APP_REVIEW_AVERAGE}.0 across {APP_REVIEW_COUNT}+ reviews
          </span>
          <a
            href="https://apps.apple.com/app/godly-kids/id6471334059"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-gold-700"
          >
            Read all reviews on the App Store
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: AppReview }) {
  const rating = review.rating ?? 5;
  return (
    <figure className="group relative flex h-full flex-col rounded-3xl border border-ink-900/10 bg-white/85 p-7 shadow-soft transition hover:-translate-y-1 hover:border-gold-300/50">
      <div className="flex items-center gap-1 text-gold-500" aria-label={`${rating} star rating`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "fill-current" : "opacity-30"}`}
          />
        ))}
      </div>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-700">
        {review.title}
      </p>
      <blockquote className="mt-2 flex-1 font-serif text-lg leading-snug text-ink-950">
        "{review.quote}"
      </blockquote>
      <figcaption className="mt-6 border-t border-ink-900/10 pt-4">
        <p className="font-semibold text-ink-950">{review.author}</p>
        <p className="text-sm text-ink-700">
          App Store review{review.country ? ` · ${review.country}` : ""}
        </p>
      </figcaption>
    </figure>
  );
}

function NewsletterSection() {
  return (
    <section className="section snap-section pt-0">
      <div className="container-page">
        <Reveal>
          <NewsletterCTA />
        </Reveal>

        <Reveal delay={120} className="mt-10 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-6">
          <span className="inline-flex items-center gap-2 text-sm text-ink-700">
            <Mail className="h-4 w-4 text-gold-700" /> Read past issues
          </span>
          <Link
            to="/newsletter"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-gold-700"
          >
            Newsletter archive <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

