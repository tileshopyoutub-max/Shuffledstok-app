export const FooterStickersPage = () => {
  return (
    <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
      <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
        <a
          className="text-[#9dabb8] text-base font-normal leading-normal min-w-40 hover:text-primary transition-colors"
          href="#">
          About
        </a>
        <a
          className="text-[#9dabb8] text-base font-normal leading-normal min-w-40 hover:text-primary transition-colors"
          href="#">
          Contact
        </a>
        <a
          className="text-[#9dabb8] text-base font-normal leading-normal min-w-40 hover:text-primary transition-colors"
          href="#">
          Terms of Service
        </a>
        <a
          className="text-[#9dabb8] text-base font-normal leading-normal min-w-40 hover:text-primary transition-colors"
          href="#">
          Privacy Policy
        </a>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {/* <!-- This is an example of a custom social icon using SVG, replace with your preferred method --> */}
        <a className="text-[#9dabb8] hover:text-primary transition-colors" href="#">
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 2.8 3.2 2.8 5.5 0 3.9-3.3 7.1-7.4 7.1-1.1 0-2.1-.3-3.1-.8-1.5-.8-2.8-1.9-3.9-3.2-1.7-2-2.9-4.3-3.1-6.8s.5-5.1 2.2-7.2c1.7-2 4.1-3.2 6.7-3.2 1.3 0 2.5.3 3.6.8 1.1.5 2.1 1.2 2.8 2.1z"></path>
          </svg>
        </a>
        <a className="text-[#9dabb8] hover:text-primary transition-colors" href="#">
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg">
            <rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
          </svg>
        </a>
        <a className="text-[#9dabb8] hover:text-primary transition-colors" href="#">
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12a10 10 0 0 0 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5a1.5 1.5 0 0 0-1.5 1.5V12h3l-.5 3h-2.5v6.8A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z"></path>
          </svg>
        </a>
      </div>
      <p className="text-[#9dabb8] text-sm font-normal leading-normal">© 2024 ShuffledStock. All rights reserved.</p>
    </footer>
  )
}
