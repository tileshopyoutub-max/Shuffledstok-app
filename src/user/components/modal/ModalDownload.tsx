import { useRef } from "react";
import { findSimilarImages } from "../../utils/FilterSimilarContent";
import {
  closeImageModal,
  openImageModal,
} from "../../../store/slices/imageModalSlice";
import { useTypedDispatch } from "../../../shared/hooks/redux";
import { toggleTag } from "../../../store/slices/imagesFilterSlice";
import { useImageModal } from "./hooks/useImageModal";
import {
  useAllMedia,
  type MediaItem,
} from "../../../components/admin/hooks/useAllMedia";
import { ArchiveSlider } from "./ArchiveSlider";
import { useExpandableText } from "../../hooks/useExpandableText";
import { FiArrowDown } from "react-icons/fi";

interface ModalTypes {
  onClose: () => void;
  file: MediaItem;
}

export const ModalDownload = ({ onClose, file }: ModalTypes) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useTypedDispatch();
  const { allMedia } = useAllMedia();

  const isArchive = file.type === "archive";
  const image = isArchive
    ? file.original.images[0] // обложка архива
    : file.original;

  const { key, url, title, description, tags, downloadFree } = isArchive
    ? {
        key: file.original.id.toString(),
        url: image.url,
        title: file.original.title,
        description: file.original.description,
        tags: file.original.tags,
        downloadFree: file.original.downloadFree,
      }
    : file.original;

  const { isPurchased, handleBuy, handleDownload } = useImageModal({
    modalRef,
    onClose,
    fileKey: key,
  });

  const { textRef, maxHeight, expanded, isOverflowing, toggle } =
    useExpandableText();

  const similarImages = findSimilarImages(allMedia, file);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      {/* Модальное окно */}
      <div
        ref={modalRef}
        className="bg-background-dark text-gray-100 w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden overflow-y-auto relative max-h-[90vh]"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Кнопка закрытия */}
        <div className="sticky top-4 z-10 flex justify-end px-4">
          <button
            onClick={onClose}
            className="text-blue-500 hover:text-blue-400 transition hidden lg:inline-flex"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>
        <div className="sticky top-0 flex justify-end flex-shrink-0 lg:hidden max-h-[30px]">
          <button
            onClick={onClose}
            className="text-blue-500 hover:text-blue-400 transition p-1"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
        {/* Контент модалки со скроллом */}
        <div className="pt-0 lg:pt-0 p-7  max-h-[90vh] scrollbar-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Левая часть */}
            <div className="lg:col-span-2 flex flex-col items-center gap-4">
              {isArchive ? (
                <ArchiveSlider images={file.original.images} />
              ) : (
                <div className="relative w-full max-w-2xl group">
                  <div className="aspect-[3/4] w-full max-h-[65vh] overflow-hidden rounded-xl">
                    <img
                      alt="Preview"
                      className="h-full w-full object-cover"
                      src={url}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Правая часть */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
                </div>
                <p
                  ref={textRef}
                  className="text-gray-400 overflow-hidden transition-[max-height] duration-1000 ease-in-out"
                  style={{ maxHeight }}
                >
                  {description}
                </p>
                {isOverflowing && (
                  <div
                    className={`flex gap-2 items-center shadow-[0_-14px_20px_0_rgba(17,25,33,0.9)] ${
                      expanded ? "mt-1" : ""
                    }`}
                  >
                    <button
                      onClick={toggle}
                      className="self-start text-blue-500 hover:text-blue-400 text-sm"
                    >
                      {expanded ? "Hide" : "Read more"}
                    </button>
                    <span
                      className={`
                        inline-flex
                        text-blue-500
                        transition-transform duration-1000 ease-in-out
                        origin-center
                        ${expanded ? "rotate-180" : "rotate-0"}
                      `}
                    >
                      <FiArrowDown />
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                {downloadFree && (
                  <button
                    onClick={handleDownload}
                    className="w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold"
                  >
                    Download for free
                  </button>
                )}

                {!downloadFree && (
                  <>
                    <button
                      onClick={handleBuy}
                      className="w-full h-12 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-bold"
                    >
                      Buy for $2.99
                    </button>

                    <button
                      onClick={handleDownload}
                      disabled={!isPurchased}
                      className={`w-full h-12 rounded-lg font-bold transition-colors
                        ${
                          isPurchased
                            ? "bg-primary hover:bg-primary/90 text-white"
                            : "bg-gray-700 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                      Download file
                    </button>
                  </>
                )}
              </div>
              <div className="border-t border-gray-800 pt-6 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-gray-200">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          dispatch(toggleTag(tag)), dispatch(closeImageModal());
                        }}
                        className="flex flex-wrap gap-2"
                      >
                        <a
                          className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
                          href="#"
                        >
                          {tag}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 md:mt-6">
            <h2 className="sticky text-gray-50 text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">
              Similar content
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-4">
              {similarImages.map((img) => {
                const mediaItem: MediaItem = {
                  id: img.id,
                  type: "image",
                  title: img.title || "Untitled Image",
                  url: img.url,
                  categories: img.categories || [],
                  tags: img.tags || [],
                  created_at: img.created_at,
                  original: img,
                };
                return (
                  <div
                    key={img.key}
                    onClick={() => {
                      dispatch(openImageModal(mediaItem));
                    }}
                    className="relative group bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end aspect-[3/4] overflow-hidden"
                    style={{
                      backgroundImage: `url(${img.url})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
