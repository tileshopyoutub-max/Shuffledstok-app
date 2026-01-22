import { Link } from "react-router-dom";

export default function FooterInfo() {
  return (
    <footer className="font-display border-t border-white/5 py-12 bg-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-white/40 text-sm">
          © 2024 ShuffledStock Digital Media. All rights reserved.
        </div>

        <div className="flex gap-8">
          <Link
            to="/privacy"
            className="text-white/40 hover:text-primary transition-colors text-sm"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-white/40 hover:text-primary transition-colors text-sm"
          >
            Terms of Service
          </Link>
          <Link
            to="/license"
            className="text-white/40 hover:text-primary transition-colors text-sm"
          >
            License Info
          </Link>
        </div>

        <div className="flex gap-4">
          <a
            href="#"
            className="text-white w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all"
            aria-label="Instagram"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.75-2.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
            </svg>
          </a>

          <a
            href="#"
            className="text-white  w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all"
            aria-label="Telegram"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.087-.184-7.713-2.162-10.141-5.144-.424.722-.666 1.564-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
