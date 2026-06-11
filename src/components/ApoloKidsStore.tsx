import { ExternalLink, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import {
  APOLO_KIDS_BUY_ONLINE_URL,
  APOLO_KIDS_PAGE_PATH,
  formatApoloKidsPrice,
} from "../data/apoloKidsShop";

export function ApoloKidsStore() {
  return (
    <div className="rounded-3xl border border-ink-900/10 bg-white/85 p-6 shadow-soft backdrop-blur-sm sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <img
            src="/featured/apolo-kids.png?v=3"
            alt="Apolo-Kids — Apologetics for Young Defenders"
            loading="lazy"
            className="mx-auto w-full max-w-[140px] shrink-0 drop-shadow-[0_20px_30px_rgba(36,31,61,0.2)] sm:mx-0"
          />
          <div className="max-w-xl text-center sm:text-left">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-700">
              <ShoppingBag className="h-3.5 w-3.5" />
              In print
            </p>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-ink-950 sm:text-3xl">
              Apolo-Kids
            </h2>
            <p className="mt-1 text-sm font-medium text-ink-700">
              Apologetics for Young Defenders
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-700 sm:text-base">
              A gamified Christian textbook for ages 14+ — softcover and hardcover
              editions available.
            </p>
            <p className="mt-3 font-serif text-xl font-semibold text-ink-950">
              {formatApoloKidsPrice(24.99, 34.67)}
              <span className="ml-2 font-sans text-xs font-normal text-ink-600">
                softcover from
              </span>
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[220px]">
          <a
            href={APOLO_KIDS_BUY_ONLINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full justify-center"
          >
            Buy online
            <ExternalLink className="h-4 w-4" />
          </a>
          <Link
            to={APOLO_KIDS_PAGE_PATH}
            className="btn-ghost w-full justify-center border-ink-900/20 text-sm"
          >
            See more details
          </Link>
        </div>
      </div>
    </div>
  );
}
