import type { MediaItem } from "../../components/admin/hooks/useAllMedia";
import type { PrimaryCategory } from "../../shared/types/listing";

export function getListingPath(
  item: Pick<MediaItem, "slug" | "primaryCategory">
): string | null {
  if (!item.slug || !item.primaryCategory) return null;
  return `/${item.primaryCategory}/${item.slug}`;
}

export function getCategoryIndexPath(category: PrimaryCategory): string {
  return `/${category}`;
}
