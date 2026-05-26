import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetImagesQuery } from "../../../shared/api/imagesApi";
import type { MediaItem } from "../../../components/admin/hooks/useAllMedia";
import { AssetCardLink } from "../asset/AssetCardLink";

interface HomeFeaturedWallpapersProps {
  onItemNavigate?: (item: MediaItem) => void;
}

export function HomeFeaturedWallpapers({
  onItemNavigate,
}: HomeFeaturedWallpapersProps) {
  const { data: images = [], isLoading } = useGetImagesQuery();

  const featuredWallpapers = useMemo((): MediaItem[] => {
    return images
      .filter(
        (img) => img.featured === 1 && img.primaryCategory === "wallpapers"
      )
      .map((img) => ({
        id: img.id,
        type: "image" as const,
        title: img.title || "Untitled Image",
        url: img.url,
        slug: img.slug ?? null,
        primaryCategory: img.primaryCategory ?? null,
        categories: img.categories || [],
        tags: img.tags || [],
        created_at: img.created_at,
        original: img,
        featured: img.featured,
      }));
  }, [images]);

  if (isLoading || featuredWallpapers.length === 0) {
    return null;
  }

  return (
    <section className="px-4 sm:px-6 pt-4 pb-2">
      <div className="flex items-end justify-between gap-4 pb-3">
        <h2 className="text-gray-50 text-2xl font-bold leading-tight tracking-tight">
          Featured Wallpapers
        </h2>
        <Link
          to="/wallpapers"
          className="text-primary text-sm font-medium hover:underline shrink-0"
        >
          View all
        </Link>
      </div>
      <div
        className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1"
        style={{ scrollbarWidth: "none" }}
      >
        {featuredWallpapers.map((item) => (
          <AssetCardLink
            key={`featured-wallpaper-${item.id}`}
            item={item}
            className="block shrink-0 w-[160px] sm:w-[180px] rounded-lg overflow-hidden"
            onNavigate={() => onItemNavigate?.(item)}
          >
            <img
              src={item.url}
              alt={item.title}
              loading="lazy"
              className="w-full aspect-[3/4] object-cover"
            />
          </AssetCardLink>
        ))}
      </div>
    </section>
  );
}
