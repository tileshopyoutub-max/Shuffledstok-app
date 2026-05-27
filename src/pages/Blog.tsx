import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 text-on-surface">
      <section className="mb-20 text-center md:text-left">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-50 mb-4">
          Blog
        </h1>
        <p className="text-xl md:text-2xl text-secondary font-medium tracking-tight mb-6">
          Guides, ideas, and inspiration for wallpapers and digital aesthetics.
        </p>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed text-lg">
          Explore the intersection of digital lifestyle and high-end design. Our
          curators bring you the latest trends in interface personalization,
          high-res visual assets, and the psychology of aesthetic workspaces.
        </p>
      </section>

      <section className="mb-24">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl font-bold tracking-tighter text-gray-50">
            Featured Guides
          </h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-gray-800 to-transparent"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-container">
          <article className="group bg-surface-container-low rounded-xl overflow-hidden border border-gray-800/80 transition-all duration-500 hover:-translate-y-2 hover:rotate-1 neon-glow">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                data-alt="Futuristic glowing neon cityscape wallpaper on a modern smartphone screen held by a hand in a dark room"
                src="/images/best-wallpapers-2026-cover.png"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-primary/20 text-primary rounded-full">
                  Guide
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-50 mb-3 group-hover:text-secondary transition-colors">
                Best Wallpapers for Phone (2026)
              </h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-6">
                Stay ahead of the trend with our curated selection of
                high-fidelity, OLED-optimized visuals for next-gen devices.
              </p>
              <Link
                to="/blog/best-wallpapers-2026"
                className="flex items-center text-secondary font-bold text-sm group/btn"
              >
                Read more{" "}
                <span className="material-symbols-outlined ml-1 text-lg group-hover/btn:translate-x-1 transition-transform">
                  arrow_right_alt
                </span>
              </Link>
            </div>
          </article>

          <article className="group bg-surface-container-low rounded-xl overflow-hidden border border-gray-800/80 transition-all duration-500 hover:-translate-y-2 hover:-rotate-1 neon-glow">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                data-alt="A collection of elegant minimalist aesthetic instagram highlight icons in muted pastel tones on a sleek phone interface"
                src="/images/minimal-instagram-icons-cover.png"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-tertiary/20 text-tertiary rounded-full">
                  Tutorial
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-50 mb-3 group-hover:text-secondary transition-colors">
                How to Use Instagram Highlight Icons
              </h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-6">
                A step-by-step guide to organizing your social media profile
                with professional, branded visual cues.
              </p>
              <Link
                to="/blog/how-to-use-instagram-highlight-icons"
                className="flex items-center text-secondary font-bold text-sm group/btn"
              >
                Read more{" "}
                <span className="material-symbols-outlined ml-1 text-lg group-hover/btn:translate-x-1 transition-transform">
                  arrow_right_alt
                </span>
              </Link>
            </div>
          </article>

          <article className="group bg-surface-container-low rounded-xl overflow-hidden border border-gray-800/80 transition-all duration-500 hover:-translate-y-2 hover:rotate-1 neon-glow">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                data-alt="Close up of an iPhone screen displaying a sophisticated deep obsidian abstract wallpaper with soft light rays"
                src="/images/how-to-choose-wallpaper-cover.png"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-primary/20 text-primary rounded-full">
                  Guide
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-50 mb-3 group-hover:text-secondary transition-colors">
                How to Choose Wallpaper for iPhone
              </h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-6">
                A practical guide to choosing wallpapers that actually improve
                your iPhone experience
              </p>
              <Link
                to="/blog/how-to-choose-wallpaper-for-iphone"
                className="flex items-center text-secondary font-bold text-sm group/btn"
              >
                Read more{" "}
                <span className="material-symbols-outlined ml-1 text-lg group-hover/btn:translate-x-1 transition-transform">
                  arrow_right_alt
                </span>
              </Link>
            </div>
          </article>

          <article className="group bg-surface-container-low rounded-xl overflow-hidden border border-gray-800/80 transition-all duration-500 hover:-translate-y-2 hover:-rotate-1 neon-glow">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                data-alt="A clean and aesthetic iPhone home screen layout with minimalist widgets and coordinated app icons"
                src="/images/01-cover-iphone-home-screen.jpg"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-tertiary/20 text-tertiary rounded-full">
                  Guide
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-50 mb-3 group-hover:text-secondary transition-colors">
                How to Create an Aesthetic iPhone Home Screen
              </h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-6">
                Step-by-step guide to creating a clean and aesthetic iPhone home
                screen.
              </p>
              <Link
                to="/blog/create-aesthetic-iphone-home-screen"
                className="flex items-center text-secondary font-bold text-sm group/btn"
              >
                Read more{" "}
                <span className="material-symbols-outlined ml-1 text-lg group-hover/btn:translate-x-1 transition-transform">
                  arrow_right_alt
                </span>
              </Link>
            </div>
          </article>

          <article className="group bg-surface-container-low rounded-xl overflow-hidden border border-gray-800/80 transition-all duration-500 hover:-translate-y-2 hover:rotate-1 neon-glow">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                data-alt="Aesthetic iPhone home screen ideas featuring minimal, dark, and clean widget layouts"
                src="/images/cover-aesthetic-home-screen.jpg"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-primary/20 text-primary rounded-full">
                  Guide
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-50 mb-3 group-hover:text-secondary transition-colors">
                Best Aesthetic iPhone Home Screen Ideas
              </h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-6">
                Explore the best aesthetic iPhone home screen ideas including
                minimal, dark, and clean layouts.
              </p>
              <Link
                to="/blog/create-aesthetic-iphone-home-screen"
                className="flex items-center text-secondary font-bold text-sm group/btn"
              >
                Read more{" "}
                <span className="material-symbols-outlined ml-1 text-lg group-hover/btn:translate-x-1 transition-transform">
                  arrow_right_alt
                </span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="mb-24">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl font-bold tracking-tighter text-gray-50">
            Collections &amp; Inspiration
          </h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-gray-800 to-transparent"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex gap-4 p-4 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant transition-colors group">
            <img
              className="w-24 h-24 rounded-lg object-cover"
              data-alt="Collage of cute anime-style pastel wallpapers with soft cloud textures and dreamy lighting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSJYTJlKrfL-zk4PIr7s_perj4LjKTXlw6KMhqbuYiFKQddwNeTArpszRI1S5en3GcVWfuJfrc9SHtktvsIYbKVYqNjsGoIxHYT8GtuvCddgw2iJjWqGE62YDl8wurBpCirS7FdMeLXsShRKJsd-ODqyATJNCwFpGGfpS2rj3SHZlcQEOHqYI0EskghwkdAgeTBlnY12SUndEv2_k4xZfuYH8AQDmJj_lDmB16otj8pYwM6PPtLS3u36xUCOFpcBHg5fOU76WuExif"
            />
            <div className="flex flex-col justify-center">
              <h4 className="font-bold text-gray-50 mb-1 group-hover:text-secondary transition-colors">
                Cute Wallpapers Collection
              </h4>
              <p className="text-xs text-on-surface-variant mb-2">
                Soft palettes for a gentle interface vibe.
              </p>
              <Link className="text-xs font-bold text-secondary uppercase tracking-wider" to="/blog/cute-wallpapers">
                Read more
              </Link>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant transition-colors group">
            <img
              className="w-24 h-24 rounded-lg object-cover"
              data-alt="A grid of minimalist black and white social media icons on a sleek dark surface"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY1c6LbsuhCG8lCk3I6k5nK6HYL7SSefPSF--GyLV_1pyTKeOVYxlKhCBmygJ1Kn04Zvvo33R7Ksz_FmKMdOnSLtBNqIGNyk5mljcYN0Oh6avoz4PnOOsjaJphKCBwXN40hyH8bHrB0PpUZ6WppHaFZwbRmHO84T3n5sLc9BWqpv6fSfX9T6bfU7hVlX3AZayPRA79huWJ-P2PvprDJB912DvIDOlXPyKQt7WU5zG1d770fIrAAjfsCbbRpH-sxltJI10VO6z9ci2y"
            />
            <div className="flex flex-col justify-center">
              <h4 className="font-bold text-gray-50 mb-1 group-hover:text-secondary transition-colors">
                Minimal Instagram Icons
              </h4>
              <p className="text-xs text-on-surface-variant mb-2">
                Stripping back to basics for a clean look.
              </p>
              <Link
                className="text-xs font-bold text-secondary uppercase tracking-wider"
                to="/blog/minimal-instagram-icons"
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-24 bg-surface-container-low rounded-3xl p-10 md:p-16 border border-gray-800/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-secondary/10 blur-[100px] rounded-full"></div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-3xl font-black tracking-tighter text-gray-50 mb-6">
            Why aesthetics matter
          </h2>
          <div className="space-y-4 text-on-surface-variant leading-relaxed">
            <p>
              In a world where we spend over eight hours a day interacting with
              digital surfaces, the "environment" we inhabit matters as much as
              the physical room around us. Digital aesthetics are not merely
              about decoration; they are about **personalization and mood**.
            </p>
            <p>
              A well-chosen wallpaper or a cohesive icon set reduces cognitive
              friction. It creates a sense of order and ownership over a tool
              that is often cluttered with notifications and data. When your
              digital space reflects your personality, it transforms from a
              generic screen into an extension of your creative self.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center py-20 bg-gradient-to-b from-transparent to-surface-container-lowest">
        <h2 className="text-4xl font-black tracking-tighter text-gray-50 mb-4">
          Explore more wallpapers and digital content
        </h2>
        <p className="text-on-surface-variant mb-10 max-w-xl mx-auto">
          Access our entire library of high-end visual assets, updated weekly
          by our global team of curators.
        </p>
        <button className="bg-secondary text-on-secondary-fixed font-black px-10 py-4 rounded-full flex items-center mx-auto hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,211,238,0.3)] group">
          Go to wallpapers{" "}
          <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </section>
    </main>
  );
};

export default Blog;
