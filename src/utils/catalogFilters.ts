/** Books promoted on their own page/section — hide from generic catalog grids. */
export function isHiddenCatalogBook(entry: { title?: string | null }) {
  const t = (entry.title ?? "").toLowerCase().replace(/\s+/g, " ").trim();
  return t.includes("apolo-kids") || t.includes("apolo kids");
}

export function filterCatalogBooks<T extends { title?: string | null }>(
  books: T[],
): T[] {
  return books.filter((b) => !isHiddenCatalogBook(b));
}
