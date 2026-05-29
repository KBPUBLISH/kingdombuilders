import { BookMarked, ShieldCheck, Sparkles, Swords } from "lucide-react";
import { Link } from "react-router-dom";
import { ApoloKidsPurchaseOptions } from "../components/ApoloKidsPurchaseOptions";
import { PageHero } from "../components/PageHero";

export function ApoloKids() {
  return (
    <>
      <PageHero
        eyebrow="Apolo-Kids"
        title="Apologetics for Young Defenders"
        description="A gamified Christian textbook for ages 14+ that trains teens to think biblically and answer culture with confidence."
      />

      <section className="section relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-ink-50 via-parchment to-parchment" />
          <div className="absolute -top-28 right-0 h-[320px] w-[320px] rounded-full bg-gold-300/25 blur-[110px]" />
        </div>

        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[1.05fr,1fr] lg:items-center">
            <div className="mx-auto w-full max-w-[460px]">
              <img
                src="/featured/apolo-kids.png?v=3"
                alt="Apolo-Kids — Apologetics for Young Defenders textbook"
                loading="lazy"
                className="block w-full drop-shadow-[0_30px_50px_rgba(36,31,61,0.25)]"
              />
            </div>

            <div className="space-y-5 rounded-3xl border border-ink-900/10 bg-white/80 p-6 shadow-soft backdrop-blur-sm sm:p-8">
              <h2 className="font-serif text-3xl font-semibold text-ink-950 sm:text-4xl">
                What&apos;s inside
              </h2>
              <ul className="space-y-4 text-ink-700">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg bg-ink-950 text-gold-300">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span>Gamified chapters with quests, challenges, and progress markers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg bg-ink-950 text-gold-300">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <span>Scripture-rooted teaching that forms biblical worldview foundations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg bg-ink-950 text-gold-300">
                    <Swords className="h-4 w-4" />
                  </span>
                  <span>Practical responses to culture, science, and world religions.</span>
                </li>
              </ul>

              <ApoloKidsPurchaseOptions />

              <Link to="/#apolo-kids" className="btn-ghost w-full justify-center sm:w-auto">
                <BookMarked className="h-4 w-4" />
                Back to Home Section
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
