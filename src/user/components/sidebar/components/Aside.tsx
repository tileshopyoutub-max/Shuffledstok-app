import { useGetCategoriesQuery } from '../../../../shared/api/categoriesApi'
import { useGetTagsQuery } from '../../../../shared/api/tagsApi'
import { useTypedDispatch, useTypedSelector } from '../../../../shared/hooks/redux'
import {
  clearCategories,
  resetFilters,

  toggleAccessType,

  toggleCategory,
  togglePhotoType,
  toggleTag,
} from '../../../../store/slices/imagesFilterSlice'
import { BurgerButton } from '../BurgerButton'
import { sumUsageCount } from '../utils/totalCount'

const Aside = () => {
  const { selectedCategories, selectedTags, accessType, photoType } = useTypedSelector(state => state.imagesFilter)
  const { isOpen } = useTypedSelector(state => state.sidebar)
  const { data: categories = [] } = useGetCategoriesQuery()
  const { data: tags = [] } = useGetTagsQuery()
  const dispatch = useTypedDispatch()
  const totalCount = sumUsageCount(categories)

  return (
    <aside
      className={`
          w-[340px] h-full flex flex-col
          bg-black border-r border-white/10
          shrink-0 relative z-20
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
      {/* <!-- Header --> */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between sticky top-0 bg-black z-10">
        <div className="flex items-center gap-2">
          <BurgerButton />
          <h3 className="text-white text-sm font-bold tracking-[0.05em] uppercase">Filter Results</h3>
        </div>
        <button
          className="text-xs font-medium text-gray-500 hover:text-white transition-colors cursor-pointer"
          onClick={() => dispatch(resetFilters())}>
          Reset
        </button>
      </div>
      {/* <!-- Scrollable Content --> */}
      <div className="flex-1 overflow-y-auto px-6 pb-10 custom-scrollbar" style={{ scrollbarWidth: 'none' }}>
        {/* <!-- Access Type Section --> */}
        <div className="py-4 border-b border-white/5">
          <h2 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Access Type</h2>
          <div className="flex flex-col gap-3">
            <label className="group relative flex items-center gap-4 rounded-lg border border-white/10 p-3 cursor-pointer hover:border-white/20 hover:bg-white/5 transition-all">
              <input
                className="peer h-5 w-5 border-2 border-gray-600 bg-transparent text-primary focus:ring-0 focus:ring-offset-0 checked:border-primary checked:bg-primary"
                name="access_type"
                type="radio"
                checked={accessType === 'free'}
                onClick={() => dispatch(toggleAccessType('free'))}
                value="free"
              />
              <div className="flex grow flex-col">
                <p className="text-white text-sm font-medium leading-normal group-hover:text-primary transition-colors">
                  Free
                </p>
              </div>
            </label>
            <label className="group relative flex items-center gap-4 rounded-lg border border-white/10 p-3 cursor-pointer hover:border-white/20 hover:bg-white/5 transition-all">
              <input
                className="peer h-5 w-5 border-2 border-gray-600 bg-transparent text-primary focus:ring-0 focus:ring-offset-0 checked:border-primary checked:bg-primary"
                name="access_type"
                type="radio"
                checked={accessType === 'premium'}
                onClick={() => dispatch(toggleAccessType('premium'))}
                value="premium"
              />
              <div className="flex grow flex-col">
                <p className="text-white text-sm font-medium leading-normal group-hover:text-primary transition-colors">
                  Premium
                </p>
              </div>
              <span className="material-symbols-outlined text-amber-400 text-[18px]">workspace_premium</span>
            </label>
          </div>
        </div>
        {/* <!-- Photo Type Section --> */}
        <div className="py-6 border-b border-white/5">
          <h2 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Photo Type</h2>
          <div className="flex h-11 w-full items-center justify-center rounded-lg bg-surface-dark border border-white/10 p-1">
            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-[4px] px-2 transition-all has-[:checked]:bg-primary has-[:checked]:text-white text-gray-400 text-sm font-medium leading-normal hover:text-white">
              <span className="truncate">Single</span>
              <input
                className="invisible w-0 absolute"
                type="radio"
                name="photo_type"
                value="Single"
                checked={photoType === 'Single'}
                onClick={() => dispatch(togglePhotoType('Single'))}
              />
            </label>
            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-[4px] px-2 transition-all has-[:checked]:bg-primary has-[:checked]:text-white text-gray-400 text-sm font-medium leading-normal hover:text-white">
              <span className="truncate">Archive</span>
              <input
                className="invisible w-0 absolute"
                type="radio"
                name="photo_type"
                value="Archive"
                checked={photoType === 'Archive'}
                onClick={() => dispatch(togglePhotoType('Archive'))}
              />
            </label>
          </div>
        </div>
        {/* <!-- Categories Section --> */}
        <div className="py-6 border-b border-white/5">
          <h2 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Categories</h2>
          <div className="flex flex-col gap-1">
            {/* <!-- Category Item --> */}
            <label className="flex items-center gap-3 py-2 px-2 -mx-2 rounded-md hover:bg-white/5 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  className="peer appearance-none h-4 w-4 border border-gray-600 rounded-full bg-transparent checked:border-primary checked:border-[5px] transition-all"
                  name="category"
                  type="checkbox"
                  checked={selectedCategories.length === 0}
                  onChange={() => dispatch(clearCategories())}
                />
              </div>
              <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                All Categories
              </span>
              <span className="ml-auto text-xs text-gray-600 font-mono">{totalCount}</span>
            </label>
            {/* <!-- Category Item --> */}
            {categories.map(c => (
              <label
                key={c.id}
                className="flex items-center gap-3 py-2 px-2 -mx-2 rounded-md hover:bg-white/5 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    className="peer appearance-none h-4 w-4 border border-gray-600 rounded-full bg-transparent checked:border-primary checked:border-[5px] transition-all"
                    name="category"
                    type="checkbox"
                    checked={selectedCategories.includes(c.name)}
                    onChange={() => dispatch(toggleCategory(c.name))}
                  />
                </div>
                <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                  {c.name}
                </span>
                <span className="ml-auto text-xs text-gray-600 font-mono">{c.usage_count}</span>
              </label>
            ))}
          </div>
        </div>
        {/* <!-- Tags Section --> */}
        <div className="pt-6">
          <h2 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Popular Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map(t => (
              <label key={t.id} className="cursor-pointer group">
                <input
                  className="peer sr-only"
                  type="checkbox"
                  checked={selectedTags.includes(t.name)}
                  onChange={() => dispatch(toggleTag(t.name))}
                />
                <span className="inline-flex items-center rounded-full border border-white/20 bg-transparent px-3 py-1.5 text-xs font-medium text-gray-400 transition-all peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary group-hover:border-white/40 group-hover:text-gray-200">
                  #{t.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Aside
