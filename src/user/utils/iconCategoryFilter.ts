import type { MediaItem } from "../../components/admin/hooks/useAllMedia";

/** Normalize category labels for exact alias matching (no substring heuristics). */
export function normalizeCategoryKey(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const ICON_CATEGORY_KEYS = new Set([
  "icons",
  "icon",
  "instagramicons",
  "instagramicon",
]);

const STICKER_CATEGORY_KEYS = new Set(["stickers", "sticker"]);
const WALLPAPER_CATEGORY_KEYS = new Set(["wallpapers", "wallpaper"]);

export function isIconCategoryName(name: string): boolean {
  return ICON_CATEGORY_KEYS.has(normalizeCategoryKey(name));
}

function isStickerCategoryName(name: string): boolean {
  return STICKER_CATEGORY_KEYS.has(normalizeCategoryKey(name));
}

function isWallpaperCategoryName(name: string): boolean {
  return WALLPAPER_CATEGORY_KEYS.has(normalizeCategoryKey(name));
}

/**
 * Icons page: include icon packs and icon-category assets only.
 * Excludes stickers/wallpapers explicitly; does not use broad includes("icon") on titles/tags.
 */
export function isIconsOnlyAsset(item: MediaItem): boolean {
  if (item.primaryCategory === "stickers" || item.primaryCategory === "wallpapers") {
    return false;
  }

  const categories = item.categories ?? [];
  if (categories.some(isStickerCategoryName)) return false;
  if (categories.some(isWallpaperCategoryName)) return false;

  if (item.primaryCategory === "icons") return true;
  if (categories.some(isIconCategoryName)) return true;

  return false;
}
