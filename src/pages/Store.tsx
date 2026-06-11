import { Lock, ShoppingBag, Sparkles } from "lucide-react";
import { ApoloKidsStore } from "../components/ApoloKidsStore";
import { ChristianLevelsStore } from "../components/ChristianLevelsStore";
import { PageHero } from "../components/PageHero";

export function Store() {
  return (
    <>
      <PageHero
        eyebrow="Store"
        title={<>Books and curriculum<br />for young defenders.</>}
        description="Purchase Christian Level curriculum, Apolo-Kids, and more — secure checkout powered by Stripe."
      />

      <section className="section pt-0">
        <div className="container-page space-y-6">
          <ApoloKidsStore />
          <ChristianLevelsStore />
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <div className="grid gap-4 rounded-3xl border border-ink-900/10 bg-white/70 p-6 shadow-soft backdrop-blur-sm sm:grid-cols-3 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink-950 text-gold-300">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-ink-950">
                  Secure checkout
                </p>
                <p className="mt-1 text-sm text-ink-700">
                  Payments are processed safely through Stripe.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink-950 text-gold-300">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-ink-950">
                  Buy what you need
                </p>
                <p className="mt-1 text-sm text-ink-700">
                  Start with one level or save with the full Levels 1–3 bundle.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink-950 text-gold-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-ink-950">
                  Kingdom Builders Publishing
                </p>
                <p className="mt-1 text-sm text-ink-700">
                  Faith-filled learning from the team behind Apolo-Kids and
                  Godly Kids.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
