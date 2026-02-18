import { useEffect, useState } from "react";
import type { MediaItem } from "./hooks/useAllMedia";
import type { Category } from "../../shared/types/Category";

type Props = {
  item: MediaItem;
  categories: Category[];
  onClose: () => void;
  onSave: (patch: {
    categories: string[];
    type: "image" | "archive";
    tags: string[];
    access: "free" | "premium";
    price: string;
  }) => void;
};

export default function MediaEditModal({
  item,
  categories,
  onClose,
  onSave,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    item.categories?.[0] || ""
  );
  const [type, setType] = useState<"image" | "archive">(item.type);
  const [tags, setTags] = useState<string[]>(item.tags || []);
  const [tagInput, setTagInput] = useState("");
  type AccessType = "free" | "premium";

  //

  const initialAccess: AccessType = item.original.downloadFree
    ? "free"
    : "premium";

  const initialPrice =
    initialAccess === "premium"
      ? ((item.original.priceCents || 0) / 100).toFixed(2)
      : "";

  const [access, setAccess] = useState<AccessType>(initialAccess);
  const [price, setPrice] = useState<string>(initialPrice);

  useEffect(() => {
    setSelectedCategory(item.categories?.[0] || "");
    setType(item.type);
    setTags(item.tags || []);
    setTagInput("");

    const nextAccess: AccessType = item.original.downloadFree
      ? "free"
      : "premium";
    setAccess(nextAccess);

    const nextPrice =
      nextAccess === "premium"
        ? ((item.original.priceCents || 0) / 100).toFixed(2)
        : "";
    setPrice(nextPrice);
  }, [item]);

  function normalizeTag(s: string) {
    return s.trim().toLowerCase();
  }

  function addTag(raw: string) {
    const t = normalizeTag(raw);
    if (!t) return;

    setTags((prev) => {
      const exists = prev.some((x) => normalizeTag(x) === t);
      if (exists) return prev;
      return [...prev, t];
    });

    setTagInput("");
  }

  function removeTag(tagToRemove: string) {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl border border-border-dark bg-component-dark shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-dark p-4">
          <div>
            <p className="text-text-main-dark font-medium">Edit media</p>
            <p className="text-xs text-text-secondary-dark mt-1">
              ID: #{item.id} • {item.type}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-text-secondary-dark hover:text-text-main-dark"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-4">
          <div>
            <p className="text-sm text-text-secondary-dark mb-2">Category</p>

            {/* Category */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none w-full h-10 bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg pl-3 pr-10 outline-none"
              >
                <option value="">No category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                <span className="material-symbols-outlined text-lg">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* тип */}
          {/*
          <div>
            <p className="text-sm text-text-secondary-dark mb-2">Type</p>

            
            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "image" | "archive")}
                className="appearance-none w-full h-10 bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg pl-3 pr-10 outline-none"
              >
                <option value="image">Image</option>
                <option value="archive">Archive</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                <span className="material-symbols-outlined text-lg">
                  expand_more
                </span>
              </div>
            </div>
          </div>
          */}

          {/* теги  */}
          <div>
            <p className="text-sm text-text-secondary-dark mb-2">Tags</p>

            {/* chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.length === 0 ? (
                <span className="text-xs text-slate-500">No tags</span>
              ) : (
                tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-dark bg-background-dark px-3 py-1 text-xs text-slate-300"
                  >
                    #{t}
                    <button
                      type="button"
                      onClick={() => removeTag(t)}
                      className="ml-1 text-slate-400 hover:text-white"
                      title="Remove tag"
                    >
                      <span className="material-symbols-outlined text-base leading-none">
                        close
                      </span>
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* input + add */}
            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(tagInput);
                  }
                }}
                placeholder="Type tag and press Enter"
                className="w-full h-10 bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg px-3 outline-none"
              />
              <button
                type="button"
                onClick={() => addTag(tagInput)}
                className="h-10 px-4 rounded-lg border border-border-dark text-text-secondary-dark hover:bg-border-dark"
              >
                Add
              </button>
            </div>
          </div>

          {/* Access */}
          <div>
            <p className="text-sm text-text-secondary-dark mb-2">Access</p>

            <div className="relative">
              <select
                value={access}
                onChange={(e) => {
                  const next = e.target.value as "free" | "premium";
                  setAccess(next);
                  if (next === "free") setPrice("");
                  else if (!price) setPrice("0.00");
                }}
                className="w-full h-10 appearance-none bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg pl-3 pr-8 outline-none"
              >
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400">
                <span className="material-symbols-outlined text-lg">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div>
            <p className="text-sm text-text-secondary-dark mb-2">Price</p>

            <div className="relative">
              <input
                value={access === "free" ? "—" : price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={access === "free"}
                inputMode="decimal"
                placeholder="0.00"
                className={`w-full h-10 bg-background-dark border border-border-dark text-slate-300 text-sm rounded-lg px-3 outline-none ${
                  access === "free" ? "opacity-60 cursor-not-allowed" : ""
                }`}
              />
              {access !== "free" && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 text-sm font-mono">
                  $
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-border-dark p-4">
          <button
            onClick={onClose}
            className="h-10 px-4 rounded-lg border border-border-dark text-text-secondary-dark hover:bg-border-dark"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSave({
                categories: selectedCategory ? [selectedCategory] : [],
                type,
                tags,
                access,
                price,
              })
            }
            className="h-10 px-4 rounded-lg bg-primary text-white hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
