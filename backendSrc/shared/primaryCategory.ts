export type PrimaryCategory = "wallpapers" | "icons" | "stickers";

export type EntityType = "image" | "archive";

const VALID_CATEGORIES: PrimaryCategory[] = [
  "wallpapers",
  "icons",
  "stickers",
];

export function isPrimaryCategory(value: string): value is PrimaryCategory {
  return VALID_CATEGORIES.includes(value as PrimaryCategory);
}

export function resolvePrimaryCategory(
  categoryNames: string[]
): PrimaryCategory {
  const normalized = categoryNames.map((name) => name.trim().toLowerCase());

  if (normalized.includes("stickers")) return "stickers";
  if (
    normalized.includes("icons") ||
    normalized.includes("instagramicons")
  ) {
    return "icons";
  }
  if (normalized.includes("wallpapers")) return "wallpapers";

  return "wallpapers";
}

export function untitledFallbackSlugBase(
  primaryCategory: PrimaryCategory,
  entityType: EntityType
): string {
  if (entityType === "archive") return "untitled-pack";

  if (primaryCategory === "stickers") return "untitled-sticker";
  if (primaryCategory === "icons") return "untitled-icon";
  return "untitled-wallpaper";
}
