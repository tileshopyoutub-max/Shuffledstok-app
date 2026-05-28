export default function PrivacyPolicyPage() {
  return (
    <>
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
                Last updated: May 28, 2026
              </span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span className="text-white/40">ShuffledStock.com</span>
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
                2. How We Use Information
              </h2>
              <div className="text-body text-lg space-y-4">
                <p>
                  We use collected information to operate ShuffledStock, improve
                  our asset library, respond to support requests, prevent abuse,
                  and understand which pages and categories are most useful. We
                  do not sell your personal information.
                </p>
                <p>
                  Download history and access records for digital products may
                  be stored to enforce license terms, prevent fraud, and
                  provide customer support.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                3. Cookies and Tracking Technologies
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
                4. Analytics (Google Analytics)
              </h2>
              <div className="text-body text-lg space-y-4">
                <p>
                  We use Google Analytics (Google tag / gtag.js) to measure site
                  traffic, page views, and general usage patterns. Google may
                  collect device and browser information, approximate location,
                  and interaction data through cookies or similar technologies.
                </p>
                <p>
                  You can learn how Google uses data at{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google&apos;s Privacy Policy
                  </a>
                  . You may install the{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                  .
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                5. Google AdSense and Third-Party Advertising
              </h2>
              <div className="text-body text-lg space-y-4">
                <p>
                  We use Google AdSense and may work with other ad partners to
                  display advertisements on ShuffledStock. These partners may use
                  cookies and similar technologies to show ads based on your
                  visits to this site and other websites.
                </p>
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 space-y-3">
                  <p className="text-sm">
                    You can manage personalized advertising through Google&apos;s
                    Ad Settings:{" "}
                    <a
                      href="https://adssettings.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      adssettings.google.com
                    </a>
                  </p>
                  <p className="text-sm">
                    Learn more about how Google uses data for ads:{" "}
                    <a
                      href="https://policies.google.com/technologies/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Advertising Policies
                    </a>
                  </p>
                  <p className="text-sm italic">
                    Third-party vendors, including Google, use cookies to serve
                    ads based on a user&apos;s prior visits to your website or
                    other websites.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                6. Third-Party Services
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
                  ShuffledStock does not collect payment card information. Free
                  downloads do not require payment on this site.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                7. Digital Products
              </h2>
              <div className="text-body text-lg space-y-4">
                <p>
                  When you download digital products (wallpapers, stickers, and
                  related assets), we may record download activity to manage your
                  access rights and provide customer support. These records are
                  kept strictly confidential and are used only for
                  administrative and licensing purposes.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-primary pl-6">
                8. Data Security
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
                9. Children’s Information
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
                10. User Consent
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
                11. Changes to This Privacy Policy
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
                12. Contact Information
              </h2>
              <p className="text-body text-lg mb-8">
                If you have any questions or concerns regarding this Privacy
                Policy, please reach out to our legal team. We aim to respond to
                all inquiries within 48 business hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:shuffledstock.com@outlook.com"
                  className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform"
                >
                  shuffledstock.com@outlook.com
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

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
