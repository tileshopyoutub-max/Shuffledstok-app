import { useState } from 'react'
import { useTypedSelector } from '../../../../shared/hooks/redux'
import { useSearchInput } from '../../../hooks/useSearchInput'
import { imagesFilter } from '../utils/imagesFilter'

export const MainSidebar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { search } = useTypedSelector(state => state.imagesFilter)
  const { value, handleChange, handleKeyDown } = useSearchInput({
    initialValue: search,
  })
  const filteredResults = imagesFilter()
  return (
    <main
      className="flex-1 h-full bg-[#050505] p-8 hidden lg:block overflow-auto relative"
      style={{ scrollbarWidth: 'none' }}>
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}></div>
      {/* <!-- Navbar Placeholder --> */}
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight">Search Results</h1>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 relative">
            {/* Search button */}
            <button
              onClick={() => setIsSearchOpen(prev => !prev)}
              className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>

            <div
              className={`
                  overflow-hidden
                  transition-all duration-300 ease-out
                  ${isSearchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'}
                `}>
              <input
                type="text"
                placeholder="Search images..."
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="
                    w-full
                    h-10
                    rounded-lg
                    bg-black
                    border border-white/10
                    px-3
                    text-sm text-white
                    placeholder-gray-500
                    focus:outline-none focus:border-primary
                  "
              />
            </div>
          </div>

          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            SS
          </div>
        </div>
      </div>
      {/* <!-- Grid of results placeholder --> */}
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
        {filteredResults.map(img => (
          <div key={img.key} className="bg-surface-dark rounded-xl overflow-hidden group">
            <div className="h-64 w-full bg-neutral-800 relative">
              <img
                alt="Dark modern architectural building at night"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                data-alt="Dark modern architectural building at night"
                src={img.url}
              />
            </div>
            <div className="p-4 border-t border-white/5">
              <h4 className="text-white text-sm font-medium truncate">{img.title}</h4>
              <p className="text-gray-500 text-xs mt-1">
                {img.categories[0]} • {img.downloadFree ? 'Free' : 'Premium'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}


