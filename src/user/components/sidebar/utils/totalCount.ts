import type { Category } from "../../../../shared/types/Category";

export function sumUsageCount(items: Category[]): number {
  return items.reduce((total, item) => total + item.usage_count, 0);
}

