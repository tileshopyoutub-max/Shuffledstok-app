import { Link, useNavigate } from "react-router-dom";
import { useTypedDispatch } from "../../../shared/hooks/redux";
import {
  resetFilters,
  setSearch,
  toggleTag,
} from "../../../store/slices/imagesFilterSlice";

type StyleEntry =
  | { label: string; type: "tag"; tag: string; to: "/wallpapers" }
  | { label: string; type: "search"; query: string; to: "/wallpapers" }
  | { label: string; type: "route"; to: string };

const STYLES: StyleEntry[] = [
  { label: "Minimal", type: "tag", tag: "minimal", to: "/wallpapers" },
  { label: "Cute", type: "search", query: "cute", to: "/wallpapers" },
  { label: "Dark", type: "tag", tag: "dark", to: "/wallpapers" },
  { label: "Vintage", type: "tag", tag: "vintage", to: "/wallpapers" },
  { label: "Pink", type: "search", query: "pink", to: "/wallpapers" },
  { label: "Clean", type: "search", query: "clean", to: "/wallpapers" },
  { label: "Luxury", type: "tag", tag: "luxury", to: "/wallpapers" },
  { label: "Y2K", type: "tag", tag: "y2k", to: "/wallpapers" },
  { label: "Neutral", type: "search", query: "neutral", to: "/wallpapers" },
  { label: "Cinematic", type: "tag", tag: "cinematic", to: "/wallpapers" },
];

const chipClassName =
  "inline-flex items-center rounded-full border border-white/20 bg-white/[0.03] px-4 py-2 text-sm font-medium text-gray-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-colors";

export function HomeBrowseByStyle() {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const applyFilterAndGo = (entry: StyleEntry) => {
    if (entry.type === "route") return;

    dispatch(resetFilters());
    if (entry.type === "tag") {
      dispatch(toggleTag(entry.tag));
    } else {
      dispatch(setSearch(entry.query));
    }
    navigate(entry.to);
  };

  return (
    <section className="pt-4 pb-2">
      <h2 className="text-gray-50 text-2xl font-bold leading-tight tracking-tight pb-3">
        Browse by Style
      </h2>
      <div
        className="flex flex-wrap gap-2"
        role="list"
        aria-label="Browse by style"
      >
        {STYLES.map((entry) =>
          entry.type === "route" ? (
            <Link
              key={entry.label}
              to={entry.to}
              className={chipClassName}
              role="listitem"
            >
              {entry.label}
            </Link>
          ) : (
            <button
              key={entry.label}
              type="button"
              className={chipClassName}
              role="listitem"
              onClick={() => applyFilterAndGo(entry)}
            >
              {entry.label}
            </button>
          )
        )}
      </div>
    </section>
  );
}
