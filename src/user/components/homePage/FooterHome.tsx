import { Link } from "react-router-dom";

export const FooterHomePage = () => {
  return (
    <footer className="flex flex-col gap-6 px-5 py-10 text-center border-t border-gray-800 bg-black">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <Link
          to="/about"
          className="text-gray-400 text-sm font-normal leading-normal hover:text-gray-100 transition-colors"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-gray-400 text-sm font-normal leading-normal hover:text-gray-100 transition-colors"
        >
          Contact
        </Link>

        <a
          className="text-gray-400 text-sm font-normal leading-normal hover:text-gray-100 transition-colors"
          href="#"
        >
          FAQ
        </a>
        <a
          className="text-gray-400 text-sm font-normal leading-normal hover:text-gray-100 transition-colors"
          href="#"
        >
          Terms of Service
        </a>

        <Link
          to="/privacy"
          className="text-gray-400 text-sm font-normal leading-normal hover:text-gray-100 transition-colors"
        >
          Privacy Policy
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-200 transition-colors"
          href="https://t.me/shuffledstock"
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 448 512"
          >
            <path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z" />
          </svg>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-200 transition-colors"
          href="https://www.instagram.com/shuffledstock"
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
      </div>
      <p className="text-gray-400 text-sm font-normal leading-normal">
        © 2024 ShuffledStock. All rights reserved.
      </p>
    </footer>
  );
};
