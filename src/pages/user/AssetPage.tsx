import { Link, useParams } from "react-router-dom";
import { useMemo, useRef } from "react";
import { useAllMedia } from "../../components/admin/hooks/useAllMedia";
import { useGetPublicListingQuery } from "../../shared/api/publicListingApi";
import { AssetCardLink } from "../../user/components/asset/AssetCardLink";
import type { PrimaryCategory } from "../../shared/types/listing";
import { useImageModal } from "../../user/components/modal/hooks/useImageModal";
import { ArchiveSlider } from "../../user/components/modal/ArchiveSlider";
import { useSeoMeta } from "../../user/hooks/useSeoMeta";
import { getCategoryIndexPath } from "../../user/utils/assetUrl";
import {
  getAccessLabel,
  getCategoryLabel,
  getFileTypeLabel,
  getFormatFromKeyOrUrl,
  getHowToUseByPrimaryCategory,
  getLicenseNote,
} from "../../user/utils/assetContent";
import { findRelatedAssets } from "../../user/utils/relatedAssets";
import { stickerPreviewTileClass } from "../../user/utils/stickerPreviewBg";
import type {
  PublicArchiveAsset,
  PublicImageAsset,
} from "../../shared/types/listing";

interface AssetPageProps {
  expectedCategory: PrimaryCategory;
}

const categoryLabels: Record<PrimaryCategory, string> = {
  wallpapers: "Wallpapers",
  icons: "Icons",
  stickers: "Stickers",
};

function resolveAssetFormat(
  asset: PublicImageAsset | PublicArchiveAsset
): string | null {
  if (asset.type === "image") {
    return getFormatFromKeyOrUrl(asset.key) || getFormatFromKeyOrUrl(asset.url);
  }
  const first = asset.images[0];
  if (!first) return null;
  return getFormatFromKeyOrUrl(first.key) || getFormatFromKeyOrUrl(first.url);
}

export default function AssetPage({ expectedCategory }: AssetPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const modalRef = useRef<HTMLDivElement>(null);
  const { allMedia } = useAllMedia();

  const { data, isLoading, isError } = useGetPublicListingQuery(
    { category: expectedCategory, slug: slug ?? "" },
    { skip: !slug }
  );

  const asset = data?.asset;
  const listing = data?.listing;
  const isImage = asset?.type === "image";
  const fileKey = isImage ? asset.key : "";

  const { isPurchased, handleBuy, handleDownload } = useImageModal({
    modalRef,
    onClose: () => undefined,
    fileKey,
  });

  useSeoMeta({
    title: asset?.title
      ? `${asset.title} | ShuffledStock`
      : "Asset | ShuffledStock",
    description:
      asset?.description ||
      `Download free ${expectedCategory} from ShuffledStock.`,
  });

  const relatedAssets = useMemo(() => {
    if (!listing || !asset) return [];
    return findRelatedAssets(allMedia, {
      id: listing.entityId,
      entityType: listing.entityType,
      slug: listing.slug,
      primaryCategory: listing.primaryCategory,
      tags: asset.tags,
    });
  }, [allMedia, listing, asset]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-gray-300">Loading...</p>
      </div>
    );
  }

  if (isError || !asset || !listing) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-white mb-4">Asset not found</h1>
        <Link
          className="text-primary hover:underline"
          to={getCategoryIndexPath(expectedCategory)}
        >
          Back to {categoryLabels[expectedCategory]}
        </Link>
      </div>
    );
  }

  const primaryCategory = listing.primaryCategory;
  const fileTypeLabel = getFileTypeLabel(primaryCategory, listing.entityType);
  const accessLabel = getAccessLabel(asset.downloadFree);
  const formatLabel = resolveAssetFormat(asset);
  const howToUseSteps = getHowToUseByPrimaryCategory(primaryCategory);

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8" ref={modalRef}>
        <Link
          className="text-primary hover:underline text-sm mb-6 inline-block"
          to={getCategoryIndexPath(expectedCategory)}
        >
          ← Back to {categoryLabels[expectedCategory]}
        </Link>

        <div className="grid lg:grid-cols-2 gap-10">
          <div
            className={`rounded-xl overflow-hidden border border-white/10 flex flex-col items-center w-full ${
              primaryCategory === "stickers" ? "p-1" : "p-4"
            }`}
          >
            {asset.type === "archive" ? (
              <>
                <ArchiveSlider
                  images={asset.images.map((img) => ({
                    url: img.url,
                    key: img.key,
                  }))}
                />
                <p className="text-gray-400 text-sm mt-4">
                  {asset.images.length} items in this pack
                </p>
              </>
            ) : primaryCategory === "stickers" ? (
              <div
                className={`flex w-full items-center justify-center py-3 rounded-lg ${stickerPreviewTileClass}`}
              >
                <img
                  src={asset.url}
                  alt={asset.title || "Asset preview"}
                  className="block max-h-[min(50vh,400px)] max-w-full w-auto h-auto object-contain"
                />
              </div>
            ) : (
              <img
                src={asset.url}
                alt={asset.title || "Asset preview"}
                className="w-full h-full object-cover aspect-[3/4] rounded-lg"
              />
            )}
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-black">
              {asset.title || "Untitled"}
            </h1>

            {asset.description && (
              <p className="text-gray-300 leading-7">{asset.description}</p>
            )}

            {asset.type === "image" && (
              <div className="space-y-4">
                {asset.downloadFree ? (
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
            )}

            {asset.type === "archive" && (
              <div className="rounded-xl border border-white/10 p-5">
                <p className="text-gray-300">
                  {asset.downloadFree
                    ? "This pack is marked as free. Pack download will be available in a future update."
                    : "Premium pack — purchase flow coming soon."}
                </p>
              </div>
            )}

            {asset.categories.length > 0 && (
              <div className="rounded-xl border border-white/10 p-5">
                <h2 className="text-lg font-bold mb-2">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {asset.categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {asset.tags.length > 0 && (
              <div className="rounded-xl border border-white/10 p-5">
                <h2 className="text-lg font-bold mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {asset.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-xl border border-white/10 p-5 space-y-3">
              <h2 className="text-xl font-bold">File details</h2>
              <dl className="text-sm space-y-2">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-400">Type</dt>
                  <dd className="text-gray-200 text-right">{fileTypeLabel}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-400">Access</dt>
                  <dd className="text-gray-200 text-right">{accessLabel}</dd>
                </div>
                {formatLabel && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-400">Format</dt>
                    <dd className="text-gray-200 text-right">{formatLabel}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-400">Category</dt>
                  <dd className="text-gray-200 text-right">
                    {getCategoryLabel(primaryCategory)}
                  </dd>
                </div>
                {asset.type === "archive" && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-400">Items count</dt>
                    <dd className="text-gray-200 text-right">
                      {asset.images.length}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="rounded-xl border border-white/10 p-5 space-y-4">
              <h2 className="text-xl font-bold">How to use</h2>
              <ol className="text-gray-300 space-y-2 list-decimal list-inside">
                {howToUseSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl border border-white/10 p-5">
              <h2 className="text-xl font-bold mb-2">License note</h2>
              <p className="text-gray-300">
                {getLicenseNote()}{" "}
                <Link
                  to="/license"
                  className="text-primary hover:underline font-medium"
                >
                  View full license
                </Link>
              </p>
            </div>
          </div>
        </div>

        {relatedAssets.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related assets</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedAssets.map((item) => (
                <AssetCardLink
                  key={`${item.type}-${item.id}`}
                  item={item}
                  className="group rounded-lg overflow-hidden border border-white/10 block"
                >
                  <img
                    src={item.url}
                    alt={item.title || "Related asset"}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </AssetCardLink>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
