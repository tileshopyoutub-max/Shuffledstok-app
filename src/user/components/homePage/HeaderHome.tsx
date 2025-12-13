import { useState } from 'react'
import { Link } from 'react-router-dom'

export const HeaderHomePage = () => {
  const [search, setSearch] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-800/80 bg-black/80 backdrop-blur-sm px-6 py-3">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-gray-100">
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tighter">ShuffledStock</h2>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link className="text-gray-400 text-sm font-medium hover:text-gray-100 transition-colors" to="wallpapers">
            Wallpaper
          </Link>
          <a className="text-gray-400 text-sm font-medium hover:text-gray-100 transition-colors" href="#">
            Instagram Icons
          </a>
          <Link className="text-gray-400 text-sm font-medium hover:text-gray-100 transition-colors" to="stickers">
            Stickers
          </Link>
          <a className="text-gray-400 text-sm font-medium hover:text-gray-100 transition-colors" href="#">
            Collections
          </a>
        </div>
      </div>
      <div className="flex flex-1 justify-end items-center gap-4">
        <label className="hidden lg:flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch h-full">
            <div className="text-gray-400 flex bg-background-dark/50 items-center justify-center pl-3 rounded-l-lg border border-gray-700 border-r-0">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                search
              </span>
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg border border-gray-700 border-l-0 text-gray-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 ring-inset bg-background-dark/50 h-full placeholder:text-gray-400 px-4 pl-2 text-sm font-normal leading-normal"
              placeholder="Search"
              value={search}
              onChange={handleChange}
            />
          </div>
        </label>
        <div className="flex gap-2">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
            <span className="truncate">Login</span>
          </button>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-primary/90 text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
            <span className="truncate">Sign Up</span>
          </button>
        </div>
      </div>
    </header>
  )
}
