import { Link } from "react-router-dom";

const ASSET_TYPES = [
  {
    title: "Wallpapers",
    typeLabel: "Wallpaper",
    description: "Mobile & desktop backgrounds",
    to: "/wallpapers",
    badgeClass:
      "bg-gradient-to-br from-blue-500/25 to-cyan-400/15 text-blue-200/60 group-hover:from-blue-500/35 group-hover:to-cyan-400/25 group-hover:text-blue-100/75",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
        <rect
          x="5"
          y="3"
          width="14"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Stickers",
    typeLabel: "PNG",
    description: "Transparent sticker assets",
    to: "/stickers",
    badgeClass:
      "bg-gradient-to-br from-pink-500/25 to-orange-400/15 text-pink-200/60 group-hover:from-pink-500/35 group-hover:to-orange-400/25 group-hover:text-pink-100/75",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
        <path
          d="M8 4h8l4 4v12H8V4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M16 4v4h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Printable assets",
    typeLabel: "Print",
    description: "Print-friendly PNG ideas",
    to: "/stickers",
    badgeClass:
      "bg-gradient-to-br from-amber-400/30 to-yellow-300/15 text-amber-200/60 group-hover:from-amber-400/40 group-hover:to-yellow-300/25 group-hover:text-amber-100/75",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden="true">
        <path
          d="M7 4h10v4H7V4zm-2 6h14v8H5v-8zm4 2v4h6v-4H9z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
] as const;

function CardArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="size-4 shrink-0 text-gray-600 opacity-30 transition-all group-hover:translate-x-0.5 group-hover:text-gray-300 group-hover:opacity-90"
      aria-hidden="true"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeBrowseByAssetType() {
  return (
    <section className="pt-5 pb-3">
      <h2 className="text-gray-50 text-2xl font-bold leading-tight tracking-tight pb-3">
        Browse free assets
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {ASSET_TYPES.map((item) => (
          <Link
            key={item.title}
            to={item.to}
            className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-5 transition-colors hover:border-white/30 hover:bg-white/[0.04]"
          >
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors ${item.badgeClass}`}
            >
              {item.icon}
            </span>
            <span className="min-w-0 flex-1 flex flex-col gap-1.5">
              <span className="block text-[8px] uppercase tracking-wide text-gray-600/90 font-medium leading-none">
                {item.typeLabel}
              </span>
              <span className="block text-gray-50 text-base font-bold leading-tight tracking-tight">
                {item.title}
              </span>
              <span className="block text-gray-500/90 text-xs leading-snug line-clamp-2">
                {item.description}
              </span>
            </span>
            <CardArrow />
          </Link>
        ))}
      </div>
    </section>
  );
}
