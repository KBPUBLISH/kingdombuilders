import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ExternalLink,
  Loader2,
  Search,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { PageHero } from "../components/PageHero";
import {
  amazonBooksApi,
  getMediaUrl,
  type AmazonBook,
} from "../services/api";

export function Store() {
  const [items, setItems] = useState<AmazonBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    amazonBooksApi
      .list({ limit: 100 })
      .then((res) => {
        if (cancelled) return;
        const sorted = [...(res.data || [])].sort((a, b) => {
          if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
          return (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99);
        });
        setItems(sorted);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load store", err);
        setError("We couldn't load the store right now. Please try again shortly.");
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
    items.forEach((it) => {
      (it.categories || []).forEach((c) => c && set.add(c));
      if (!it.categories?.length && it.category) set.add(it.category);
    });
    return ["All", ...Array.from(set).sort()];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      const cats = it.categories?.length
        ? it.categories
        : it.category
          ? [it.category]
          : [];
      const inCat = category === "All" || cats.includes(category);
      const inQuery =
        !q ||
        it.title.toLowerCase().includes(q) ||
        (it.author || "").toLowerCase().includes(q) ||
        (it.description || "").toLowerCase().includes(q);
      return inCat && inQuery;
    });
  }, [items, category, query]);

  return (
    <>
      <PageHero
        eyebrow="Bookstore"
        title={<>Christian books for kids,<br />delivered to your door.</>}
        description="Physical editions of our books, available on Amazon. Every purchase supports our author community and helps us bring more Kingdom stories to families everywhere."
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
                placeholder="Search titles or authors…"
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
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading store…
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

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
              : filtered.map((item) => <ProductCard key={item._id} item={item} />)}
          </div>

          {!loading && filtered.length === 0 && !error && (
            <div className="mt-16 rounded-3xl border border-dashed border-ink-900/15 bg-white/60 p-12 text-center">
              <p className="font-serif text-2xl font-semibold text-ink-950">
                No books matched your search.
              </p>
              <p className="mt-2 text-ink-700">
                Try a different keyword or category — new titles drop every season.
              </p>
            </div>
          )}
        </div>
      </section>

      <PerksStrip />
    </>
  );
}

function ProductCard({ item }: { item: AmazonBook }) {
  const [errored, setErrored] = useState(false);
  const cover = getMediaUrl(item.coverImage);
  const ratingValues = (item.reviews || [])
    .map((r) => r.rating ?? 0)
    .filter((r) => r > 0);
  const avgRating = ratingValues.length
    ? ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length
    : null;
  const reviewCount = item.reviews?.length || 0;
  const cats = item.categories?.length
    ? item.categories
    : item.category
      ? [item.category]
      : [];

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-ink-900/10 bg-white/85 p-6 shadow-soft transition hover:-translate-y-1">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl ring-1 ring-ink-900/10">
        {cover && !errored ? (
          <img
            src={cover}
            alt={item.title}
            loading="lazy"
            onError={() => setErrored(true)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-900 to-ink-800 p-5 text-center">
            <p className="font-serif text-xl text-parchment">{item.title}</p>
          </div>
        )}
        {item.badgeText ? (
          <span
            className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink-950 shadow-soft"
            style={{ backgroundColor: item.badgeColor || "#daab3f" }}
          >
            {item.badgeText}
          </span>
        ) : item.isFeatured ? (
          <span className="absolute left-3 top-3 rounded-full bg-gold-400 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink-950 shadow-soft">
            Featured
          </span>
        ) : null}
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        {cats[0] && (
          <p className="text-xs uppercase tracking-[0.18em] text-gold-700">
            {cats[0]}
          </p>
        )}
        <h3 className="mt-1.5 font-serif text-2xl font-semibold text-ink-950">
          {item.title}
        </h3>
        {item.author && (
          <p className="mt-1 text-sm text-ink-700">by {item.author}</p>
        )}
        {item.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-700/90">
            {item.description}
          </p>
        )}

        {avgRating !== null && (
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-gold-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.round(avgRating) ? "fill-current" : "opacity-30"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-ink-700">
              {avgRating.toFixed(1)} · {reviewCount}{" "}
              {reviewCount === 1 ? "review" : "reviews"}
            </span>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-ink-900/10 pt-4">
          <span className="font-serif text-xl font-semibold text-ink-950">
            {item.price || "—"}
          </span>
          {item.amazonUrl ? (
            <a
              href={item.amazonUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary px-4 py-2 text-xs"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Buy on Amazon
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          ) : (
            <span className="text-xs text-ink-700">Coming soon</span>
          )}
        </div>
      </div>
    </article>
  );
}

function ProductSkeleton() {
  return (
    <div className="rounded-3xl border border-ink-900/10 bg-white/60 p-6">
      <div className="aspect-[3/4] w-full animate-pulse rounded-2xl bg-ink-900/10" />
      <div className="mt-5 space-y-3">
        <div className="h-3 w-16 animate-pulse rounded bg-ink-900/10" />
        <div className="h-6 w-3/4 animate-pulse rounded bg-ink-900/10" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-ink-900/10" />
        <div className="space-y-2 pt-2">
          <div className="h-2 w-full animate-pulse rounded bg-ink-900/10" />
          <div className="h-2 w-5/6 animate-pulse rounded bg-ink-900/10" />
        </div>
      </div>
    </div>
  );
}

function PerksStrip() {
  const perks = [
    {
      icon: Truck,
      title: "Shipped by Amazon",
      copy: "Fast, trackable delivery wherever Amazon ships.",
    },
    {
      icon: ShoppingBag,
      title: "Author-owned royalties",
      copy: "Your purchase directly supports the writer and the mission.",
    },
    {
      icon: Star,
      title: "Loved by families",
      copy: "Real five-star reviews from real Christian parents.",
    },
  ];
  return (
    <section className="section pt-0">
      <div className="container-page">
        <div className="grid gap-4 rounded-3xl border border-ink-900/10 bg-white/70 p-6 shadow-soft backdrop-blur-sm sm:grid-cols-3 sm:p-8">
          {perks.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink-950 text-gold-300">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-ink-950">
                  {title}
                </p>
                <p className="mt-1 text-sm text-ink-700">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
