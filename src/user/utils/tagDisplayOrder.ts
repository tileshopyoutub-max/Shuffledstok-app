import type { Tag } from "../../shared/types/tags";

export const CURATED_TAG_NAMES = [
  "aesthetic",
  "minimal",
  "cute",
  "pink",
  "dark",
  "vintage",
  "y2k",
  "luxury",
  "cinematic",
  "anime",
  "flowers",
  "nature",
  "wallpaper",
  "stickers",
  "icons",
  "black",
  "white",
  "blue",
  "summer",
  "romantic",
] as const;

export function orderTagsForDisplay(tags: Tag[]): Tag[] {
  const byNameLower = new Map(tags.map((tag) => [tag.name.toLowerCase(), tag]));

  const curated: Tag[] = [];
  for (const name of CURATED_TAG_NAMES) {
    const tag = byNameLower.get(name);
    if (tag) curated.push(tag);
  }

  const curatedIds = new Set(curated.map((tag) => tag.id));
  const rest = tags
    .filter((tag) => !curatedIds.has(tag.id))
    .sort((a, b) => {
      if (b.usage_count !== a.usage_count) {
        return b.usage_count - a.usage_count;
      }
      return a.name.localeCompare(b.name);
    });

  return [...curated, ...rest];
}
