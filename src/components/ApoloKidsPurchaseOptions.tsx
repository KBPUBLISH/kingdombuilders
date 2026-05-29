import { ExternalLink } from "lucide-react";
import {
  apoloKidsEditions,
  formatApoloKidsPrice,
} from "../data/apoloKidsShop";

type Props = {
  compact?: boolean;
};

export function ApoloKidsPurchaseOptions({ compact = false }: Props) {
  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      {apoloKidsEditions.map((edition) => (
        <div
          key={edition.format}
          className="flex flex-col gap-3 rounded-2xl border border-ink-900/10 bg-parchment/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">
              {edition.format}
            </p>
            <p
              className={`mt-1 font-serif font-semibold text-ink-950 ${
                compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
              }`}
            >
              {formatApoloKidsPrice(edition.usd, edition.cad)}
            </p>
            <p className="mt-1 text-xs text-ink-600">via {edition.store}</p>
          </div>
          <a
            href={edition.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full shrink-0 justify-center sm:w-auto sm:min-w-[180px]"
          >
            Buy {edition.format.toLowerCase()}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      ))}
    </div>
  );
}
