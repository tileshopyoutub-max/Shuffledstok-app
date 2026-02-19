import AdminPageHeader from "../../components/admin/layout/AdminPageHeader";
import SearchInput from "../../components/admin/ui/SearchInput";
import Pagination from "../../components/admin/ui/Pagination";
import { useAllMedia } from "../../components/admin/hooks/useAllMedia";
import Button from "../../components/admin/ui/Button";
import { useMediaDeletion } from "../../components/admin/hooks/useMediaDelet";
import Modal from "../../components/admin/ui/Modal";
import ArchivePreviewSelector from "../../components/admin/ArchivePreviewSelector";
import type { MediaItem } from "../../components/admin/hooks/useAllMedia";
import MediaEditModal from "../../components/admin/MediaEditModal";
import { useState } from "react";

import { useUpdateImageCategoryMutation } from "../../shared/api/imagesApi";
import { useUpdateArchiveCategoriesMutation } from "../../shared/api/archivesApi";
import { useUpdateArchiveTagsMutation } from "../../shared/api/archivesApi";
import { useUpdateImageTagsMutation } from "../../shared/api/imagesApi";

import { useUpdateArchiveAccessMutation } from "../../shared/api/archivesApi";
import { useUpdateImageAccessMutation } from "../../shared/api/imagesApi";

export default function AllMedia() {
  const possibleFormat = ["JPG", "PNG", "SVG", "WEBP"];

  const {
    page,
    setPage,
    pages,
    visibleMedia,
    setSearchParams,
    imagesQuery,
    filteredImages,
    categories,
    selectedCategory,
    setSelectedCategory,
    navigate,
    updateFeatured,
    localArchivePreviews,
    setArchivePreview,
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
  } = useAllMedia();
  const { deleteModal, openDeleteModal, closeDeleteModal, handleDelete } =
    useMediaDeletion();

  const [editItem, setEditItem] = useState<MediaItem | null>(null);

  //
  const [updateImageCategory] = useUpdateImageCategoryMutation();
  const [updateArchiveCategories] = useUpdateArchiveCategoriesMutation();
  const [updateImageTags] = useUpdateImageTagsMutation();
  const [updateArchiveTags] = useUpdateArchiveTagsMutation();
  const [updateArchiveAccess] = useUpdateArchiveAccessMutation();
  const [updateImageAccess] = useUpdateImageAccessMutation();

  function normalizeTag(s: unknown) {
    return String(s ?? "")
      .trim()
      .toLowerCase();
  }

  function normalizeTags(tags: unknown[]) {
    return tags.map(normalizeTag).filter(Boolean);
  }

  function sameStringArrayAsSet(a: string[], b: string[]) {
    const aa = [...a].sort();
    const bb = [...b].sort();
    if (aa.length !== bb.length) return false;
    return aa.every((x, i) => x === bb[i]);
  }

  const onSaveHandler = async (patch: {
    categories: string[];
    tags: string[];
    type: "image" | "archive";
    access: "free" | "premium";
    price: string;
  }) => {
    if (!editItem) return;

    // --- Category
    const nextCategoryName = patch.categories?.[0] ?? "";
    const prevCategoryName = editItem.categories?.[0] ?? "";
    const categoryChanged = nextCategoryName !== prevCategoryName;

    // --- Tags
    const nextTags = normalizeTags(patch.tags ?? []);
    const prevTags = normalizeTags(editItem.tags ?? []);
    const tagsChanged = !sameStringArrayAsSet(nextTags, prevTags);

    // --- Access/Price
    const prevAccess: "free" | "premium" = editItem.original.downloadFree
      ? "free"
      : "premium";
    const nextAccess = patch.access;

    function centsToPriceString(cents: number) {
      if (!Number.isFinite(cents) || cents <= 0) return "0.00";
      return (cents / 100).toFixed(2);
    }

    const prevPrice = centsToPriceString(editItem.original.priceCents || 0);
    const nextPrice = nextAccess === "premium" ? patch.price || "0.00" : "0.00";

    const accessChanged = nextAccess !== prevAccess;
    const priceChanged =
      nextAccess === "premium" &&
      prevAccess === "premium" &&
      nextPrice !== prevPrice;

    if (!categoryChanged && !tagsChanged && !accessChanged && !priceChanged) {
      setEditItem(null);
      return;
    }

    const categoryId =
      categories.find((c) => c.name === nextCategoryName)?.id ?? null;
    const categoryIds = categoryId ? [categoryId] : [];

    try {
      if (editItem.type === "image") {
        if (categoryChanged) {
          await updateImageCategory({ id: editItem.id, categoryId }).unwrap();
        }
        if (tagsChanged) {
          await updateImageTags({ id: editItem.id, tags: nextTags }).unwrap();
        }
        if (accessChanged || priceChanged) {
          await updateImageAccess({
            id: editItem.id,
            access: nextAccess,
            price: nextAccess === "premium" ? patch.price : "0.00",
          }).unwrap();
        }
      } else {
        if (categoryChanged) {
          await updateArchiveCategories({
            id: editItem.id,
            categoryIds,
          }).unwrap();
        }
        if (tagsChanged) {
          await updateArchiveTags({ id: editItem.id, tags: nextTags }).unwrap();
        }
        if (accessChanged || priceChanged) {
          await updateArchiveAccess({
            id: editItem.id,
            access: nextAccess,
            price: nextAccess === "premium" ? patch.price : "0.00",
          }).unwrap();
        }
      }

      setEditItem(null);
    } catch (e) {
      console.error("Save failed:", e);
    }
  };

  return (
    <>
      <div>
        <AdminPageHeader
          title="Media Library"
          action={
            <Button
              name="add"
              text="Add new file"
              onClick={() => navigate("/admin/new-photo")}
            />
          }
        />
        <div className="pt-5 pb-4">
          <div className="bg-card-dark border border-border-dark rounded-xl p-3 mb-6 shadow-sm">
            <div className="flex flex-col xl:flex-row gap-3">
              <div className="relative flex-1">
                <SearchInput
                  value={imagesQuery}
                  placeholder="Search by name, ID or tag..."
                  onChange={(e) => {
                    setPage(1);
                    const value = e.target.value;
                    value ? setSearchParams({ q: value }) : setSearchParams({});
                  }}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative group">
                  <select
                    className="appearance-none h-10 bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg pl-3 pr-8 focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer hover:bg-slate-800 transition-colors min-w-[140px]"
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setPage(1);
                    }}
                    value={selectedCategory}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                    <span className="material-symbols-outlined text-lg">
                      expand_more
                    </span>
                  </div>
                </div>
                <div className="relative group">
                  <select
                    value={selectedFormat}
                    onChange={(e) => {
                      setPage(1);
                      setSelectedFormat(e.target.value);
                    }}
                    className="appearance-none h-10 bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg pl-3 pr-8 focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer hover:bg-slate-800 transition-colors min-w-[100px]"
                  >
                    <option value="">Format</option>
                    {possibleFormat.map((format) => (
                      <option key={format} value={format.toLowerCase()}>
                        {format}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                    <span className="material-symbols-outlined text-lg">
                      expand_more
                    </span>
                  </div>
                </div>
                <div className="relative group">
                  <select
                    value={dateRange}
                    onChange={(e) => {
                      setPage(1);
                      setDateRange(e.target.value as any);
                    }}
                    className="appearance-none h-10 bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg pl-9 pr-8 focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer hover:bg-slate-800 transition-colors min-w-[140px]"
                  >
                    <option value="">Date Added</option>
                    <option value="today">Last 24 Hours</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                    <option value="custom">Custom Range</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400">
                    <span className="material-symbols-outlined text-lg">
                      calendar_today
                    </span>
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                    <span className="material-symbols-outlined text-lg">
                      expand_more
                    </span>
                  </div>

                  {dateRange === "custom" && (
                    <div className="absolute z-50 mt-2 right-0 w-[340px] left-1/2 -translate-x-1/2 ">
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          value={dateFrom}
                          onChange={(e) => {
                            setPage(1);
                            setDateFrom(e.target.value);
                          }}
                          className="h-10 w-[140px] bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg px-3 outline-none"
                        />
                        <span className="text-slate-500 text-sm">—</span>
                        <input
                          type="date"
                          value={dateTo}
                          onChange={(e) => {
                            setPage(1);
                            setDateTo(e.target.value);
                          }}
                          className="h-10 w-[140px] bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg px-3 outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="hidden sm:block w-px h-6 bg-border-dark mx-1"></div>
                <div className="relative group">
                  <select
                    value={sort}
                    onChange={(e) => {
                      setPage(1);
                      setSort(e.target.value as any);
                    }}
                    className="appearance-none h-10 bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg pl-3 pr-8 focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer hover:bg-slate-800 transition-colors min-w-[130px]"
                  >
                    <option value="date_desc">Newest First</option>
                    <option value="date_asc">Oldest First</option>
                    <option value="name_asc">Name (A-Z)</option>
                    <option value="popular">Most Popular</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                    <span className="material-symbols-outlined text-lg">
                      sort
                    </span>
                  </div>
                </div>
                <button
                  className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-border-dark"
                  title="Reset Filters"
                >
                  <span className="material-symbols-outlined text-xl">
                    restart_alt
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-8 pb-2">
          <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-border-dark/50">
            <div className="col-span-2 whitespace-nowrap">Asset</div>
            <div className="col-span-1 flex justify-center whitespace-nowrap">
              Type
            </div>
            <div className="col-span-2 whitespace-nowrap">Category</div>
            <div className="col-span-2 whitespace-nowrap">Tags</div>
            <div className="col-span-1 whitespace-nowrap">Access</div>
            <div className="col-span-1 whitespace-nowrap">Price</div>
            <div className="col-span-1 whitespace-nowrap">Date</div>
            <div className="col-span-1 flex justify-center whitespace-nowrap">
              Featured
            </div>
            <div className="col-span-1 text-right whitespace-nowrap">
              Actions
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="flex flex-col gap-2">
            {visibleMedia.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="group bg-component-dark border border-border-dark rounded-lg p-3 hover:border-primary/50 transition-all hover:bg-slate-800/50"
              >
                {/* Десктопная версия - grid (скрываем на мобильных) */}
                <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center">
                  {/* Asset */}
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="w-16 h-12 rounded bg-black overflow-hidden shrink-0 relative border border-border-dark">
                      <img src={item.url} alt={item.title!} />
                    </div>
                    <div className="min-w-0 flex flex-col gap-0.5">
                      <h3
                        className="text-white font-medium text-sm truncate"
                        title={item.title!}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        ID: #{item.id}
                      </p>
                      {item.type === "archive" && (
                        <>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">
                            {item.imageCount} photo
                          </p>
                          <ArchivePreviewSelector
                            archive={item.original}
                            currentPreviewId={
                              localArchivePreviews[item.id] ||
                              item.original.preview_image_id ||
                              item.original.images[0]?.id
                            }
                            onSelect={(previewImageId) =>
                              setArchivePreview(item.id, previewImageId)
                            }
                          />
                        </>
                      )}
                      {item.type === "image" && (
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          Image
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Type */}
                  <div className="col-span-1 flex justify-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                        item.type === "image"
                          ? "bg-teal-500/20 text-teal-400 border-teal-500/20"
                          : "bg-purple-500/20 text-purple-400 border-purple-500/20"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>

                  {/* Category */}
                  <div className="col-span-2">
                    {item.categories.map((category) => (
                      <span
                        key={category}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/20"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="col-span-2 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={`${item.id}-${tag}`}
                        className="text-[10px] text-slate-400 bg-background-dark border border-border-dark px-1.5 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Access */}
                  <div className="col-span-1 text-sm">
                    {item.original.downloadFree ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/20">
                        Free
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/20">
                        Premium
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="col-span-1 text-sm text-slate-400 font-mono">
                    {item.original.downloadFree
                      ? "—"
                      : `$${((item.original.priceCents || 0) / 100).toFixed(
                          2
                        )}`}
                  </div>

                  {/* Date */}
                  <div className="col-span-1 text-sm text-slate-400">
                    {new Date(item.created_at).toLocaleDateString()}
                  </div>

                  {/* Featured */}
                  <div className="col-span-1 flex justify-center">
                    <input
                      checked={item.featured === 1}
                      className="w-4 h-4 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                      type="checkbox"
                      onChange={(e) =>
                        updateFeatured(item, e.target.checked ? 1 : 0)
                      }
                    />
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-end items-center gap-2">
                    <button
                      className="p-2 text-slate-400 hover:text-primary hover:bg-slate-700 rounded transition-colors"
                      title="Edit"
                      onClick={() => setEditItem(item)}
                    >
                      <span className="material-symbols-outlined text-lg">
                        edit
                      </span>
                    </button>
                    <button
                      className="p-2 text-slate-400 hover:text-danger hover:bg-slate-700 rounded transition-colors"
                      title="Delete"
                      onClick={() =>
                        openDeleteModal(item.id, item.title, item.type)
                      }
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>
                </div>

                {/* Мобильная версия - flex column (показываем только на мобильных) */}
                <div className="flex flex-col gap-3 lg:hidden">
                  {/* Превью и заголовок */}
                  <div className="flex items-start gap-3">
                    <div className="w-20 h-16 rounded bg-black overflow-hidden shrink-0 relative border border-border-dark">
                      <img
                        src={item.url}
                        alt={item.title!}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono">
                        ID: #{item.id}
                      </p>
                      {item.type === "archive" && (
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          {item.imageCount} photos
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Тип и категория */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                        item.type === "image"
                          ? "bg-teal-500/20 text-teal-400 border-teal-500/20"
                          : "bg-purple-500/20 text-purple-400 border-purple-500/20"
                      }`}
                    >
                      {item.type}
                    </span>
                    {item.categories.map((category) => (
                      <span
                        key={category}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/20"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Теги */}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={`${item.id}-${tag}`}
                          className="text-[10px] text-slate-400 bg-background-dark border border-border-dark px-1.5 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Archive Preview Selector (только для архивов) */}
                  {item.type === "archive" && (
                    <ArchivePreviewSelector
                      archive={item.original}
                      currentPreviewId={
                        localArchivePreviews[item.id] ||
                        item.original.preview_image_id ||
                        item.original.images[0]?.id
                      }
                      onSelect={(previewImageId) =>
                        setArchivePreview(item.id, previewImageId)
                      }
                    />
                  )}

                  {/* Инфо grid */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-slate-500 text-xs block mb-1">
                        Access
                      </span>
                      {item.original.downloadFree ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/20">
                          Free
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/20">
                          Premium
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-500 text-xs block mb-1">
                        Price
                      </span>
                      <span className="text-slate-400 font-mono">
                        {item.original.downloadFree
                          ? "—"
                          : `$${((item.original.priceCents || 0) / 100).toFixed(
                              2
                            )}`}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 text-xs block mb-1">
                        Date
                      </span>
                      <span className="text-slate-400">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 text-xs block mb-1">
                        Featured
                      </span>
                      <input
                        checked={item.featured === 1}
                        className="w-4 h-4 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                        type="checkbox"
                        onChange={(e) =>
                          updateFeatured(item, e.target.checked ? 1 : 0)
                        }
                      />
                    </div>
                  </div>

                  {/* Действия */}
                  <div className="flex gap-2 pt-2 border-t border-border-dark">
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-slate-400 hover:text-primary hover:bg-slate-700 rounded transition-colors text-sm"
                      onClick={() => setEditItem(item)}
                    >
                      <span className="material-symbols-outlined text-lg">
                        edit
                      </span>
                      Edit
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-slate-400 hover:text-danger hover:bg-slate-700 rounded transition-colors text-sm"
                      onClick={() =>
                        openDeleteModal(item.id, item.title, item.type)
                      }
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            name="media"
            currentPage={page}
            onPageChange={setPage}
            startingCurrentPosition={1}
            lastCurrentPosition={visibleMedia.length}
            maxCountPosition={filteredImages.length}
            pages={pages}
          />
        </div>

        {/* 

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="flex flex-col gap-2">
            {visibleMedia.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="group grid grid-cols-12 gap-4 items-center bg-component-dark border border-border-dark rounded-lg p-3 hover:border-primary/50 transition-all hover:bg-slate-800/50"
              >
                <div className="col-span-2 md:col-span-2 lg:col-span-2 flex items-center gap-4">
                  <div className="w-16 h-12 rounded bg-black overflow-hidden shrink-0 relative border border-border-dark">
                    <img src={item.url} alt={item.title!} />
                  </div>
                  <div className="min-w-0 flex flex-col gap-0.5">
                    <h3
                      className="text-white font-medium text-sm truncate"
                      title={item.title!}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      ID: #{item.id}
                    </p>
                    {item.type === "archive" && (
                      <>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          {item.imageCount} photo
                        </p>
                        <ArchivePreviewSelector
                          archive={item.original}
                          currentPreviewId={
                            localArchivePreviews[item.id] ||
                            item.original.preview_image_id ||
                            item.original.images[0]?.id
                          }
                          onSelect={(previewImageId) =>
                            setArchivePreview(item.id, previewImageId)
                          }
                        />
                      </>
                    )}
                    {item.type === "image" && (
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        Image
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-1 flex justify-center">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                      item.type === "image"
                        ? "bg-teal-500/20 text-teal-400 border border-teal-500/20"
                        : "bg-purple-500/20 text-purple-400 border border-purple-500/20"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
                <div className="col-span-2 hidden md:block">
                  {item.categories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/20"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="col-span-2 hidden lg:flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={`${item.id}-${tag}`}
                      className="text-[10px] text-slate-400 bg-background-dark border border-border-dark px-1.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="col-span-1 text-sm">
                  {item.original.downloadFree ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/20">
                      Free
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/20">
                      Premium
                    </span>
                  )}
                </div>

                {/* <div className="col-span-1 text-sm text-slate-400 font-mono">
                  {item.original.downloadFree ? "—" : "0.00 $"}
                </div> */}

        {/* <div className="col-span-1 text-sm text-slate-400 font-mono">
                  {item.original.downloadFree
                    ? "—"
                    : `$${((item.original.priceCents || 0) / 100).toFixed(2)}`}
                </div>

                <div className="col-span-1 md:col-span-1 lg:col-span-1 text-sm text-slate-400">
                  {new Date(item.created_at).toLocaleDateString()}
                </div>
                <div className="col-span-1 flex justify-center">
                  <input
                    checked={item.featured === 1}
                    className="w-4 h-4 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                    type="checkbox"
                    onChange={(e) =>
                      updateFeatured(item, e.target.checked ? 1 : 0)
                    }
                  />
                </div>
                <div className="col-span-1 flex justify-end items-center gap-2">
                  <button
                    className="p-2 text-slate-400 hover:text-primary hover:bg-slate-700 rounded transition-colors"
                    title="Edit"
                    onClick={() => setEditItem(item)}
                  >
                    <span className="material-symbols-outlined text-lg">
                      edit
                    </span>
                  </button>
                  <button
                    className="p-2 text-slate-400 hover:text-danger hover:bg-slate-700 rounded transition-colors"
                    title="Delete"
                    onClick={() =>
                      openDeleteModal(item.id, item.title, item.type)
                    }
                  >
                    <span className="material-symbols-outlined text-lg">
                      delete
                    </span>
                  </button>
                  <button
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors lg:hidden"
                    title="More"
                  >
                    <span className="material-symbols-outlined text-lg">
                      more_vert
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            name="media"
            currentPage={page}
            onPageChange={setPage}
            startingCurrentPosition={1}
            lastCurrentPosition={visibleMedia.length}
            maxCountPosition={filteredImages.length}
            pages={pages}
          />
        </div>  */}
      </div>

      {deleteModal && (
        <Modal
          title="Confirm Delete"
          handleName="Delete"
          handleAction={handleDelete}
          onClose={closeDeleteModal}
        >
          <p>Are you sure you want to delete "{deleteModal.title}"?</p>
        </Modal>
      )}

      {editItem && (
        <MediaEditModal
          item={editItem}
          categories={categories}
          onClose={() => setEditItem(null)}
          onSave={onSaveHandler}
        />
      )}
    </>
  );
}
