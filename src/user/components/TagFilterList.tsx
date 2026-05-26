import { useMemo, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../shared/hooks/redux";
import { useGetTagsQuery } from "../../shared/api/tagsApi";
import { toggleTag } from "../../store/slices/imagesFilterSlice";
import { orderTagsForDisplay } from "../utils/tagDisplayOrder";

const VISIBLE_TAG_LIMIT = 24;

type TagFilterListProps = {
  listClassName?: string;
};

export function TagFilterList({
  listClassName = "flex flex-wrap gap-2",
}: TagFilterListProps) {
  const dispatch = useTypedDispatch();
  const { selectedTags } = useTypedSelector((state) => state.imagesFilter);
  const { data: tags = [] } = useGetTagsQuery();
  const [showAllTags, setShowAllTags] = useState(false);

  const orderedTags = useMemo(() => orderTagsForDisplay(tags), [tags]);
  const hasOverflow = orderedTags.length > VISIBLE_TAG_LIMIT;
  const visibleTags = showAllTags
    ? orderedTags
    : orderedTags.slice(0, VISIBLE_TAG_LIMIT);

  return (
    <div>
      <div className={listClassName}>
        {visibleTags.map((t) => (
          <label key={t.id} className="cursor-pointer group">
            <input
              className="peer sr-only"
              type="checkbox"
              checked={selectedTags.includes(t.name)}
              onChange={() => dispatch(toggleTag(t.name))}
            />
            <span className="inline-flex items-center rounded-full border border-white/20 bg-transparent px-3 py-1.5 text-xs font-medium text-gray-400 transition-all peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary group-hover:border-white/40 group-hover:text-gray-200">
              #{t.name}
            </span>
          </label>
        ))}
      </div>
      {hasOverflow && (
        <button
          type="button"
          className="mt-2 text-xs font-medium text-primary hover:text-gray-200 transition-colors"
          onClick={() => setShowAllTags((prev) => !prev)}
        >
          {showAllTags ? "Show less" : "Show more tags"}
        </button>
      )}
    </div>
  );
}
