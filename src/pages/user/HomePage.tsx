import { Slider } from "../../user/components/homePage/Slider";
import { useTypedDispatch, useTypedSelector } from "../../shared/hooks/redux";
import { hideHero } from "../../store/slices/heroSlice";
import { TagFilterList } from "../../user/components/TagFilterList";
import { useFilteredMedia } from "../../user/hooks/useFilteredMedia";
import { addViewedImage } from "../../store/slices/viewedImagesSlice";
import { ViewedImagesSlider } from "../../user/components/homePage/ViewedImagesSlider";
import { useFeaturedMedia } from "../../user/hooks/useFeaturedMedia";
import { HomeBrowseByUseCase } from "../../user/components/homePage/HomeBrowseByUseCase";
import { HomeBrowseByStyle } from "../../user/components/homePage/HomeBrowseByStyle";
import { HomeFeaturedWallpapers } from "../../user/components/homePage/HomeFeaturedWallpapers";
import { AssetCardLink } from "../../user/components/asset/AssetCardLink";
import type { MediaItem } from "../../components/admin/hooks/useAllMedia";
import { stickerPreviewTileClass } from "../../user/utils/stickerPreviewBg";

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

function HomeMasonryCard({
  item,
  onNavigate,
}: {
  item: MediaItem;
  onNavigate: () => void;
}) {
  const variant = getHomeCardVariant(item);
  const alt = item.title || "Media asset";
  const baseLinkClass = "block mb-3 break-inside-avoid rounded-lg overflow-hidden";

  if (variant === "sticker") {
    return (
      <AssetCardLink
        item={item}
        className={`${baseLinkClass} group ring-1 ring-white/10`}
        onNavigate={onNavigate}
      >
        <div
          className={`relative flex w-full aspect-[4/5] max-h-[200px] sm:max-h-[220px] items-center justify-center overflow-hidden rounded-lg ${stickerPreviewTileClass}`}
        >
          <img
            className="max-h-full max-w-full object-contain scale-[1.12] transition-transform duration-300 group-hover:scale-[1.16]"
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
        <div className="flex items-center justify-center p-3 max-h-[220px] md:max-h-[300px] bg-neutral-800/60">
          <img
            className="max-h-[180px] md:max-h-[260px] max-w-full w-auto object-contain"
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
  const { isVisible } = useTypedSelector((state) => state.hero);

  const filteredImages = useFilteredMedia();
  const { featuredMedia } = useFeaturedMedia();

  return (
    <div className="font-display bg-black">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex overflow-hidden">
            <main className="flex flex-1 justify-center py-5 min-w-0">
              <div className="layout-content-container flex flex-col w-full">
                <div className="w-full max-w-7xl mx-auto">
                  {isVisible && (
                    <div className="px-4 py-10 md:py-3 flex flex-col gap-1 items-center text-center hidden sm:block">
                      <div className="flex flex-col gap-4 text-center">
                        <h1 className="text-gray-50 text-4xl font-black leading-tight tracking-tighter md:text-6xl">
                          Elevate Your Digital Space
                        </h1>
                        <h2 className="text-gray-400 text-base font-normal leading-normal max-w-3xl mx-auto md:text-lg">
                          Discover high-quality wallpapers, icons, and stickers
                          curated for modern creators.
                        </h2>
                      </div>

                      <div
                        className="relative w-full max-w-5xl mx-auto overflow-hidden"
                        style={{ perspective: "2000px" }}
                      >
                        <Slider images={featuredMedia} />
                      </div>
                    </div>
                  )}
                  <h2 className="text-gray-50 text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">
                    Previous Images
                  </h2>
                  <ViewedImagesSlider />
                </div>

                <div className="w-full max-w-screen-2xl mx-auto min-w-0">
                  <HomeBrowseByUseCase />
                  <HomeFeaturedWallpapers
                    onItemNavigate={(item) => {
                      dispatch(hideHero());
                      dispatch(addViewedImage(item));
                    }}
                  />
                  <HomeBrowseByStyle />
                </div>

                <section className="w-full max-w-none min-w-0">
                  <h2 className="text-gray-50 text-2xl font-bold leading-tight tracking-tight px-2 sm:px-3 pb-3 pt-5">
                    All Media
                  </h2>
                  <div
                    className="px-2 sm:px-3"
                    style={{ scrollbarWidth: "none" }}
                  >
                    <TagFilterList listClassName="flex flex-nowrap gap-2 lg:flex-wrap overflow-x-auto" />
                  </div>

                  {filteredImages.length === 0 ? (
                    <p className="text-gray-400 px-2 sm:px-3 pb-6">
                      Images not found
                    </p>
                  ) : (
                    <div className="w-full columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7 gap-2 sm:gap-3 px-2 sm:px-3 pb-6">
                      {filteredImages.map((img) => (
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
