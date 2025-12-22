import { useTypedDispatch, useTypedSelector } from "../../../shared/hooks/redux"
import { hideHero } from "../../../store/slices/heroSlice";
import { toggleSidebar } from "../../../store/slices/sidebarSlice"
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";


export function BurgerButton() {
  const dispatch = useTypedDispatch()
  const {isOpen} = useTypedSelector(state => state.sidebar)

  return (
    <button
      onClick={() => {dispatch(toggleSidebar()), dispatch(hideHero())}}
      aria-label="Toggle menu"
      className="relative w-7 h-6 flex flex-col justify-center items-center"
    >
      {isOpen ? <FiIcons.FiXCircle size={24}/> : <FaIcons.FaBars size={24}/>}
    </button>
  )
}
