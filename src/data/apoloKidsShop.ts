export const APOLO_KIDS_SOFT_COVER_URL = "https://books.by/kingdombuilders";

export const APOLO_KIDS_HARD_COVER_URL =
  "https://www.amazon.ca/Apolo-Kids-Apologetics-Kingdom-Builders-Publish/dp/B0H1HTVST8/ref=sr_1_1?crid=1HAYVSKU3Q3Z8&dib=eyJ2IjoiMSJ9.nsfDyFjoPeHO7zA0Bx3qj5s_yK5HMXbllFlavh0g85s6z9lBBsqJWDEpvFFowcXW.Usc6u9PS3XMFH0sp60lHuZOBnRffFz-R-PI_3ImO1xY&dib_tag=se&keywords=kingdom+builders+publishing+apolo+kids&qid=1780014170&sprefix=kingdom+builders+publishing+apolo+ki%2Caps%2C120&sr=8-1";

export type ApoloKidsEdition = {
  format: string;
  usd: number;
  cad: number;
  href: string;
  store: string;
};

export const apoloKidsEditions: ApoloKidsEdition[] = [
  {
    format: "Softcover",
    usd: 24.99,
    cad: 34.67,
    href: APOLO_KIDS_SOFT_COVER_URL,
    store: "books.by",
  },
  {
    format: "Hardcover",
    usd: 34.99,
    cad: 47.94,
    href: APOLO_KIDS_HARD_COVER_URL,
    store: "Amazon.ca",
  },
];

export function formatApoloKidsPrice(usd: number, cad: number) {
  return `$${usd.toFixed(2)} USD · $${cad.toFixed(2)} CAD`;
}
