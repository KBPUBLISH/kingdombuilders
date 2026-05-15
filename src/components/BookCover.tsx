type BookCoverProps = {
  title: string;
  author?: string;
  palette?: number;
  badge?: string;
};

const palettes = [
  { bg: "#241f3d", accent: "#daab3f", ink: "#fbf7ef" },
  { bg: "#43396f", accent: "#ecda9b", ink: "#fbf7ef" },
  { bg: "#16122a", accent: "#e2c065", ink: "#fbf7ef" },
  { bg: "#74411f", accent: "#fbf7ef", ink: "#fbf7ef" },
  { bg: "#39325c", accent: "#daab3f", ink: "#fbf7ef" },
  { bg: "#8b521d", accent: "#f5edcf", ink: "#fbf7ef" },
];

export function BookCover({ title, author, palette = 0, badge }: BookCoverProps) {
  const p = palettes[palette % palettes.length];

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl shadow-soft ring-1 ring-ink-900/10">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${p.bg} 0%, ${shade(p.bg, -10)} 100%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-3 w-[3px] rounded-full"
        style={{ background: `linear-gradient(${p.accent}, transparent)` }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-2 bg-black/30"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-2">
          <svg
            viewBox="0 0 32 32"
            className="h-6 w-6"
            fill="none"
            stroke={p.accent}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 26V11l10-6 10 6v15" />
            <path d="M11 26V16h10v10" />
            <path d="M16 5v3" />
            <path d="M14 6.5h4" />
          </svg>
          {badge && (
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest"
              style={{ background: p.accent, color: p.bg }}
            >
              {badge}
            </span>
          )}
        </div>

        <div>
          <p
            className="font-serif text-[1.25rem] leading-tight"
            style={{ color: p.ink }}
          >
            {title}
          </p>
          {author && (
            <p
              className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: p.accent }}
            >
              {author}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function shade(hex: string, percent: number) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}
