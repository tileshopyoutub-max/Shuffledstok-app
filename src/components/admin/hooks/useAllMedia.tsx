import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetImagesQuery } from "../../../shared/api/imagesApi";
import { usePagination } from "./usePagination";
import { useGetCategoriesQuery } from "../../../shared/api/categoriesApi";
import { useGetArchivesQuery } from "../../../shared/api/archivesApi";
import type { ArchiveItem } from "../../../shared/types/archives";
import type { ImageItems } from "../../../shared/types/images";
import { useUpdateFeaturedMutation as useUpdateImageFeatured } from "../../../shared/api/imagesApi";
import { useUpdateFeaturedMutation as useUpdateArchiveFeatured } from "../../../shared/api/archivesApi";
import { useUpdateArchivePreviewMutation } from "../../../shared/api/archivesApi";

export type MediaItem =
  | {
      id: number;
      type: "image";
      title: string;
      url?: string;
      categories: string[];
      tags: string[];
      created_at: string;
      original: ImageItems;
      featured?: number;
    }
  | {
      id: number;
      type: "archive";
      title: string;
      url?: string;
      categories: string[];
      tags: string[];
      created_at: string;
      imageCount: number;
      original: ArchiveItem;
      featured?: number;
    };

export function useAllMedia() {
  const { data: images = [], isLoading: imagesLoading } = useGetImagesQuery();
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const { data: archives = [], isLoading: archivesLoading } =
    useGetArchivesQuery();

  const [updateImageFeatured] = useUpdateImageFeatured();
  const [updateArchiveFeatured] = useUpdateArchiveFeatured();
  const [updateArchivePreview] = useUpdateArchivePreviewMutation();

  const [localArchivePreviews, setLocalArchivePreviews] = useState<
    Record<number, number>
  >({});

  const isLoading = imagesLoading || archivesLoading || categoriesLoading;

  const allMedia: MediaItem[] = [
    ...images.map((img) => ({
      id: img.id,
      type: "image" as const,
      title: img.title || "Untitled Image",
      url: img.url,
      categories: img.categories || [],
      tags: img.tags || [],
      created_at: img.created_at,
      original: img,
      featured: img.featured,
    })),

    ...archives.map((archive) => {
      const previewId =
        localArchivePreviews[archive.id] ||
        archive.preview_image_id ||
        archive.images[0]?.id;
      const previewImage =
        archive.images.find((img) => img.id === previewId) || archive.images[0];

      return {
        id: archive.id,
        type: "archive" as const,
        title: archive.title || "Untitled Archive",
        categories: archive.categories || [],
        tags: archive.tags || [],
        created_at: archive.created_at || new Date().toISOString(),
        imageCount: archive.images.length,
        url: previewImage?.url,
        original: archive,
        featured: archive.featured,
      };
    }),
  ].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  async function updateFeatured(item: MediaItem, value: number) {
    if (item.type === "image") {
      await updateImageFeatured({ id: item.id, featured: value });
    } else {
      await updateArchiveFeatured({ id: item.id, featured: value });
    }
  }

  async function setArchivePreview(archiveId: number, previewImageId: number) {
    setLocalArchivePreviews((prev) => ({
      ...prev,
      [archiveId]: previewImageId,
    }));
    try {
      await updateArchivePreview({
        id: archiveId,
        preview_image_id: previewImageId,
      }).unwrap();
    } catch (error) {
      setLocalArchivePreviews((prev) => {
        const newState = { ...prev };
        delete newState[archiveId];
        return newState;
      });
    }
  }

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const imagesQuery = searchParams.get("q") || "";

  function getExtFromUrl(url?: string) {
    if (!url) return undefined;

    try {
      const pathname = new URL(url).pathname;
      const match = pathname.match(/\.([a-z0-9]+)$/i);
      return match?.[1]?.toLowerCase();
    } catch {
      const clean = url.split("?")[0].split("#")[0];
      return clean.split(".").pop()?.toLowerCase();
    }
  }

  // Фильтр по дате
  type DateRange = "" | "today" | "week" | "month" | "custom";

  const dateFrom = searchParams.get("from") || "";
  const dateTo = searchParams.get("to") || "";

  const dateRange = (searchParams.get("date") || "") as DateRange;

  function setDateRange(nextValue: DateRange) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (!nextValue) next.delete("date");
      else next.set("date", nextValue);

      return next;
    });
  }

  function setDateFrom(next: string) {
    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);
      if (!next) sp.delete("from");
      else sp.set("from", next);
      sp.set("date", "custom");
      return sp;
    });
  }

  function setDateTo(next: string) {
    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);
      if (!next) sp.delete("to");
      else sp.set("to", next);
      sp.set("date", "custom");
      return sp;
    });
  }

  let filteredImages = allMedia.filter((img) => {
    // --- поиск ---
    const matchesSearch =
      img.title?.toLowerCase().includes(imagesQuery.toLowerCase()) ||
      img.id.toString().includes(imagesQuery) ||
      img.tags.some((tag) =>
        tag.toLowerCase().includes(imagesQuery.toLowerCase())
      );

    if (!matchesSearch) return false;

    // --- фильтр по дате ---
    const now = Date.now();
    const created = new Date(img.created_at).getTime();

    if (dateRange === "today" && now - created > 24 * 60 * 60 * 1000)
      return false;
    if (dateRange === "week" && now - created > 7 * 24 * 60 * 60 * 1000)
      return false;
    if (dateRange === "month" && now - created > 30 * 24 * 60 * 60 * 1000)
      return false;

    if (dateRange === "custom") {
      const fromTs = dateFrom
        ? new Date(`${dateFrom}T00:00:00`).getTime()
        : null;

      const toTs = dateTo ? new Date(`${dateTo}T23:59:59`).getTime() : null;

      if (fromTs !== null && created < fromTs) return false;
      if (toTs !== null && created > toTs) return false;
    }

    return true;
  });

  if (selectedCategory) {
    filteredImages = filteredImages.filter((img) =>
      img.categories.includes(selectedCategory)
    );
  }

  //   Фильтр по формату
  const formatParam = (searchParams.get("format") || "").toLowerCase();

  const allowedExts =
    formatParam === "jpg" ? ["jpg", "jpeg"] : formatParam ? [formatParam] : [];

  if (allowedExts.length) {
    filteredImages = filteredImages.filter((item) => {
      const ext = getExtFromUrl(item.url);
      return !!ext && allowedExts.includes(ext);
    });
  }

  const selectedFormat = searchParams.get("format") || "";

  function setSelectedFormat(next: string) {
    const params = Object.fromEntries(searchParams.entries());

    if (next) params.format = next;
    else delete params.format;

    setSearchParams(params);
  }

  //   Сортировка

  type SortType = "date_desc" | "date_asc" | "name_asc" | "popular";

  const sort = (searchParams.get("sort") || "date_desc") as SortType;

  function setSort(next: SortType) {
    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);
      sp.set("sort", next);
      sp.delete("page");
      return sp;
    });
  }

  filteredImages = [...filteredImages].sort((a, b) => {
    if (sort === "date_desc") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    if (sort === "date_asc") {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }

    if (sort === "name_asc") {
      return a.title.localeCompare(b.title);
    }

    if (sort === "popular") {
      const bf = b.featured ?? 0;
      const af = a.featured ?? 0;
      if (bf !== af) return af - bf;

      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    return 0;
  });

  const { page, setPage, startIndex, endIndex, pages } = usePagination({
    total: filteredImages.length,
    pageSize: 10,
  });
  const visibleMedia = filteredImages.slice(startIndex, endIndex);

  return {
    images,
    categories,
    page,
    setPage,
    pages,
    visibleMedia,
    setSearchParams,
    imagesQuery,
    filteredImages,
    selectedCategory,
    setSelectedCategory,
    navigate,
    allMedia,
    updateFeatured,
    localArchivePreviews,
    setArchivePreview,
    isLoading,
    selectedFormat,
    setSelectedFormat,
    dateRange,
    setDateRange,
    dateFrom,
    dateTo,
    setDateFrom,
    setDateTo,
    sort,
    setSort,
  };
}
