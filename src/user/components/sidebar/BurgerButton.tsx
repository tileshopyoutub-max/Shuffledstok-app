import { useTypedDispatch, useTypedSelector } from '../../../shared/hooks/redux'
import { hideHero } from '../../../store/slices/heroSlice'
import { toggleSidebar } from '../../../store/slices/sidebarSlice'
import * as FaIcons from 'react-icons/fa'
import * as FiIcons from 'react-icons/fi'

export function BurgerButton() {
  const dispatch = useTypedDispatch()
  const { isOpen } = useTypedSelector(state => state.sidebar)
  const filters = useTypedSelector(state => state.imagesFilter)

  const activeCount =
    (filters.search ? 1 : 0) +
    filters.selectedTags.length +
    filters.selectedCategories.length +
    (filters.accessType ? 1 : 0) +
    (filters.photoType ? 1 : 0)

  return (
    <button
      onClick={() => {
        dispatch(toggleSidebar()), dispatch(hideHero())
      }}
      aria-label="Toggle menu"
      className="relative w-7 h-6 flex flex-col justify-center items-center">
      {isOpen ? <FiIcons.FiXCircle size={24} /> : <FaIcons.FaBars size={24} />}

      {activeCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
          {activeCount}
        </span>
      )}
    </button>
  )
}
