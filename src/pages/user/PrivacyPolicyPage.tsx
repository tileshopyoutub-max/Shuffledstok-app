import { Link } from "react-router-dom";

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* HEADER */}

      <header className="font-display sticky top-0 z-50 w-full bg-background-dark/80 backdrop-blur-md border-b border-white/10 bg-black">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-1 rounded">
              <svg
                className="size-6 text-white"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <span className="text-white text-xl font-bold tracking-tight uppercase">
              ShuffledStock
            </span>
          </div>

          <nav className="text-white  hidden md:flex items-center gap-8">
            <Link
              to="/wallpapers"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Wallpapers
            </Link>

            <a
              className="text-sm font-medium hover:text-primary transition-colors"
              href="#"
            >
              Icons
            </a>

            <Link
              to="/stickers"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Stickers
            </Link>

            <button className="bg-white text-black text-sm font-bold px-6 py-2 rounded-full hover:bg-white/90 transition-all">
              Get Started
            </button>

            <div
              className="size-10 rounded-full border border-white/20 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3quw5z7V3qAIhweoFR4vXf2Suq3Xw3WXX_1mIaqn2z3gWIzdL-y_Q4EsTFf_skcc9LQSOVVZIwr56QpNpLl6Af4f-n9RvJ5V2lf3H8fAutx8_SFmqeZzEYh8c-W-51q6RTyH4Bvk5-CHbrH96XWg04zEJw0dDc8xWpWNiHFX5-acwZL7f-M6IOfsKdQMrqxGkWtH0yjzhuXJKSoGBYAfGv682Cd2cAGr_KcbAkE9yRrrRSWJnKQyQ5URrivNfEXnAT5I1fgydlKtM')",
              }}
            />
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <div className="font-display flex-1 flex justify-center py-20 px-6 bg-black">
        <div className="max-w-[800px] w-full">
          <div className="mb-16">
            <h1 className="text-6xl text-white mb-4 tracking-tighter font-bold">
              Privacy Policy
            </h1>
            <div className="flex items-center gap-4 text-primary font-medium">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">
                  history
                </span>
                Last updated: June 15, 2024
              </span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span className="text-white/40">Version 3.0.0</span>
            </div>
          </div>
          <section className="text-white space-y-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                1. Information We Collect
              </h2>
              <div className="text-body text-white text-lg space-y-6">
                <p>
                  We collect personal information that you voluntarily provide
                  to us when you register on our website, express interest in
                  obtaining information about us or our products and services,
                  or when you contact us.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">
                        person
                      </span>
                      Personal Data
                    </h3>
                    <p className="text-sm opacity-80">
                      This includes your email address, username, and name
                      provided during registration.
                    </p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">
                        analytics
                      </span>
                      Usage Data
                    </h3>
                    <p className="text-sm opacity-80">
                      We automatically collect information about how you
                      interact with our digital assets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                2. Cookies and Tracking Technologies
              </h2>
              <div className="text-body text-lg space-y-4">
                <p>
                  We use cookies and similar tracking technologies to access or
                  store information. These technologies help us understand how
                  our platform is being used, remember your preferences (such as
                  dark mode settings), and provide a more personalized
                  experience.
                </p>
                <p>
                  You can instruct your browser to refuse all cookies or to
                  indicate when a cookie is being sent. However, if you do not
                  accept cookies, you may not be able to use some portions of
                  our Service.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                3. Google AdSense and Third-Party Advertising
              </h2>
              <div className="text-body text-lg space-y-4">
                <p>
                  We may use Google AdSense and other third-party advertising
                  companies to serve ads when you visit our website. These
                  companies may use information about your visits to this and
                  other websites in order to provide advertisements about goods
                  and services of interest to you.
                </p>
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                  <p className="text-sm italic">
                    Google's use of the DART cookie enables it to serve ads to
                    our users based on their visit to our site and other sites
                    on the Internet. Users may opt out of the use of the DART
                    cookie by visiting the Google Ad and Content Network privacy
                    policy.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                4. Third-Party Services
              </h2>
              <div className="text-body text-lg space-y-4">
                <p>
                  Our service may contain links to other websites that are not
                  operated by us. We strongly advise you to review the Privacy
                  Policy of every site you visit. We have no control over and
                  assume no responsibility for the content, privacy policies, or
                  practices of any third-party services or sites.
                </p>
                <p>
                  Payment processing for premium assets is handled via secure
                  third-party gateways. ShuffledStock does not store your
                  financial information on our servers.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                5. Digital Products
              </h2>
              <div className="text-body text-lg space-y-4">
                <p>
                  When you download or purchase digital products (wallpapers,
                  icons, stickers), we record these transactions to manage your
                  access rights and provide customer support. These records are
                  kept strictly confidential and are used only for
                  administrative and licensing purposes.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                6. Data Security
              </h2>
              <div className="text-body text-lg space-y-4">
                <p>
                  The security of your data is important to us, but remember
                  that no method of transmission over the Internet, or method of
                  electronic storage is 100% secure. While we strive to use
                  commercially acceptable means to protect your Personal Data,
                  we cannot guarantee its absolute security.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                7. Children’s Information
              </h2>
              <div className="text-body text-lg space-y-4">
                <p>
                  Our services are not intended for use by children under the
                  age of 13. We do not knowingly collect personally identifiable
                  information from children under 13. If you become aware that a
                  child has provided us with personal data, please contact us so
                  we can take appropriate action.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                8. User Consent
              </h2>
              <div className="text-body text-lg space-y-4">
                <p>
                  By using ShuffledStock, you hereby consent to our Privacy
                  Policy and agree to its Terms and Conditions. If you do not
                  agree with our policies and practices, your choice is not to
                  use our Website.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                9. Changes to This Privacy Policy
              </h2>
              <div className="text-body text-lg space-y-4">
                <p>
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date at the top of
                  this document. You are advised to review this Privacy Policy
                  periodically for any changes.
                </p>
              </div>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-10 mt-10">
              <h2 className="text-3xl font-bold mb-4 text-white">
                10. Contact Information
              </h2>
              <p className="text-body text-lg mb-8">
                If you have any questions or concerns regarding this Privacy
                Policy, please reach out to our legal team. We aim to respond to
                all inquiries within 48 business hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform"
                  href="mailto:privacy@shuffledstock.com"
                >
                  <span className="material-symbols-outlined">mail</span>
                  privacy@shuffledstock.com
                </a>
                <button className="flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
                  <span className="material-symbols-outlined">
                    support_agent
                  </span>
                  Help Center
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="font-display  bg-black border-t border-white/5 py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/10 p-1 rounded">
                <svg
                  className="size-5 text-white"
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-white font-bold tracking-tight uppercase">
                ShuffledStock
              </span>
            </div>

            <p className="text-white/50 max-w-sm">
              Premium digital assets for the modern creator. High-quality
              wallpapers, custom icon sets, and curated stickers.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-white/50 text-sm">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Wallpapers
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Instagram Icons
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  iOS Stickers
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-white/50 text-sm">
              <li>
                <a className="text-white font-bold" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  License Agreement
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © 2024 ShuffledStock Media Group. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              className="text-white/30 hover:text-white transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">
                language
              </span>
            </a>
            <a
              className="text-white/30 hover:text-white transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">
                rss_feed
              </span>
            </a>
          </div>
        </div>
      </footer>

      <button
        className="fixed bottom-8 right-8 size-12 bg-white/10 hover:bg-primary backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center transition-all group"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <span className="material-symbols-outlined text-white transition-transform group-hover:-translate-y-1">
          arrow_upward
        </span>
      </button>
    </>
  );
}
