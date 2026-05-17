import { ArrowRight, Quote, ShoppingBag, Sparkles } from "lucide-react";
import { useParallaxOffset, useReveal } from "../hooks/useReveal";

const UNLESS_SHOP_URL =
  "mailto:hello@kbpublish.org?subject=UNLESS%20Apparel%20Inquiry&body=I%27d%20like%20more%20info%20about%20the%20UNLESS%20apparel%20collection.";

const KINGDOM_BUILDER_SHOP_URL =
  "mailto:hello@kbpublish.org?subject=Kingdom%20Builder%20Kids%27%20Tee&body=I%27d%20like%20more%20info%20about%20the%20Kingdom%20Builder%20kids%27%20t-shirt.";

type Verse = {
  ref: string;
  theme: string;
  quote: string;
};

const verses: Verse[] = [
  {
    ref: "John 3:3",
    theme: "Born Again",
    quote:
      "Truly, truly, I say to you, unless one is born again he cannot see the kingdom of God.",
  },
  {
    ref: "Luke 13:3",
    theme: "Repentance",
    quote: "Unless you repent, you too will all perish.",
  },
  {
    ref: "Matthew 18:3",
    theme: "Childlikeness",
    quote:
      "Unless you change and become like little children, you will never enter the kingdom of heaven.",
  },
  {
    ref: "John 6:53",
    theme: "Communion",
    quote:
      "Unless you eat the flesh of the Son of Man and drink his blood, you have no life in you.",
  },
  {
    ref: "Matthew 5:20",
    theme: "Righteousness",
    quote:
      "Unless your righteousness exceeds that of the scribes and Pharisees, you will never enter the kingdom of heaven.",
  },
  {
    ref: "John 6:44",
    theme: "Drawn by the Father",
    quote: "No one can come to me unless the Father who sent me draws him.",
  },
];

type LookbookShot = {
  src: string;
  alt: string;
  label: string;
  caption: string;
};

const lookbook: LookbookShot[] = [
  {
    src: "/apparel/unless-womens.png",
    alt: "Woman wearing a heather-rose UNLESS t-shirt in a church kids' ministry",
    label: "Women's · Heather Rose",
    caption: "Soft tri-blend tee, hand-lettered UNLESS print.",
  },
  {
    src: "/apparel/unless-mens.png",
    alt: "Man wearing a charcoal UNLESS t-shirt in a church kids' ministry",
    label: "Men's · Tri-Blend Charcoal",
    caption: "Vintage-washed crew with chalk-style lettering.",
  },
  {
    src: "/apparel/unless-family.png",
    alt: "Mother and daughter wearing matching UNLESS t-shirts",
    label: "Kids & Family · Matching set",
    caption: "Bundle the whole family — adult and kids' sizes.",
  },
  {
    src: "/apparel/unless-back.png",
    alt: "Back of the UNLESS t-shirt showing the Matthew 18:3 verse",
    label: "Back print · Matthew 18:3",
    caption: "The verse on the back finishes the story.",
  },
];

export function UnlessApparel() {
  const [photoRef, photoOffset] = useParallaxOffset<HTMLDivElement>(0.08);
  const [storyRef, storyVisible] = useReveal<HTMLDivElement>();
  const [versesRef, versesVisible] = useReveal<HTMLDivElement>();
  const [lookbookRef, lookbookVisible] = useReveal<HTMLDivElement>();

  return (
    <section
      id="apparel"
      className="relative snap-section overflow-hidden bg-ink-950 text-parchment"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(218,171,63,0.18),transparent_60%)]" />
        <div className="absolute -bottom-40 -right-32 h-[520px] w-[520px] rounded-full bg-gold-500/15 blur-[160px]" />
        <div className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-ink-700/40 blur-[140px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay" />
      </div>

      <div className="container-page relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[1.05fr,1fr] lg:gap-20 lg:py-28">
        <div
          ref={photoRef}
          className="relative mx-auto w-full max-w-[560px] pb-24 sm:pb-32"
          style={{ transform: `translate3d(0, ${photoOffset}px, 0)` }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-gold-400/30 via-transparent to-ink-800/50 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-white/10 shadow-soft">
            <img
              src="/apparel/unless-family.png"
              alt="A mother and daughter wearing UNLESS branded t-shirts outside"
              loading="lazy"
              className="block h-full w-full object-cover"
            />
            <span className="pointer-events-none absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-ink-950/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-300 backdrop-blur-sm">
              <Sparkles className="h-3 w-3" /> Wear the Word
            </span>
          </div>

          {/* Back-print detail shot — offset polaroid card overlapping the main photo */}
          <figure
            className="absolute -bottom-2 right-2 w-[55%] max-w-[260px] rotate-[4deg] rounded-2xl bg-parchment/95 p-2 pb-3 shadow-soft ring-1 ring-ink-950/10 sm:-bottom-4 sm:right-4"
            aria-label="Back of the UNLESS t-shirt showing the Matthew 18:3 verse and references"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src="/apparel/unless-back.png"
                alt="Back of the UNLESS t-shirt: 'Unless you change and become like little children, you will never enter the kingdom of heaven.'"
                loading="lazy"
                className="block h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-1.5 text-center font-hand text-base text-ink-900">
              the back tells the story
            </figcaption>
          </figure>

          <p className="mt-4 text-center font-hand text-2xl text-gold-300/90">
            "unless"
            <span className="ml-2 text-sm font-sans uppercase tracking-[0.18em] text-parchment/60">
              the words of Jesus, on the streets
            </span>
          </p>
        </div>

        <div
          ref={storyRef}
          className={`relative transition-all duration-[900ms] ease-out ${
            storyVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-parchment/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300 backdrop-blur-sm">
            Kingdom Apparel
          </span>

          <h2 className="mt-5 flex flex-wrap items-baseline gap-x-4 font-serif text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            <span>The</span>
            <span className="font-hand text-7xl font-bold text-gold-300 sm:text-8xl lg:text-[8rem]">
              UNLESS
            </span>
            <span>Collection</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-parchment/80">
            One word — said by Jesus more than any other condition for the
            kingdom. Six "unless" statements that mark the line between just
            hearing the gospel and stepping into it. Our shirts carry that one
            word, so the conversation starts wherever you go.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={UNLESS_SHOP_URL} className="btn-gold">
              <ShoppingBag className="h-4 w-4" />
              Shop the Collection
            </a>
            <a
              href="#unless-verses"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-parchment/80 hover:text-gold-300"
            >
              Read the six verses <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="container-page relative pb-20 sm:pb-24 lg:pb-28" id="unless-verses">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300">
              The Six "Unless" Statements of Jesus
            </p>
            <h3 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
              Why we wear the word.
            </h3>
          </div>
        </div>

        <div
          ref={versesRef}
          className={`grid gap-5 transition-all duration-[900ms] ease-out sm:grid-cols-2 lg:grid-cols-3 ${
            versesVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {verses.map((v, i) => (
            <article
              key={v.ref}
              className="group relative flex h-full flex-col rounded-3xl border border-parchment/10 bg-white/[0.04] p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-gold-300/30 hover:bg-white/[0.07]"
              style={{ transitionDelay: versesVisible ? `${i * 60}ms` : "0ms" }}
            >
              <div className="flex items-center justify-between">
                <span className="font-hand text-3xl text-gold-300">
                  unless
                </span>
                <Quote className="h-4 w-4 text-parchment/30" />
              </div>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300/80">
                {v.theme}
              </p>
              <blockquote className="mt-2 font-serif text-lg leading-snug text-parchment/95">
                "{v.quote}"
              </blockquote>
              <p className="mt-auto pt-4 text-sm font-medium text-parchment/60">
                — Jesus, <span className="text-parchment">{v.ref}</span>
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300">
                The collection
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
                One word. Two tees.
              </h3>
            </div>
          </div>

          <div
            ref={lookbookRef}
            className={`grid grid-cols-2 gap-3 transition-all duration-[900ms] ease-out sm:gap-5 ${
              lookbookVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {lookbook.map((shot, i) => (
              <figure
                key={shot.src}
                className="group relative overflow-hidden rounded-2xl border border-parchment/10 bg-white/[0.04] backdrop-blur-sm transition hover:-translate-y-1 hover:border-gold-300/30"
                style={{ transitionDelay: lookbookVisible ? `${i * 80}ms` : "0ms" }}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    loading="lazy"
                    className="block h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/70 to-transparent" />
                  <span className="font-hand pointer-events-none absolute left-3 top-3 text-xl text-gold-300/95 drop-shadow-md sm:left-4 sm:top-4 sm:text-2xl">
                    unless
                  </span>
                </div>
                <figcaption className="flex items-center justify-between gap-2 p-3 sm:p-4">
                  <div className="min-w-0">
                    <p className="truncate text-[9px] font-semibold uppercase tracking-[0.14em] text-gold-300 sm:text-[10px]">
                      {shot.label}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-parchment/80 sm:text-xs">
                      {shot.caption}
                    </p>
                  </div>
                  <a
                    href={UNLESS_SHOP_URL}
                    aria-label={`Inquire about ${shot.label}`}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-300 text-ink-950 transition group-hover:bg-gold-200"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-3xl border border-parchment/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:p-7">
          <div>
            <p className="font-serif text-2xl font-semibold">
              Wear it. Spark a conversation.
            </p>
            <p className="mt-1 max-w-xl text-sm text-parchment/70">
              Adult and kids' sizes available. New drops every season — drop us
              a note and we'll send the catalog.
            </p>
          </div>
          <a href={UNLESS_SHOP_URL} className="btn-gold w-full justify-center sm:w-auto">
            <ShoppingBag className="h-4 w-4" />
            Inquire / Shop
          </a>
        </div>

        <KingdomBuilderSpotlight />
      </div>
    </section>
  );
}

function KingdomBuilderSpotlight() {
  const [ref, visible] = useReveal<HTMLDivElement>();
  const [photoRef, photoOffset] = useParallaxOffset<HTMLDivElement>(0.06);

  return (
    <div className="mt-16 border-t border-parchment/10 pt-12 sm:mt-20 sm:pt-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300">
            Also from the studio
          </p>
          <h3 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
            For the little kingdom builders.
          </h3>
        </div>
      </div>

      <div
        ref={ref}
        className={`grid items-center gap-8 transition-all duration-[900ms] ease-out sm:gap-10 lg:grid-cols-[1fr,1fr] lg:gap-14 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div
          ref={photoRef}
          className="relative mx-auto w-full max-w-[520px]"
          style={{ transform: `translate3d(0, ${photoOffset}px, 0)` }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-gold-400/25 via-rose-900/20 to-blue-500/25 blur-2xl"
          />
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <div className="relative overflow-hidden rounded-[1.25rem] ring-1 ring-white/10 shadow-soft sm:rounded-[1.5rem]">
              <img
                src="/apparel/kingdom-builder-kids.png?v=2"
                alt="Young boy wearing a navy blue Kingdom Builder t-shirt with a castle on a cloud"
                loading="lazy"
                className="block aspect-square h-full w-full object-cover"
              />
              <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-ink-950/85 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-gold-300 backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2.5 sm:text-[10px]">
                Navy
              </span>
            </div>
            <div className="relative overflow-hidden rounded-[1.25rem] ring-1 ring-white/10 shadow-soft sm:rounded-[1.5rem]">
              <img
                src="/apparel/kingdom-builder-kids-maroon.png?v=1"
                alt="Young boy wearing a maroon Kingdom Builder t-shirt with gold castle graphic"
                loading="lazy"
                className="block aspect-square h-full w-full object-cover"
              />
              <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-ink-950/85 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-gold-300 backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2.5 sm:text-[10px]">
                Maroon
              </span>
            </div>
          </div>
          <p className="mt-3 text-center font-hand text-xl text-gold-300/90">
            raise them to build His kingdom
          </p>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-parchment/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300 backdrop-blur-sm">
            Kingdom Builder · Kids
          </span>

          <h4 className="mt-4 font-serif text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">
            <span className="text-gold-300">Kingdom Builder</span>{" "}
            <span className="text-parchment/95">tee.</span>
          </h4>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-parchment/80">
            Our flagship kids' shirt — a castle on the clouds, stitched in gold,
            on soft combed cotton. Navy or maroon: a daily reminder they're
            building something that outlasts them.
          </p>

          <ul className="mt-5 grid gap-2 text-sm text-parchment/80 sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-300" />
              Sizes 2T – Youth XL
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-300" />
              Navy & maroon · combed cotton
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-300" />
              Embroidered-look print
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-300" />
              Printed in small batches
            </li>
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={KINGDOM_BUILDER_SHOP_URL} className="btn-gold">
              <ShoppingBag className="h-4 w-4" />
              Inquire / Pre-order
            </a>
            <a
              href={UNLESS_SHOP_URL}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-parchment/80 hover:text-gold-300"
            >
              See the full lookbook <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
