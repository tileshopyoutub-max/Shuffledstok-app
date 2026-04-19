import { Link } from "react-router-dom";

const BestWallpapers2026 = () => {
  return (
    <main className="pt-32 pb-24 px-6 md:px-8 max-w-5xl mx-auto">
      <header className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 bg-gray-900/30 border border-gray-800 rounded-full text-xs font-bold text-secondary uppercase tracking-widest">
            Editorial
          </span>
          <span className="text-on-surface-variant text-sm">March 12, 2026</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface mb-8 leading-[1.1]">
          Best Wallpapers for Phone (2026)
        </h1>
        <img
          src="/images/best-wallpapers-2026-cover.png"
          className="w-full rounded-xl mb-10 object-cover"
          alt="Best wallpapers for phone 2026 cover"
        />
        <p className="text-xl text-on-surface-variant leading-relaxed max-w-3xl mt-4">
          Most people underestimate how much a wallpaper can change the feeling of
          their phone.
        </p>
        <p className="text-xl text-on-surface-variant leading-relaxed max-w-3xl">
          As mobile hardware pushes the boundaries of OLED peak brightness and
          spatial depth, the wallpapers of 2026 are more than static images—they
          are immersive windows into digital artistry. This year, we see a shift
          toward &quot;Kinetic Minimalism&quot; and &quot;Obsidian Textures&quot;
          that respect battery longevity while maximizing visual impact.
        </p>
      </header>

      <article className="space-y-24">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold tracking-tighter text-on-surface mb-4">
              Minimal Wallpapers
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Minimalism in 2026 is defined by subtle geometric shadows and
              monochromatic gradients. These designs are crafted to clear the
              mental clutter, providing a serene backdrop that lets your app icons
              breathe.
            </p>
            <div className="flex items-center gap-2 text-secondary font-bold mb-8">
              <span>Explore Collection</span>
              <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">
                arrow_forward
              </span>
            </div>
          </div>
          <div className="order-1 md:order-2 perspective-container my-6">
            <div className="aspect-[9/16] bg-surface-container-low rounded-xl overflow-hidden border border-gray-800/80 tilt-card shadow-2xl">
              <img
                alt="minimal aesthetic wallpaper for phone"
                className="w-full h-full object-cover"
                data-alt="high quality professional minimalist architectural wallpaper clean white geometric lines soft natural lighting premium editorial style"
                src="/images/wallpaper-1.png"
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="perspective-container my-6">
            <div className="aspect-[9/16] bg-surface-container-low rounded-xl overflow-hidden border border-cyan-400/20 tilt-card shadow-2xl neon-glow">
              <img
                alt="dark wallpaper for phone OLED screen"
                className="w-full h-full object-cover"
                data-alt="high contrast dark oled optimized wallpaper deep obsidian black background subtle glowing neon cyan geometric accents professional tech aesthetic"
                src="/images/wallpaper-2.png"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter text-on-surface mb-4">
              Dark Wallpapers
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Designed specifically for the latest generation of Obsidian OLED
              panels. These wallpapers utilize true-black pixels to conserve
              battery while featuring high-contrast neon accents that appear to
              float above the glass.
            </p>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary-container/30 border border-tertiary/20 rounded-lg text-tertiary text-xs font-bold uppercase tracking-tighter">
              <span className="material-symbols-outlined text-sm" data-icon="bolt">
                bolt
              </span>
              OLED Optimized
            </span>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold tracking-tighter text-on-surface mb-4">
              Aesthetic Wallpapers
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              The &quot;Soft-Focus&quot; trend returns with pastel grain and
              ethereal lighting. These assets create a dreamlike atmosphere,
              perfect for those seeking a more emotional and textured connection
              with their device.
            </p>
          </div>
          <div className="order-1 md:order-2 perspective-container my-6">
            <div className="aspect-[9/16] bg-surface-container-low rounded-xl overflow-hidden border border-gray-800/80 tilt-card shadow-xl">
              <img
                alt="aesthetic pastel wallpaper for phone"
                className="w-full h-full object-cover"
                data-alt="professional aesthetic wallpaper soft atmospheric pastel gradients dreamy artistic blur ethereal lighting high quality editorial feel"
                src="/images/wallpaper-3.png"
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="perspective-container my-6">
            <div className="aspect-[9/16] bg-surface-container-low rounded-xl overflow-hidden border border-gray-800/80 tilt-card shadow-xl">
              <img
                alt="cute phone wallpaper design"
                className="w-full h-full object-cover"
                data-alt="charming high-fidelity 3d character illustration soft playful environment cozy-core aesthetic warm lighting professional character design"
                src="/images/wallpaper-4.png"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter text-on-surface mb-4">
              Cute Wallpapers
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              3D character design has matured. 2026&apos;s &quot;Cute&quot;
              wallpapers feature high-fidelity claymorphism and expressive
              avatars that bring a sense of personality and joy to the lock
              screen.
            </p>
          </div>
        </section>

        <section className="max-w-2xl">
          <div className="bg-gradient-to-br from-[#0b1626]/90 to-[#0f1e33]/85 rounded-xl border border-cyan-900/30 p-5 md:p-6 shadow-[0_0_0_1px_rgba(34,211,238,0.06)]">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight text-slate-100 mb-3">
              Want to choose the perfect wallpaper for your phone?
            </h2>
            <p className="text-slate-300/85 text-sm leading-relaxed mb-4">
              Read our full guide on how to pick a wallpaper that looks good and
              feels right in everyday use.
            </p>
            <Link
              to="/blog/how-to-choose-wallpaper-for-iphone"
              className="inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:text-cyan-300 transition-colors"
            >
              Read the guide →
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
};

export default BestWallpapers2026;
