
export const FooterHomePage = () => {
  return (
    <footer className="flex flex-col gap-6 px-5 py-10 text-center border-t border-gray-800 bg-black">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <a className="text-gray-400 text-sm font-normal leading-normal hover:text-gray-100 transition-colors" href="#">
          About
        </a>
        <a className="text-gray-400 text-sm font-normal leading-normal hover:text-gray-100 transition-colors" href="#">
          Contact
        </a>
        <a className="text-gray-400 text-sm font-normal leading-normal hover:text-gray-100 transition-colors" href="#">
          FAQ
        </a>
        <a className="text-gray-400 text-sm font-normal leading-normal hover:text-gray-100 transition-colors" href="#">
          Terms of Service
        </a>
        <a className="text-gray-400 text-sm font-normal leading-normal hover:text-gray-100 transition-colors" href="#">
          Privacy Policy
        </a>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <a className="text-gray-400 hover:text-gray-200 transition-colors" href="#">
          <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              clipRule="evenodd"
              d="M12.315 2c-4.42 0-7.784 3.295-7.784 7.625 0 2.213.91 4.225 2.394 5.625.078.078.156.156.234.234 1.484 1.406 3.36 2.39 5.234 2.39 4.42 0 7.785-3.295 7.785-7.625S16.734 2 12.315 2zM4 9.625C4 5.32 7.734 2 12.08 2c4.347 0 7.92 3.32 7.92 7.406 0 4.086-3.573 7.406-7.92 7.406-1.953 0-3.75-.781-5.156-2.031C5.625 13.594 4 11.64 4 9.624z"
              fillRule="evenodd"
            />
            <path d="M11.8 7.313c-2.58 0-4.688 2.11-4.688 4.688S9.22 16.69 11.8 16.69s4.688-2.11 4.688-4.688S14.38 7.312 11.8 7.312zm0 7.5a2.813 2.813 0 110-5.625 2.813 2.813 0 010 5.625zM16.95 6.375a.938.938 0 11-1.875 0 .938.938 0 011.875 0z" />
          </svg>
        </a>
        <a className="text-gray-400 hover:text-gray-200 transition-colors" href="#">
          <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.06-.337-.1-1.023.034-1.424.14-1.58.93-3.952.93-3.952s-.234-.468-.234-1.154c0-1.082.624-1.89 1.4-1.89.66 0 1.055.495 1.055 1.095 0 .66-.422 1.65-.648 2.564-.188.773.39 1.4 1.172 1.4 1.4 0 2.473-1.48 2.473-3.628 0-1.92-1.232-3.25-2.925-3.25-2.02 0-3.187 1.51-3.187 3.02 0 .57.215 1.18.484 1.524.05.07.06.135.047.2-.047.165-.156.625-.188.75-.03.14-.14.17-.312.1-.88-.35-1.44-1.72-1.44-2.863 0-2.34 1.67-4.32 4.95-4.32 2.61 0 4.628 1.86 4.628 4.417 0 2.65-1.656 4.7-3.9 4.7-.77 0-1.5-.39-1.742-.855 0 0-.375 1.48-.468 1.84-.14.56-.562 1.29-.844 1.74C10.04 21.6 11.004 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"></path>
          </svg>
        </a>
        <a className="text-gray-400 hover:text-gray-200 transition-colors" href="#">
          <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
          </svg>
        </a>
      </div>
      <p className="text-gray-400 text-sm font-normal leading-normal">© 2024 ShuffledStock. All rights reserved.</p>
    </footer>
  )
}
