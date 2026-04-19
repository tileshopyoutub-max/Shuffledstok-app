const CuteWallpapers = () => {
  return (
    <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <header className="mb-16">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface mb-8">
          Cute Wallpapers Collection
        </h1>

        <p className="text-xl text-on-surface-variant leading-relaxed max-w-3xl">
          Some wallpapers don’t just decorate your screen — they completely change how your phone feels. Cute wallpapers focus on softness, calm colors, and small details that make your device feel more personal and enjoyable to use every day.
        </p>

        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          In this collection, we focus on soft visuals, cozy moods, and simple styles that make everyday screen time feel lighter and more enjoyable.
        </p>
      </header>

      <div className="mt-10">
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          Cute wallpapers are popular because they make a phone feel softer and more personal without requiring a complex design. A simple pastel background, a small character, or a cozy visual theme can completely change the mood of your screen.
        </p>
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          The best cute wallpapers usually balance charm and clarity. If the design is too busy, icons and widgets become harder to read. That's why minimal compositions, soft gradients, and one clear subject often work better in everyday use.
        </p>
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          This style also works well across different devices and personal aesthetics. Some people prefer cute wallpapers that are playful and character-based, while others like a softer minimal look with hearts, clouds, or pastel abstract shapes.
        </p>
        <p className="text-on-surface-variant leading-relaxed mt-6 max-w-3xl">
          In this collection, the goal is not just to show pretty images, but to highlight the different ways cute wallpapers can feel calm, cozy, clean, and expressive at the same time.
        </p>

      <article className="space-y-24">
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-on-surface mb-4">
              Soft Pastel Style
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Light pastel wallpapers create a calm and relaxed feeling. They work especially well if you want your phone to feel soft, clean, and not too visually heavy.
            </p>
          </div>

          <img
            src="/images/cute-1.png"
            className="max-w-[420px] w-full h-auto rounded-xl shadow-xl mx-auto"
            alt="Soft pastel cute wallpaper"
          />
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="/images/cute-2.png"
            className="max-w-[420px] w-full h-auto rounded-xl shadow-xl mx-auto"
            alt="Cute character wallpaper"
          />

          <div>
            <h2 className="text-3xl font-bold text-on-surface mb-4">
              Cute Characters
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Character-based wallpapers add personality right away. A simple cute figure can make your phone feel warmer, more playful, and more memorable.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-on-surface mb-4">
              Cozy Aesthetic
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Cozy wallpapers usually combine soft tones, dreamy lighting, and comforting details. They are perfect when you want your screen to feel gentle rather than sharp or dramatic.
            </p>
          </div>

          <img
            src="/images/cute-3.png"
            className="max-w-[420px] w-full h-auto rounded-xl shadow-xl mx-auto"
            alt="Cozy aesthetic wallpaper"
          />
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="/images/cute-4.png"
            className="max-w-[420px] w-full h-auto rounded-xl shadow-xl mx-auto"
            alt="Minimal cute wallpaper"
          />

          <div>
            <h2 className="text-3xl font-bold text-on-surface mb-4">
              Minimal Cute
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Some of the best cute wallpapers are also the simplest. A clean composition with one soft subject often feels better in daily use than something overloaded with details.
            </p>
          </div>
        </section>
      </article>
      </div>
    </main>
  );
};

export default CuteWallpapers;
