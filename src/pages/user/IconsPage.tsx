import { Link } from "react-router-dom";
import { useAllMedia } from "../../components/admin/hooks/useAllMedia";
import type { CategoryPageProps } from "../../user/hooks/useFilterPage";
import { useTypedDispatch, useTypedSelector } from "../../shared/hooks/redux";
import {
  closeImageModal,
  openImageModal,
} from "../../store/slices/imageModalSlice";
import { ModalDownload } from "../../user/components/modal/ModalDownload";

export function IconsPage({ category }: CategoryPageProps) {
  const dispatch = useTypedDispatch();
  const { isOpen, selectedImage } = useTypedSelector(
    (state) => state.imageModal
  );
  const { allMedia, isLoading } = useAllMedia();
  const filteredImages = allMedia.filter((img) => {
    const source = `${img.title} ${img.tags.join(" ")} ${img.categories.join(" ")}`.toLowerCase();
    return source.includes(category) || source.includes("icon") || source.includes("instagram");
  });

  return (
    <div className="font-display bg-black">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <main className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-7xl px-4 sm:px-10">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Icons
                </h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-4xl">
                  Explore free Instagram highlight icons designed for creators, bloggers, and
                  small brands that want a cleaner profile aesthetic. These icon packs are made
                  for Story Highlight covers, helping your profile look organized and easy to
                  navigate at first glance. You can mix minimal, neutral, and playful icon styles
                  to match your niche and improve profile consistency without heavy design work.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 p-4">
              {filteredImages.map((img) => (
                <div
                  key={`${img.type}-${img.id}`}
                  onClick={() => {
                    dispatch(openImageModal(img));
                  }}
                  className="relative group image-card overflow-hidden rounded-lg border border-white/10"
                >
                  <img
                    className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                    alt={img.title}
                    src={img.url}
                  />
                </div>
              ))}
            </div>
            {filteredImages.length === 0 && !isLoading && (
              <p className="px-4 text-slate-400">
                No icon assets found yet. Try again after adding assets tagged or categorized for icons.
              </p>
            )}
            {isOpen && (
              <ModalDownload
                onClose={() => dispatch(closeImageModal())}
                file={selectedImage!}
              />
            )}

            <section className="px-4 py-8 mb-8 rounded-xl border border-white/10 bg-white/[0.02]">
              <h2 className="text-2xl font-bold text-white mb-3">How to choose and use icon packs</h2>
              <p className="text-slate-300 leading-relaxed">
                Start with icons that match your profile tone: neutral sets for clean aesthetics,
                bold icons for high contrast, or soft palettes for lifestyle branding. Keep one
                visual style across all highlights so your profile feels intentional. After
                download, open Instagram, edit a Story Highlight, then set the icon as your cover.
              </p>
            </section>
            <section className="px-4 pb-8">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h2 className="text-2xl font-bold text-white mb-3">Related guides</h2>
                <Link className="text-primary hover:underline" to="/blog/how-to-use-instagram-highlight-icons">
                  How to Use Instagram Highlight Icons
                </Link>
              </div>
            </section>

            {isLoading && (
              <div className="flex flex-col gap-3 p-4 my-10">
                <p className="text-white text-base font-medium">Loading icons...</p>
                <div className="rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-2 rounded-full bg-primary animate-pulse" style={{ width: "100%" }} />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
