import { useEffect, useMemo, useState } from "react";
import { AlertCircle, BookOpen, Loader2, Search, ShoppingBag } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { NewsletterCTA } from "../components/NewsletterCTA";
import {
  booksApi,
  bookCoverUrl,
  type Book,
} from "../services/api";

export function Books() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    booksApi
      .list({ status: "published", limit: 100 })
      .then((res) => {
        if (cancelled) return;
        setAllBooks(res.data || []);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load books", err);
        setError("We couldn't reach the catalog. Please try again shortly.");
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
    for (const b of allBooks) {
      (b.categories || []).forEach((c) => c && set.add(c));
      if (!b.categories?.length && b.category) set.add(b.category);
    }
    return ["All", ...Array.from(set).sort()];
  }, [allBooks]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allBooks.filter((b) => {
      const cats = b.categories?.length ? b.categories : b.category ? [b.category] : [];
      const inCat = category === "All" || cats.includes(category);
      const inQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        (b.author || "").toLowerCase().includes(q) ||
        (b.description || "").toLowerCase().includes(q);
      return inCat && inQuery;
    });
  }, [allBooks, category, query]);

  return (
    <>
      <PageHero
        eyebrow="Bookstore"
        title={<>Books that nourish faith <br />and shape lives.</>}
        description="Browse our growing catalog of devotionals, theology, memoirs, Bible studies, and children's books — each thoughtfully crafted and rooted in Scripture."
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
                placeholder="Search titles, authors, or themes…"
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
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading catalog…
              </span>
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-ink-950">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "title" : "titles"}
              </>
            )}
          </p>

          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-3xl border border-red-200 bg-red-50 p-5 text-red-900">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <BookSkeleton key={i} />)
              : filtered.map((book) => <BookCard key={book._id} book={book} />)}
          </div>

          {!loading && filtered.length === 0 && !error && (
            <div className="mt-16 rounded-3xl border border-dashed border-ink-900/15 bg-white/60 p-12 text-center">
              <p className="font-serif text-2xl font-semibold text-ink-950">
                No books matched your search.
              </p>
              <p className="mt-2 text-ink-700">
                Try a different keyword or category — we're publishing new titles often.
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

function BookCard({ book }: { book: Book }) {
  const cover = bookCoverUrl(book);
  const cats = book.categories?.length ? book.categories : book.category ? [book.category] : [];
  const primaryCategory = cats[0];
  const isFeatured = book.isFeatured;

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-ink-900/10 bg-white/75 p-5 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-soft">
      <CoverImage src={cover} title={book.title} featured={isFeatured} />

      <div className="mt-5 flex flex-1 flex-col">
        {primaryCategory && (
          <p className="text-xs uppercase tracking-[0.18em] text-gold-700">
            {primaryCategory}
          </p>
        )}
        <h3 className="mt-1.5 font-serif text-xl font-semibold leading-snug text-ink-950">
          {book.title}
        </h3>
        {book.author && (
          <p className="mt-1 text-sm text-ink-700">by {book.author}</p>
        )}
        {book.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-700/90">
            {book.description}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between border-t border-ink-900/10 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-700">
            <BookOpen className="h-3.5 w-3.5" />
            {(book.readCount ?? 0).toLocaleString()} reads
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-3.5 py-2 text-xs font-semibold text-parchment transition hover:bg-ink-800"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> View
          </button>
        </div>
      </div>
    </article>
  );
}

function CoverImage({
  src,
  title,
  featured,
}: {
  src: string;
  title: string;
  featured?: boolean;
}) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gradient-to-br from-ink-900 to-ink-800 ring-1 ring-ink-900/10">
      {featured && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-gold-400 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink-950 shadow-soft">
          Featured
        </span>
      )}
      {src && !errored ? (
        <img
          src={src}
          alt={title}
          loading="lazy"
          onError={() => setErrored(true)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-5 text-center">
          <p className="font-serif text-xl text-parchment">{title}</p>
        </div>
      )}
    </div>
  );
}

function BookSkeleton() {
  return (
    <div className="rounded-3xl border border-ink-900/10 bg-white/60 p-5">
      <div className="aspect-[3/4] w-full animate-pulse rounded-xl bg-ink-900/10" />
      <div className="mt-5 space-y-3">
        <div className="h-3 w-16 animate-pulse rounded bg-ink-900/10" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-ink-900/10" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-ink-900/10" />
        <div className="space-y-2 pt-2">
          <div className="h-2 w-full animate-pulse rounded bg-ink-900/10" />
          <div className="h-2 w-5/6 animate-pulse rounded bg-ink-900/10" />
          <div className="h-2 w-2/3 animate-pulse rounded bg-ink-900/10" />
        </div>
      </div>
    </div>
  );
}
