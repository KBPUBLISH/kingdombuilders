import { Link } from "react-router-dom";
import {
  BookOpen,
  BookOpenCheck,
  Sprout,
  Lightbulb,
  Users,
  Globe2,
  Cross,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "../components/PageHero";

export function About() {
  return (
    <>
      <PageHero
        eyebrow="Our Mission"
        title={
          <>
            Empowering Kingdom work <br />
            through faithful publishing.
          </>
        }
        description="We help authors, ministries, and nonprofits create meaningful impact through publications, digital tools, and supporter engagement that lasts."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/books" className="btn-primary">
            <BookOpen className="h-4 w-4" /> Browse Books
          </Link>
          <Link to="/contact" className="btn-ghost">
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <WhoWeAre />
      <Impact />
      <Goals />
      <Values />
    </>
  );
}

function WhoWeAre() {
  return (
    <section className="section pt-0">
      <div className="container-page grid items-start gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow"><Cross className="h-3.5 w-3.5" /> Who We Are</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
            A passionate team helping the Church tell its story.
          </h2>
        </div>
        <div className="space-y-4 text-ink-700 lg:text-lg">
          <p>
            Kingdom Builders Publishing is a faith-driven publishing house dedicated
            to transforming how ministries and nonprofits connect with their
            supporters. We work alongside authors, pastors, and organizations to
            shape ideas, refine voices, and put resources in the hands of the
            people who need them most.
          </p>
          <p>
            Our platform helps mission-driven teams build compelling campaigns,
            manage supporter relationships, and amplify their impact through
            innovative digital strategies — all rooted in Scripture and the
            timeless work of the gospel.
          </p>
        </div>
      </div>
    </section>
  );
}

function Impact() {
  const stats = [
    { value: "100+", label: "Organizations Supported", icon: Users },
    { value: "56+", label: "Titles Published", icon: BookOpenCheck },
    { value: "10K+", label: "Readers Engaged", icon: Sprout },
    { value: "32", label: "Countries Reached", icon: Globe2 },
  ];
  return (
    <section id="impact" className="section pt-0">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-14 text-parchment shadow-glow sm:px-10 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-noise opacity-25" />
          <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gold-500/20 blur-[120px]" />
          <div className="relative">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow justify-center text-gold-300">
                <Sprout className="h-3.5 w-3.5" /> Our Impact
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Generosity, multiplied across the world.
              </h2>
              <p className="mt-4 text-parchment/75">
                Every gift, every book, every newsletter reaches further than we ever
                could alone. Here is what God has done together with our community.
              </p>
            </div>
            <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-parchment/10 bg-parchment/[0.04] p-6 text-center backdrop-blur-sm"
                >
                  <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-gold-400 text-ink-950">
                    <Icon className="h-5 w-5" />
                  </div>
                  <dt className="mt-4 font-serif text-4xl font-semibold">{value}</dt>
                  <dd className="mt-2 text-xs uppercase tracking-[0.18em] text-parchment/70">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Goals() {
  const goals = [
    {
      n: "01",
      title: "Equip with tools that work",
      copy: "Empower nonprofits with cutting-edge digital tools that are simple, accessible, and built to serve.",
      icon: Lightbulb,
    },
    {
      n: "02",
      title: "Build meaningful connection",
      copy: "Foster real relationships between organizations and the supporters who carry their mission.",
      icon: HeartHandshake,
    },
    {
      n: "03",
      title: "Drive sustainable growth",
      copy: "Help mission-driven teams reach further through fundraising and content strategies that endure.",
      icon: Sprout,
    },
    {
      n: "04",
      title: "Publish for the long term",
      copy: "Pursue books that bless one generation and still preach to the next. Faithfulness over hype.",
      icon: BookOpenCheck,
    },
  ];
  return (
    <section className="section pt-0">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center"><Sparkle /> Our Goals</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
            Four commitments that guide every decision.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {goals.map((g) => (
            <article
              key={g.n}
              className="group flex gap-6 rounded-3xl border border-ink-900/10 bg-white/80 p-7 shadow-soft transition hover:-translate-y-1"
            >
              <div className="flex flex-col items-center gap-3">
                <span className="font-serif text-2xl font-semibold text-gold-700">
                  {g.n}
                </span>
                <span className="block h-full w-px bg-gradient-to-b from-gold-400/80 to-transparent" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-gold-700">
                  <g.icon className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                    Goal
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-ink-950">
                  {g.title}
                </h3>
                <p className="mt-2 text-ink-700">{g.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z" />
    </svg>
  );
}

function Values() {
  const values = [
    { word: "Scripture", desc: "We publish what the Word affirms." },
    { word: "Stewardship", desc: "We honor every dollar entrusted to us." },
    { word: "Service", desc: "We exist to lift up the local church." },
    { word: "Story", desc: "We believe story is how truth travels." },
  ];
  return (
    <section className="section pt-0">
      <div className="container-page">
        <div className="rounded-3xl border border-ink-900/10 bg-white/70 p-8 shadow-soft backdrop-blur-sm sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr,1.4fr]">
            <div>
              <p className="eyebrow">Our Values</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
                What we hold to, no matter what.
              </h2>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <li
                  key={v.word}
                  className="rounded-2xl border border-ink-900/10 bg-parchment p-5"
                >
                  <p className="font-serif text-2xl font-semibold text-ink-950">
                    {v.word}
                  </p>
                  <p className="mt-1 text-sm text-ink-700">{v.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

