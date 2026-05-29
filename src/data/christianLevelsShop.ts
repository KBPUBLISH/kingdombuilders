export type ChristianLevelProduct = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  featured?: boolean;
};

export const christianLevelProducts: ChristianLevelProduct[] = [
  {
    id: "level-1",
    title: "Christian Level 1",
    href: "https://buy.stripe.com/28E14h5FE85pgxf3OG4F205",
  },
  {
    id: "level-2",
    title: "Christian Level 2",
    href: "https://buy.stripe.com/28E7sF3xwfxRa8R70S4F204",
  },
  {
    id: "level-3",
    title: "Christian Level 3",
    href: "https://buy.stripe.com/7sY7sFd86dpJ3Ktdpg4F203",
  },
  {
    id: "bundle",
    title: "Levels 1–3 Bundle",
    subtitle: "All three levels together",
    href: "https://buy.stripe.com/9B6eV7c42etNdl3ad44F202",
    featured: true,
  },
];
