import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../../shared/hooks/redux";
import { hideHero, showHero } from "../../store/slices/heroSlice";
import { TagFilterList } from "../../user/components/TagFilterList";
import { useFilteredMedia } from "../../user/hooks/useFilteredMedia";
import { addViewedImage } from "../../store/slices/viewedImagesSlice";
import { HomeFeaturedWallpapers } from "../../user/components/homePage/HomeFeaturedWallpapers";
import { AssetCardLink } from "../../user/components/asset/AssetCardLink";
import type { MediaItem } from "../../components/admin/hooks/useAllMedia";
import { stickerPreviewTileClass } from "../../user/utils/stickerPreviewBg";
import { HomeBrowseByAssetType } from "../../user/components/homePage/HomeBrowseByAssetType";
import {
  resetFilters,
  setSearch,
  toggleTag,
} from "../../store/slices/imagesFilterSlice";

type HomeCardVariant = "sticker" | "wallpaper" | "icon-pack";

function getHomeCardVariant(item: MediaItem): HomeCardVariant {
  if (item.type === "archive") return "icon-pack";

  if (
    item.primaryCategory === "stickers" ||
    item.categories.some((c) => c.toLowerCase() === "stickers")
  ) {
    return "sticker";
  }

  if (
    item.primaryCategory === "icons" ||
    item.categories.some((c) => /icon/i.test(c))
  ) {
    return "icon-pack";
  }

  return "wallpaper";
}

const MASONRY_BUCKET_ORDER: HomeCardVariant[] = [
  "wallpaper",
  "sticker",
  "icon-pack",
];

/** Stable round-robin mix — wallpapers, stickers, and icon packs are not grouped in blocks. */
function interleaveAllMedia(items: MediaItem[]): MediaItem[] {
  if (items.length <= 1) return items;

  const buckets: Record<HomeCardVariant, MediaItem[]> = {
    wallpaper: [],
    sticker: [],
    "icon-pack": [],
  };

  for (const item of items) {
    buckets[getHomeCardVariant(item)].push(item);
  }

  const activeBuckets = MASONRY_BUCKET_ORDER.filter(
    (variant) => buckets[variant].length > 0
  );
  const maxLen = Math.max(...activeBuckets.map((v) => buckets[v].length));
  const mixed: MediaItem[] = [];

  for (let i = 0; i < maxLen; i++) {
    for (const variant of activeBuckets) {
      const item = buckets[variant][i];
      if (item) mixed.push(item);
    }
  }

  return mixed;
}

function getStickerTileMinHeightClass(id: number): string {
  const tier = id % 3;
  if (tier === 0) return "min-h-[140px] sm:min-h-[180px]";
  if (tier === 1) return "min-h-[180px] sm:min-h-[220px]";
  return "min-h-[220px] sm:min-h-[260px]";
}

function HomeMasonryCard({
  item,
  onNavigate,
}: {
  item: MediaItem;
  onNavigate: () => void;
}) {
  const variant = getHomeCardVariant(item);
  const alt = item.title || "Media asset";
  const baseLinkClass =
    "block mb-2 sm:mb-3 break-inside-avoid rounded-lg overflow-hidden";

  if (variant === "sticker") {
    return (
      <AssetCardLink
        item={item}
        className={`${baseLinkClass} group ring-1 ring-white/10`}
        onNavigate={onNavigate}
      >
        <div
          className={`flex w-full items-center justify-center px-3 py-4 sm:px-4 sm:py-5 ${getStickerTileMinHeightClass(item.id)} ${stickerPreviewTileClass}`}
        >
          <img
            className="block w-full h-auto max-w-full object-contain scale-[1.1] transition-transform duration-300 group-hover:scale-[1.14]"
            src={item.url}
            alt={alt}
            loading="lazy"
          />
        </div>
      </AssetCardLink>
    );
  }

  if (variant === "icon-pack") {
    return (
      <AssetCardLink
        item={item}
        className={`${baseLinkClass} bg-neutral-900/90 ring-1 ring-white/10`}
        onNavigate={onNavigate}
      >
        <div className="flex items-center justify-center p-3 sm:p-4 bg-neutral-800/60">
          <img
            className="block w-full h-auto"
            src={item.url}
            alt={alt}
            loading="lazy"
          />
        </div>
      </AssetCardLink>
    );
  }

  return (
    <AssetCardLink item={item} className={baseLinkClass} onNavigate={onNavigate}>
      <img
        className="block w-full h-auto"
        src={item.url}
        alt={alt}
        loading="lazy"
      />
    </AssetCardLink>
  );
}

export default function HomePage() {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { isVisible } = useTypedSelector((state) => state.hero);

  const filteredImages = useFilteredMedia();
  const masonryMedia = useMemo(
    () => interleaveAllMedia(filteredImages),
    [filteredImages]
  );
  const applyStyleChip = (mode: "tag" | "search", value: string) => {
    dispatch(resetFilters());
    if (mode === "tag") {
      dispatch(toggleTag(value));
    } else {
      dispatch(setSearch(value));
    }
    navigate("/wallpapers");
  };

  useEffect(() => {
    dispatch(showHero());
  }, [dispatch]);

  return (
    <div className="font-display bg-black">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex overflow-hidden">
            <main className="flex flex-1 justify-center py-5 min-w-0">
              <div className="layout-content-container flex flex-col w-full">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 min-w-0">
                  {isVisible && (
                    <section className="pt-3 pb-5 border-b border-white/10">
                      <h1 className="text-gray-50 text-3xl sm:text-4xl font-black leading-tight tracking-tight">
                        Free digital assets for creative projects
                      </h1>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-3xl mt-2">
                        Wallpapers, stickers, and print-friendly PNG resources
                        for personal use, social content and creative layouts.
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <Link
                          to="/wallpapers"
                          className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-gray-200 hover:border-primary/50 hover:text-primary transition-colors"
                        >
                          Wallpapers
                        </Link>
                        <Link
                          to="/stickers"
                          className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-gray-200 hover:border-primary/50 hover:text-primary transition-colors"
                        >
                          Stickers
                        </Link>
                        <Link
                          to="/stickers"
                          className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-gray-200 hover:border-primary/50 hover:text-primary transition-colors"
                        >
                          Print-friendly
                        </Link>
                        <button
                          type="button"
                          onClick={() => applyStyleChip("tag", "minimal")}
                          className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-gray-200 hover:border-primary/50 hover:text-primary transition-colors"
                        >
                          Minimal
                        </button>
                        <button
                          type="button"
                          onClick={() => applyStyleChip("search", "cute")}
                          className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-gray-200 hover:border-primary/50 hover:text-primary transition-colors"
                        >
                          Cute
                        </button>
                        <button
                          type="button"
                          onClick={() => applyStyleChip("tag", "dark")}
                          className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-gray-200 hover:border-primary/50 hover:text-primary transition-colors"
                        >
                          Dark
                        </button>
                        <button
                          type="button"
                          onClick={() => applyStyleChip("tag", "vintage")}
                          className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-gray-200 hover:border-primary/50 hover:text-primary transition-colors"
                        >
                          Vintage
                        </button>
                        <a
                          href="#all-media"
                          className="ml-1 inline-flex items-center justify-center rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-black hover:opacity-90 transition-opacity"
                        >
                          Explore free assets
                        </a>
                      </div>
                    </section>
                  )}

                  <HomeFeaturedWallpapers
                    onItemNavigate={(item) => {
                      dispatch(hideHero());
                      dispatch(addViewedImage(item));
                    }}
                  />
                  <HomeBrowseByAssetType />
                </div>

                <section id="all-media" className="w-full min-w-0 max-w-none pt-2">
                  <div className="w-full max-w-none px-2 sm:px-3 lg:px-4">
                    <h2 className="text-gray-50 text-2xl font-bold leading-tight tracking-tight pb-3 pt-3">
                      All Media
                    </h2>
                    <div className="w-full max-w-none" style={{ scrollbarWidth: "none" }}>
                      <TagFilterList listClassName="flex flex-wrap gap-2 overflow-x-visible w-full max-w-none" />
                    </div>
                  </div>

                  {filteredImages.length === 0 ? (
                    <p className="text-gray-400 w-full px-2 sm:px-3 lg:px-4 pb-6">
                      Images not found
                    </p>
                  ) : (
                    <div className="w-full columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-2 sm:gap-3 px-2 sm:px-3 lg:px-4 pb-6">
                      {masonryMedia.map((img) => (
                        <HomeMasonryCard
                          key={`${img.type}-${img.id}`}
                          item={img}
                          onNavigate={() => {
                            dispatch(hideHero());
                            dispatch(addViewedImage(img));
                          }}
                        />
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
