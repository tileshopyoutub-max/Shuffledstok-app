import { Link, useParams } from "react-router-dom";
import { useRef } from "react";
import { useAllMedia } from "../../components/admin/hooks/useAllMedia";
import { findSimilarImages } from "../../user/utils/FilterSimilarContent";
import { useImageModal } from "../../user/components/modal/hooks/useImageModal";
import { buildAssetContent, getLicenseNote } from "../../user/utils/assetContent";
import { useSeoMeta } from "../../user/hooks/useSeoMeta";

function getGuideLinks(type: "wallpaper" | "icon" | "sticker") {
  if (type === "wallpaper") {
    return [
      {
        label: "How to Choose Wallpaper for iPhone",
        to: "/blog/how-to-choose-wallpaper-for-iphone",
      },
      {
        label: "How to Create an Aesthetic iPhone Home Screen",
        to: "/blog/create-aesthetic-iphone-home-screen",
      },
    ];
  }

  if (type === "icon") {
    return [
      {
        label: "How to Use Instagram Highlight Icons",
        to: "/blog/how-to-use-instagram-highlight-icons",
      },
    ];
  }

  return [
    {
      label: "How to Create an Aesthetic iPhone Home Screen",
      to: "/blog/create-aesthetic-iphone-home-screen",
    },
  ];
}

export default function AssetDownloadPage() {
  const { id } = useParams();
  const modalRef = useRef<HTMLDivElement>(null);
  const { allMedia, isLoading } = useAllMedia();
  const asset = allMedia.find((item) => String(item.id) === id);

  const imageAsset = asset && asset.type === "image" ? asset : null;
  const fallbackTitle = "Download Digital Asset | ShuffledStock";
  const fallbackDescription =
    "Download free wallpapers, icons, and stickers from ShuffledStock.";
  const content = imageAsset ? buildAssetContent(imageAsset) : null;

  useSeoMeta({
    title: content?.metaTitle || fallbackTitle,
    description: content?.metaDescription || fallbackDescription,
  });

  const fileKey = imageAsset?.original.key || "";
  const { isPurchased, handleBuy, handleDownload } = useImageModal({
    modalRef,
    onClose: () => undefined,
    fileKey,
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-gray-300">Loading asset...</p>
      </div>
    );
  }

  if (!asset || !imageAsset) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-white mb-4">Asset not found</h1>
        <Link className="text-primary hover:underline" to="/">
          Back to all downloads
        </Link>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  const guideLinks = getGuideLinks(content.type);
  const related = findSimilarImages(allMedia, asset).slice(0, 6);

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="rounded-xl overflow-hidden border border-white/10">
            <img
              src={imageAsset.original.url}
              alt={imageAsset.title}
              className="w-full h-full object-cover aspect-[3/4]"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-black">{imageAsset.title}</h1>
            <p className="text-gray-300 leading-7">{content.longDescription}</p>

            <div className="space-y-4">
              {imageAsset.original.downloadFree ? (
                <button
                  onClick={handleDownload}
                  className="w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold"
                >
                  Download for free
                </button>
              ) : (
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
                    className={`w-full h-12 rounded-lg font-bold transition-colors ${
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

            <div className="rounded-xl border border-white/10 p-5 space-y-4">
              <h2 className="text-xl font-bold">What&apos;s included</h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                {content.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 p-5 space-y-4">
              <h2 className="text-xl font-bold">Best for</h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                {content.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 p-5 space-y-4">
              <h2 className="text-xl font-bold">How to use</h2>
              <ol className="text-gray-300 space-y-2 list-decimal list-inside">
                {content.howToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl border border-white/10 p-5">
              <h2 className="text-xl font-bold mb-2">License note</h2>
              <p className="text-gray-300">{getLicenseNote()}</p>
            </div>

            <div className="rounded-xl border border-white/10 p-5">
              <h2 className="text-xl font-bold mb-3">Related guide</h2>
              <div className="space-y-2">
                {guideLinks.map((guide) => (
                  <Link
                    key={guide.to}
                    className="block text-primary hover:underline"
                    to={guide.to}
                  >
                    {guide.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related downloads</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/download/${item.id}`}
                className="group rounded-lg overflow-hidden border border-white/10"
              >
                <img
                  src={item.url}
                  alt={item.title || "Related download"}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
