import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "";

    setLoading(true);

    try {
      await emailjs.send(serviceId, templateId, payload, { publicKey });

      form.reset();

      setShowTooltip(true);

      setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* <Header /> */}
      <main className="font-display  bg-black pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-bold">
              Contact Support
            </span>

            <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight tracking-tight pt-2">
              Get in Touch
            </h1>
          </div>

          <div className="mt-12 bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white/60 tracking-wider uppercase ml-1">
                    Full Name
                  </label>
                  <input
                    className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:border-[#3b82f6] focus:shadow-[0_0_0_1px_#3b82f6] focus:outline-none"
                    placeholder="Enter your name"
                    type="text"
                    name="fullName"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white/60 tracking-wider uppercase ml-1">
                    Email Address
                  </label>
                  <input
                    className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:border-[#3b82f6] focus:shadow-[0_0_0_1px_#3b82f6] focus:outline-none"
                    placeholder="you@example.com"
                    type="email"
                    name="email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/60 tracking-wider uppercase ml-1">
                  Subject
                </label>
                <input
                  className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:border-[#3b82f6] focus:shadow-[0_0_0_1px_#3b82f6] focus:outline-none"
                  placeholder="What is this regarding?"
                  type="text"
                  name="subject"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/60 tracking-wider uppercase ml-1">
                  Message
                </label>
                <textarea
                  className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:border-[#3b82f6] focus:shadow-[0_0_0_1px_#3b82f6] focus:outline-none transition-all resize-none"
                  placeholder="Tell us how we can help..."
                  rows={5}
                  name="message"
                  required
                />
              </div>

              <div className="pt-4 flex justify-center md:justify-start">
                <button
                  className="transition-all duration-300 ease-[ease] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] group relative flex items-center justify-center gap-3 min-w-[200px] bg-primary text-black font-bold py-4 px-8 rounded-xl transition-all active:scale-[0.98]"
                  type="submit"
                  disabled={loading}
                >
                  <span className="uppercase tracking-widest text-sm">
                    {loading ? "Sending..." : "Send Message"}
                  </span>
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                    send
                  </span>
                </button>
              </div>
            </form>
          </div>

          <div className="text-white mt-20 flex flex-wrap justify-center gap-12 opacity-40">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                verified
              </span>
              <span className="text-sm">Verified Support</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                schedule
              </span>
              <span className="text-sm">24h Response Goal</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                security
              </span>
              <span className="text-sm">Encrypted Connection</span>
            </div>
          </div>
        </div>
      </main>
      {showTooltip && (
        <div className="fixed top-6 right-6 z-50 rounded-xl bg-black/90 border border-white/10 px-6 py-3 text-white shadow-lg">
          Message sent
        </div>
      )}
    </>
  );
}
