import { ExternalLink, ShoppingBag, Sparkles } from "lucide-react";
import { christianLevelProducts } from "../data/christianLevelsShop";

export function ChristianLevelsStore() {
  const bundle = christianLevelProducts.find((p) => p.featured);
  const levels = christianLevelProducts.filter((p) => !p.featured);

  return (
    <div className="rounded-3xl border border-ink-900/10 bg-white/85 p-6 shadow-soft backdrop-blur-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-700">
            <ShoppingBag className="h-3.5 w-3.5" />
            Digital curriculum
          </p>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-ink-950 sm:text-3xl">
            Christian Level 1, 2 &amp; 3
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-700 sm:text-base">
            Purchase individual levels or get the full bundle — secure checkout
            powered by Stripe.
          </p>
        </div>
      </div>

      {bundle && (
        <div className="mt-6 rounded-2xl border-2 border-gold-400/50 bg-gradient-to-br from-gold-100/80 via-parchment to-parchment p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-300 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-950">
                <Sparkles className="h-3 w-3" />
                Best value
              </span>
              <p className="mt-2 font-serif text-xl font-semibold text-ink-950 sm:text-2xl">
                {bundle.title}
              </p>
              {bundle.subtitle && (
                <p className="mt-1 text-sm text-ink-700">{bundle.subtitle}</p>
              )}
            </div>
            <a
              href={bundle.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full shrink-0 justify-center sm:w-auto sm:min-w-[200px]"
            >
              Buy bundle
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {levels.map((level) => (
          <div
            key={level.id}
            className="flex flex-col gap-3 rounded-2xl border border-ink-900/10 bg-parchment/70 p-4 sm:p-5"
          >
            <p className="font-semibold text-ink-950">{level.title}</p>
            <a
              href={level.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-auto w-full justify-center border-ink-900/20 text-sm"
            >
              Buy now
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
