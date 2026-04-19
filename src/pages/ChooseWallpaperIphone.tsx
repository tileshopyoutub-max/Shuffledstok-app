const ChooseWallpaperIphone = () => {
  return (
    <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <header className="mb-16">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-slate-100 mb-8">
          How to Choose Wallpaper for iPhone
        </h1>
        <img
          src="/images/how-to-choose-wallpaper-cover.png"
          className="w-full rounded-xl mb-10 object-cover"
          alt="How to choose wallpaper cover"
        />

        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          You set a new wallpaper, it looks perfect… and a few days later you already want to change it.
          Icons become harder to see, the screen feels cluttered, and instead of a clean iPhone look,
          everything starts to feel visually noisy.
        </p>

        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          The frustrating part is that nothing seems obviously wrong. The image itself looks good.
          The problem is usually not the wallpaper — it’s how it was chosen.
        </p>

        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          In this guide, you’ll learn how to choose a wallpaper that actually works — not just looks good for a moment.
        </p>
      </header>

      <div className="mt-20">
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          Choosing the right wallpaper for your iPhone is not just about aesthetics — it directly affects how comfortable your device is to use every day. A good wallpaper should look great while keeping icons, widgets, and text easy to read.
        </p>
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          One of the most important factors is contrast. If your wallpaper is too bright or too detailed, app icons and notifications can become hard to see. Clean compositions and softer gradients usually work better for daily use.
        </p>
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          Another key detail is how the wallpaper interacts with the iOS interface. Elements like the clock, lock screen widgets, and app grid should remain clearly visible without blending into the background.
        </p>
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          It’s also useful to think about mood. Dark wallpapers feel more premium and are easier on the eyes at night, while lighter and pastel styles can make your phone feel fresh, soft, and minimal.
        </p>
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          In this guide, you’ll find examples and ideas that help you choose wallpapers not only based on style, but also on usability, clarity, and overall visual balance.
        </p>

      <div className="flex justify-center my-12">
        <img
          src="/images/iphone-wallpaper-preview.png"
          className="max-w-[420px] w-full h-auto rounded-xl shadow-xl"
          alt="Wallpaper example for iPhone"
        />
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-slate-100 mb-4">
          Match Your Screen Resolution
        </h2>
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          One of the most common mistakes is using random images from the internet. They may look fine at first glance,
          but once you set them as wallpaper, you’ll notice blur, stretching, and loss of sharpness.
        </p>
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          Always choose wallpapers designed for iPhone resolution. This keeps the image sharp and makes the screen feel cleaner.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-slate-100 mb-4">
          Avoid Visual Clutter
        </h2>
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          Highly detailed wallpapers often look impressive at first, but in everyday use they become distracting.
          Icons get lost, your eyes don’t know where to focus, and the whole screen feels messy.
        </p>
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          Minimal designs with one clear subject usually work much better.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-slate-100 mb-4">
          Use Contrast Wisely
        </h2>
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          If you can’t quickly read your clock, notifications, or app names, your wallpaper is working against you.
        </p>
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          Softer gradients and darker areas behind text make the screen easier to use.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-slate-100 mb-4">
          Take Advantage of OLED
        </h2>
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          OLED displays make blacks look deeper because black pixels are actually turned off.
          That gives dark wallpapers a more premium feel and can even save a little battery.
        </p>
      </section>

      <div className="flex justify-center my-12">
        <img
          src="/images/oled-dark-wallpaper.png"
          className="max-w-[420px] w-full h-auto rounded-xl shadow-xl"
          alt="Dark wallpaper example for iPhone"
        />
      </div>

      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-slate-100 mb-4">
          Choose Based on Feel
        </h2>
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          Light wallpapers feel calm, dark ones feel focused, and bright ones feel energetic.
          If you still enjoy your wallpaper after a few days, that usually means you chose well.
        </p>
      </section>

      <section className="bg-gradient-to-br from-[#0b1626]/90 to-[#0f1e33]/85 rounded-2xl border border-cyan-900/30 p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-slate-100 mb-4">
          Final Thoughts
        </h2>
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          A good wallpaper is not just about aesthetics — it’s also about comfort and usability.
          When everything works together, your phone feels cleaner and more enjoyable to use.
        </p>
      </section>
      </div>
    </main>
  );
};

export default ChooseWallpaperIphone;
