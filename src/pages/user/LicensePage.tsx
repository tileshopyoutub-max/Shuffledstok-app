import { Link } from "react-router-dom";

export default function LicensePage() {
  return (
    <>
      <div className="font-display flex-1 flex justify-center py-20 px-6 bg-black">
        <div className="max-w-[800px] w-full">
          <div className="mb-16">
            <h1 className="text-6xl text-white mb-4 tracking-tighter font-bold">
              License
            </h1>
            <div className="flex items-center gap-4 text-primary font-medium">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">
                  gavel
                </span>
                ShuffledStock digital assets
              </span>
            </div>
          </div>

          <section className="text-white space-y-16">
            <div>
              <p className="text-lg text-white/90 leading-relaxed">
                ShuffledStock offers digital assets such as wallpapers, stickers,
                icons, and creative packs. By downloading or using any asset from
                this site, you agree to the terms below.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                Free assets
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                Free assets are allowed for personal use, social media posts,
                phone customization, moodboards, and personal Canva projects.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                Commercial or restricted use
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                For commercial projects, resale, or any use beyond personal
                creative projects, contact us before downloading or publishing.
                We will confirm what is permitted for the specific asset.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                Allowed uses
              </h2>
              <ul className="text-lg text-white/90 leading-relaxed space-y-3 list-disc list-inside">
                <li>Personal social media posts</li>
                <li>Phone wallpapers and home screen customization</li>
                <li>Digital notes and planners</li>
                <li>Personal Canva projects</li>
                <li>
                  Instagram highlight covers and profile organization for personal
                  branding
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                Not allowed
              </h2>
              <ul className="text-lg text-white/90 leading-relaxed space-y-3 list-disc list-inside">
                <li>Reselling or sublicensing the original files</li>
                <li>Redistributing or re-uploading original files</li>
                <li>Claiming assets as your own work</li>
                <li>
                  Uploading to other asset libraries, stock sites, or marketplaces
                </li>
                <li>
                  Use in illegal, harmful, or misleading content
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                Questions
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                If you are unsure whether your use is allowed,{" "}
                <Link
                  to="/contact"
                  className="text-primary hover:underline font-medium"
                >
                  contact us
                </Link>{" "}
                before publishing or distributing the asset.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
