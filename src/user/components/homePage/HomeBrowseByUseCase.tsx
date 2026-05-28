import { Link } from "react-router-dom";

const USE_CASES = [
  {
    title: "iPhone wallpapers",
    description: "Lock screen and home screen aesthetics",
    to: "/wallpapers",
  },
  {
    title: "Instagram highlights",
    description: "Cover icons for story highlights",
    to: "/icons",
  },
  {
    title: "Story stickers",
    description: "Stickers for stories and reels",
    to: "/stickers",
  },
  {
    title: "Pinterest pins",
    description: "Visual inspiration and pin-ready art",
    to: "/wallpapers",
  },
  {
    title: "Canva projects",
    description: "Graphics for social and print layouts",
    to: "/stickers",
  },
  {
    title: "Profile branding",
    description: "Icons and covers for a cohesive profile",
    to: "/icons",
  },
] as const;

export function HomeBrowseByUseCase() {
  return (
    <section className="pt-6 pb-2">
      <h2 className="text-gray-50 text-2xl font-bold leading-tight tracking-tight pb-3">
        Browse by Use Case
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {USE_CASES.map((item) => (
          <Link
            key={item.title}
            to={item.to}
            className="group rounded-lg border border-white/10 bg-white/[0.03] p-4 hover:border-primary/40 hover:bg-white/[0.06] transition-colors"
          >
            <p className="text-white text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
              {item.title}
            </p>
            <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
