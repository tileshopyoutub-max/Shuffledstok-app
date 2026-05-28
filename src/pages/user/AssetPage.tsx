import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
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

const infoCardClass =
  "rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6";
const infoCardTitleClass = "text-base font-semibold text-gray-50 tracking-tight";

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

function parsePositiveNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
  if (typeof value === "string") {
    const n = Number(value);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return null;
}

function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

function getApiFileSizeLabel(
  asset: PublicImageAsset | PublicArchiveAsset
): string | null {
  const source = asset as unknown as Record<string, unknown>;
  const bytes =
    parsePositiveNumber(source.fileSize) ??
    parsePositiveNumber(source.size) ??
    parsePositiveNumber(source.bytes);

  return bytes ? formatFileSize(bytes) : null;
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
  const [previewDimensions, setPreviewDimensions] = useState<string | null>(null);

  const apiFileSizeLabel = useMemo(() => {
    if (!asset) return null;
    return getApiFileSizeLabel(asset);
  }, [asset]);

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

  useEffect(() => {
    if (!asset || asset.type !== "image" || !asset.url) {
      setPreviewDimensions(null);
      return;
    }

    let cancelled = false;
    const img = new Image();

    img.onload = () => {
      if (cancelled) return;
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        setPreviewDimensions(`${img.naturalWidth} × ${img.naturalHeight} px`);
      }
    };
    img.onerror = () => {
      if (!cancelled) setPreviewDimensions(null);
    };
    img.src = asset.url;

    return () => {
      cancelled = true;
    };
  }, [asset]);

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
  const isSticker = primaryCategory === "stickers";
  const fileTypeLabel = getFileTypeLabel(primaryCategory, listing.entityType);
  const accessLabel = getAccessLabel(asset.downloadFree);
  const formatLabel = resolveAssetFormat(asset);
  const howToUseSteps = getHowToUseByPrimaryCategory(primaryCategory);

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8" ref={modalRef}>
        <Link
          className="text-primary hover:underline text-sm mb-5 sm:mb-6 inline-block"
          to={getCategoryIndexPath(expectedCategory)}
        >
          ← Back to {categoryLabels[expectedCategory]}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-start">
          <div className="w-full lg:sticky lg:top-8">
            {asset.type === "archive" ? (
              <div
                className={`${infoCardClass} flex flex-col items-center w-full`}
              >
                <ArchiveSlider
                  images={asset.images.map((img) => ({
                    url: img.url,
                    key: img.key,
                  }))}
                />
                <p className="text-gray-400 text-sm mt-4 w-full text-center">
                  {asset.images.length} items in this pack
                </p>
              </div>
            ) : isSticker ? (
              <div className="mx-auto w-full max-w-md">
                <div
                  className={`rounded-xl overflow-hidden border border-white/10 ${stickerPreviewTileClass}`}
                >
                  <div className="flex items-center justify-center px-5 py-6 sm:px-6 sm:py-8 min-h-[200px]">
                    <img
                      src={asset.url}
                      alt={asset.title || "Asset preview"}
                      className="block w-full h-auto max-h-[min(52vh,380px)] object-contain"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden border border-white/10 bg-neutral-950/30">
                <img
                  src={asset.url}
                  alt={asset.title || "Asset preview"}
                  className="block w-full h-auto"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5 sm:gap-6 min-w-0">
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                {asset.title || "Untitled"}
              </h1>

              {asset.description && (
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {asset.description}
                </p>
              )}

              {asset.type === "image" && (
                <div className="pt-1">
                  {asset.downloadFree ? (
                    <button
                      onClick={handleDownload}
                      className="w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold transition-colors"
                    >
                      Download for free
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={handleBuy}
                        className="w-full h-12 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-bold transition-colors"
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
                    </div>
                  )}
                </div>
              )}
            </div>

            {asset.type === "archive" && (
              <div className={infoCardClass}>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {asset.downloadFree
                    ? "This pack is marked as free. Pack download will be available in a future update."
                    : "Premium pack — purchase flow coming soon."}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-4">
              {asset.categories.length > 0 && (
                <div className={infoCardClass}>
                  <h2 className={`${infoCardTitleClass} mb-3`}>Categories</h2>
                  <div className="flex flex-wrap gap-2">
                    {asset.categories.map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1 bg-gray-800/80 text-gray-300 text-sm rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {asset.tags.length > 0 && (
                <div className={infoCardClass}>
                  <h2 className={`${infoCardTitleClass} mb-3`}>Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {asset.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-800/80 text-gray-300 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={`${infoCardClass} space-y-3`}>
                <h2 className={infoCardTitleClass}>File details</h2>
                <dl className="text-sm space-y-2.5">
                  <div className="flex justify-between gap-4 border-b border-white/5 pb-2">
                    <dt className="text-gray-400">Type</dt>
                    <dd className="text-gray-200 text-right">{fileTypeLabel}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-white/5 pb-2">
                    <dt className="text-gray-400">Access</dt>
                    <dd className="text-gray-200 text-right">{accessLabel}</dd>
                  </div>
                  {formatLabel && (
                    <div className="flex justify-between gap-4 border-b border-white/5 pb-2">
                      <dt className="text-gray-400">Format</dt>
                      <dd className="text-gray-200 text-right">{formatLabel}</dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-4 border-b border-white/5 pb-2">
                    <dt className="text-gray-400">Category</dt>
                    <dd className="text-gray-200 text-right">
                      {getCategoryLabel(primaryCategory)}
                    </dd>
                  </div>
                  {previewDimensions && (
                    <div className="flex justify-between gap-4 border-b border-white/5 pb-2">
                      <dt className="text-gray-400">Preview dimensions</dt>
                      <dd className="text-gray-200 text-right">{previewDimensions}</dd>
                    </div>
                  )}
                  {apiFileSizeLabel && (
                    <div className="flex justify-between gap-4 border-b border-white/5 pb-2">
                      <dt className="text-gray-400">File size</dt>
                      <dd className="text-gray-200 text-right">{apiFileSizeLabel}</dd>
                    </div>
                  )}
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

              <div className={`${infoCardClass} space-y-3`}>
                <h2 className={infoCardTitleClass}>How to use</h2>
                <ol className="text-gray-300 text-sm leading-relaxed space-y-2 list-decimal list-inside">
                  {howToUseSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className={infoCardClass}>
                <h2 className={`${infoCardTitleClass} mb-3`}>License note</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
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
        </div>

        {relatedAssets.length > 0 && (
          <section className="mt-12 sm:mt-14 pt-8 sm:pt-10 border-t border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-50 mb-5 sm:mb-6">
              Related assets
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {relatedAssets.map((item) => (
                <AssetCardLink
                  key={`${item.type}-${item.id}`}
                  item={item}
                  className="group block rounded-lg overflow-hidden border border-white/10 bg-white/[0.02] ring-1 ring-transparent hover:ring-white/15 transition-all"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-neutral-900/60">
                    <img
                      src={item.url}
                      alt={item.title || "Related asset"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </AssetCardLink>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
