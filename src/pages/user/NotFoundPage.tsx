import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="font-display flex-grow flex items-center justify-center px-6 py-24 bg-black min-h-[50vh]">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-3">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider">
            404
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Page not found
          </h1>
          <p className="text-lg text-white/60 font-light leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 transition-colors"
          >
            Go home
          </Link>
          <Link
            to="/stickers"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] hover:border-primary/50 hover:text-primary text-gray-200 font-medium px-6 py-3 transition-colors"
          >
            Browse stickers
          </Link>
          <Link
            to="/wallpapers"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] hover:border-primary/50 hover:text-primary text-gray-200 font-medium px-6 py-3 transition-colors"
          >
            Browse wallpapers
          </Link>
        </div>
      </div>
    </div>
  );
}
