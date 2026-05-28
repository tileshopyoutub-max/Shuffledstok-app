import { Link } from "react-router-dom";

const CONTACT_EMAIL = "shuffledstock.com@outlook.com";

export default function TermsPage() {
  return (
    <div className="font-display flex-1 flex justify-center py-20 px-6 bg-black">
      <div className="max-w-[800px] w-full">
        <div className="mb-16">
          <h1 className="text-6xl text-white mb-4 tracking-tighter font-bold">
            Terms of Use
          </h1>
          <p className="text-primary font-medium">Last updated: May 28, 2026</p>
        </div>

        <section className="text-white space-y-12">
          <div>
            <p className="text-lg text-white/90 leading-relaxed">
              These Terms of Use govern your access to ShuffledStock
              (shuffledstock.com) and your use of our free digital asset
              library. By using this website, you agree to these terms and to
              our{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-white border-l-4 border-primary pl-6">
              Use of digital assets
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Wallpapers, stickers, icons, and other downloads are provided
              subject to our{" "}
              <Link to="/license" className="text-primary hover:underline">
                License
              </Link>
              . Free assets are for permitted personal and creative use unless
              stated otherwise at download. You may not resell, sublicense, or
              redistribute our files as standalone products.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-white border-l-4 border-primary pl-6">
              Acceptable use
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-lg text-white/90 leading-relaxed">
              <li>Do not upload malware, scrape the site abusively, or attempt to disrupt service.</li>
              <li>Do not misrepresent ownership of ShuffledStock assets.</li>
              <li>Do not use the site for unlawful, infringing, or harmful content.</li>
              <li>Respect takedown and licensing requests sent to our contact email.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-white border-l-4 border-primary pl-6">
              Accounts and purchases
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Some features may require sign-in or future paid products. You
              are responsible for keeping account credentials secure. Premium or
              shop purchases, when available, will include separate checkout
              terms shown at the time of purchase.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-white border-l-4 border-primary pl-6">
              Advertising and third-party links
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              The site may display third-party ads (including Google AdSense)
              and link to external services. We are not responsible for
              third-party content, policies, or practices. See our Privacy
              Policy for how cookies and analytics are used.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-white border-l-4 border-primary pl-6">
              Disclaimers
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              ShuffledStock is provided &quot;as is&quot; without warranties of
              any kind. We do not guarantee uninterrupted access or that every
              asset will meet a specific creative need. To the fullest extent
              permitted by law, we are not liable for indirect or consequential
              damages arising from use of the site or downloads.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-white border-l-4 border-primary pl-6">
              Changes
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              We may update these Terms of Use from time to time. Continued use
              of the site after changes are posted means you accept the updated
              terms.
            </p>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-10">
            <h2 className="text-3xl font-bold mb-4 text-white">Contact</h2>
            <p className="text-lg text-white/90 leading-relaxed mb-6">
              Questions about these terms, licensing, or content removal:
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mt-6">
              <Link to="/contact" className="text-primary hover:underline">
                Contact form
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
