import { Link } from "react-router-dom";

const CONTACT_EMAIL = "shuffledstock.com@outlook.com";

export default function AboutPage() {
  return (
    <div className="font-display flex-grow pt-40 pb-20 px-6 bg-black">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            About ShuffledStock
          </h1>
          <p className="text-lg text-white/60 font-light max-w-2xl mx-auto">
            A free digital assets library for creators, makers, and small brands.
          </p>
        </div>

        <article className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed space-y-6 font-light">
          <p>
            ShuffledStock is a curated library of free digital assets you can
            browse, preview, and download for personal creative projects. We
            focus on practical, high-quality files—not generic stock filler—so
            you can build phone layouts, social content, planners, and brand
            visuals faster.
          </p>

          <h2 className="text-2xl font-bold text-white !mt-10 !mb-3">
            What you can download today
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-white/80">
            <li>
              <Link to="/wallpapers" className="text-primary hover:underline">
                Wallpapers
              </Link>{" "}
              for lock screens and home screens (minimal, dark, aesthetic, and
              mood-based styles)
            </li>
            <li>
              <Link to="/stickers" className="text-primary hover:underline">
                Stickers
              </Link>{" "}
              for planners, collages, stories, and visual journals
            </li>
            <li>
              <Link to="/icons" className="text-primary hover:underline">
                Icons
              </Link>{" "}
              and icon packs, including Instagram highlight covers
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white !mt-10 !mb-3">
            Who we build for
          </h2>
          <p>
            Our library is made for creators, makers, small brands, planner
            enthusiasts, and anyone publishing social content who needs
            consistent visuals without starting from a blank canvas. Whether you
            customize an iPhone home screen, design a highlight row, or layer
            assets into Canva and journaling apps, ShuffledStock is meant to
            feel like a focused creative toolbox.
          </p>

          <h2 className="text-2xl font-bold text-white !mt-10 !mb-3">
            What&apos;s coming next
          </h2>
          <p>
            We are expanding toward printable assets, templates, and a future
            shop for premium packs. Free downloads will remain a core part of the
            site; paid products will always show clear license terms at
            checkout.
          </p>

          <h2 className="text-2xl font-bold text-white !mt-10 !mb-3">
            Licensing and trust
          </h2>
          <p>
            Every download is governed by our{" "}
            <Link to="/license" className="text-primary hover:underline">
              License
            </Link>
            . For privacy, analytics, and advertising disclosures, see our{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Use
            </Link>
            .
          </p>
        </article>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/70 mb-4">Questions, partnerships, or takedown requests?</p>
          <a
            className="text-xl md:text-2xl font-semibold text-primary hover:text-white transition-all duration-300 underline underline-offset-8"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
          <p className="mt-4">
            <Link to="/contact" className="text-primary hover:underline text-sm">
              Contact page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
