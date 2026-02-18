import { useTypedDispatch, useTypedSelector } from "../../shared/hooks/redux";
import {
  closeImageModal,
  openImageModal,
} from "../../store/slices/imageModalSlice";

import { ModalDownload } from "../../user/components/modal/ModalDownload";
import {
  useFilterPage,
  type CategoryPageProps,
} from "../../user/hooks/useFilterPage";

export function WallpapersPage({ category }: CategoryPageProps) {
  const dispatch = useTypedDispatch();
  const { isOpen, selectedImage } = useTypedSelector(
    (state) => state.imageModal
  );

  const { filteredImages, isLoading } = useFilterPage({ category });

  const showLoader = isLoading;

  return (
    <div className="font-display bg-black">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden font-display bg-black">
        <div className="layout-container flex h-full grow flex-col">
          {/* HEADER */}
          {/* MAIN */}
          <main className="flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-full max-w-7xl px-4 sm:px-10">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-slate-900 text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                    Wallpapers
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                    Explore an endless collection of high-quality wallpapers for
                    your desktop.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4">
                {filteredImages.map((img) => (
                  <div
                    key={`${img.type}-${img.id}`}
                    onClick={() => {
                      dispatch(openImageModal(img));
                    }}
                    className="relative group image-card overflow-hidden rounded-lg"
                  >
                    <img
                      className="w-full h-full object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
                      data-alt="Abstract swirling colors of pink and blue paint in water."
                      src={img.url}
                    />
                  </div>
                ))}
              </div>
              {isOpen && (
                <ModalDownload
                  onClose={() => dispatch(closeImageModal())}
                  file={selectedImage!}
                />
              )}

              {showLoader && (
                <div className="flex flex-col gap-3 p-4 my-10">
                  <div className="flex gap-6 justify-between">
                    <p className="text-slate-900 text-white text-base font-medium leading-normal">
                      Loading new wallpapers...
                    </p>
                  </div>
                  <div className="rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-primary animate-pulse"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
