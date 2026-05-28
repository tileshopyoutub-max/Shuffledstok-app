import {
  useFilterPage,
  type CategoryPageProps,
} from "../../user/hooks/useFilterPage";
import { Link } from "react-router-dom";
import { AssetCardLink } from "../../user/components/asset/AssetCardLink";
import { stickerPreviewTileClass } from "../../user/utils/stickerPreviewBg";

export const StickersPage = ({ category }: CategoryPageProps) => {
  const { filteredImages, isLoading } = useFilterPage({ category });

  const showLoader = isLoading;

  return (
    <div className="font-display bg-black">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-full max-w-screen-xl flex-1">
              {/* <!-- PageHeading --> */}
              <div className="flex flex-wrap justify-between gap-3 p-4 md:p-10">
                <div className="min-w-72 max-w-4xl">
                  <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                    Stickers
                  </h1>
                  <p className="text-slate-300 text-base leading-relaxed mt-4">
                    Browse digital stickers made for planners, social media stories, moodboards,
                    and personal creative projects. This collection includes minimalist, aesthetic,
                    and expressive sticker styles that can be layered into templates, collages, and
                    visual journals. If you want fast creative assets that still look intentional,
                    these sticker downloads help you build consistent layouts without starting from
                    scratch.
                  </p>
                </div>
              </div>

              <section className="mx-4 md:mx-10 mb-4 rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h2 className="text-lg font-bold text-white mb-2">
                  Who this collection is for
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Planners, journal makers, social content creators, and small
                  brands who need ready-made PNG stickers for layouts, stories,
                  and collages. Many files are print-friendly PNGs suitable for
                  personal layouts and journaling.
                </p>
              </section>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 md:p-10">
                {filteredImages.map((img) => (
                  <AssetCardLink
                    key={`${img.type}-${img.id}`}
                    item={img}
                    className="block rounded-lg overflow-hidden ring-1 ring-white/10 group"
                  >
                    <div
                      className={`relative flex w-full aspect-[4/5] max-h-[220px] items-center justify-center overflow-hidden ${stickerPreviewTileClass}`}
                    >
                      <img
                        src={img.url}
                        alt={img.title || "Sticker"}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain scale-[1.12] transition-transform duration-300 group-hover:scale-[1.16]"
                      />
                    </div>
                  </AssetCardLink>
                ))}
              </div>
              <section className="px-4 md:px-10 pb-8">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    How to choose and use digital stickers
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    Pick sticker sets by purpose first: subtle elements for clean planning pages,
                    bold pieces for social media stories, or textured styles for moodboards. Keep
                    your palette consistent so pages and slides feel cohesive. You can drag these
                    files into design apps, journaling tools, and template editors, then scale and
                    layer them with text or photos.
                  </p>
                </div>
              </section>
              <section className="px-4 md:px-10 pb-8">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <h2 className="text-2xl font-bold text-white mb-3">Related guides</h2>
                  <Link className="text-primary hover:underline" to="/blog/create-aesthetic-iphone-home-screen">
                    How to Create an Aesthetic iPhone Home Screen
                  </Link>
                </div>
              </section>
              {/* <!-- ProgressBar / Loading Indicator --> */}
              {showLoader && (
                <div className="flex flex-col gap-3 p-4 md:p-10">
                  <div className="flex gap-6 justify-between">
                    <p className="text-white text-base font-medium leading-normal">
                      Loading more stickers...
                    </p>
                  </div>
                  <div className="rounded-full bg-[#3c4753]">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
