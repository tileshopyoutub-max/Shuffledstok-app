import { useTypedSelector } from '../../../shared/hooks/redux'
import { useSearchInput } from '../../hooks/useSearchInput'

export const SearchInput = () => {
  const { search } = useTypedSelector(state => state.imagesFilter)
  const { value, handleChange, handleKeyDown, applySearch } = useSearchInput({
    initialValue: search,
  })
  return (
    <label className="flex flex-col lg:min-w-72 !h-10 max-w-90">
      <div className="flex w-full flex-1 items-stretch h-full">
        <div
          onClick={applySearch}
          className="text-gray-400 flex bg-background-dark/50 items-center justify-center pl-3 rounded-l-lg border border-gray-700 border-r-0">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            search
          </span>
        </div>
        <input
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg border border-gray-700 border-l-0 text-gray-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 ring-inset bg-background-dark/50 h-full placeholder:text-gray-400 px-4 pl-2 text-sm font-normal leading-normal"
          placeholder="Search"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </label>
  )
}
