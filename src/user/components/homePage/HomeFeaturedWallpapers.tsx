import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGetImagesQuery } from "../../../shared/api/imagesApi";
import type { MediaItem } from "../../../components/admin/hooks/useAllMedia";
import { AssetCardLink } from "../asset/AssetCardLink";
import { stickerPreviewTileClass } from "../../utils/stickerPreviewBg";

interface HomeFeaturedWallpapersProps {
  onItemNavigate?: (item: MediaItem) => void;
}

function useFeaturedVisibleLimit() {
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setLimit(Number.MAX_SAFE_INTEGER);
        return;
      }
      if (width < 1024) {
        setLimit(4);
        return;
      }
      if (width < 1280) {
        setLimit(5);
        return;
      }
      setLimit(6);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return limit;
}

function FeaturedCard({
  item,
  isDesktopRow,
  onNavigate,
}: {
  item: MediaItem;
  isDesktopRow: boolean;
  onNavigate?: () => void;
}) {
  return (
    <AssetCardLink
      item={item}
      className={`block rounded-xl overflow-hidden ring-1 ring-white/10 ${
        isDesktopRow
          ? "w-full min-w-0"
          : "shrink-0 w-[168px] sm:w-[192px]"
      }`}
      onNavigate={onNavigate}
    >
      {item.primaryCategory === "stickers" ? (
        <div
          className={`w-full aspect-[3/4] p-3 ${stickerPreviewTileClass} flex items-center justify-center`}
        >
          <img
            src={item.url}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <img
          src={item.url}
          alt={item.title}
          loading="lazy"
          className="w-full aspect-[3/4] object-cover"
        />
      )}
    </AssetCardLink>
  );
}

export function HomeFeaturedWallpapers({
  onItemNavigate,
}: HomeFeaturedWallpapersProps) {
  const { data: images = [], isLoading } = useGetImagesQuery();
  const visibleLimit = useFeaturedVisibleLimit();

  const featuredDownloads = useMemo((): MediaItem[] => {
    return images
      .filter((img) => img.featured === 1)
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

  const isDesktopRow = visibleLimit < Number.MAX_SAFE_INTEGER;
  const visibleItems = useMemo(
    () => featuredDownloads.slice(0, Math.min(featuredDownloads.length, visibleLimit)),
    [featuredDownloads, visibleLimit]
  );

  if (isLoading || featuredDownloads.length === 0) {
    return null;
  }

  return (
    <section className="pt-5 pb-3">
      <div className="flex items-end justify-between gap-4 pb-3">
        <h2 className="text-gray-50 text-2xl font-bold leading-tight tracking-tight">
          Featured free downloads
        </h2>
        <Link
          to="/"
          className="text-primary text-sm font-medium hover:underline shrink-0"
        >
          View all assets
        </Link>
      </div>
      <div
        className={
          isDesktopRow
            ? "grid gap-3"
            : "flex gap-3 overflow-x-auto pb-2 -mx-1 px-1"
        }
        style={
          isDesktopRow
            ? {
                gridTemplateColumns: `repeat(${visibleItems.length}, minmax(0, 1fr))`,
              }
            : { scrollbarWidth: "none" }
        }
      >
        {visibleItems.map((item) => (
          <FeaturedCard
            key={`featured-asset-${item.id}`}
            item={item}
            isDesktopRow={isDesktopRow}
            onNavigate={() => onItemNavigate?.(item)}
          />
        ))}
      </div>
    </section>
  );
}
