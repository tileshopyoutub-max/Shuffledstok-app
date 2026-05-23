const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "blog",
  "download",
  "wallpapers",
  "icons",
  "stickers",
  "about",
  "contact",
  "privacy",
  "new",
  "edit",
  "settings",
]);

const CYRILLIC_MAP: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

function transliterateChar(char: string): string {
  const lower = char.toLowerCase();
  if (CYRILLIC_MAP[lower] !== undefined) return CYRILLIC_MAP[lower];
  return lower;
}

export function slugifyTitle(title: string): string {
  const normalized = title
    .trim()
    .split("")
    .map((char) => transliterateChar(char))
    .join("");

  const slug = normalized
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 80);

  return slug;
}

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.has(slug);
}

export function allocateUniqueSlug(
  baseSlug: string,
  taken: Set<string>
): { slug: string; suffix: number | null } {
  let candidate = baseSlug;
  let suffix: number | null = null;
  let counter = 2;

  while (taken.has(candidate) || isReservedSlug(candidate) || candidate.length === 0) {
    suffix = counter;
    candidate = `${baseSlug}-${counter}`;
    counter += 1;
  }

  taken.add(candidate);
  return { slug: candidate, suffix };
}

export function buildBaseSlug(
  title: string | null | undefined,
  fallbackBase: string
): string {
  const fromTitle = slugifyTitle(title ?? "");
  if (fromTitle.length >= 3 && !isReservedSlug(fromTitle)) {
    return fromTitle;
  }
  return fallbackBase;
}
