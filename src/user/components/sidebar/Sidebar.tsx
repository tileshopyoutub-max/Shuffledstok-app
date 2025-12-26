import { useEffect } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../../shared/hooks/redux'
import { closeSidebar } from '../../../store/slices/sidebarSlice'
import Aside from './components/Aside'

export const Sidebar = () => {
  const { isOpen } = useTypedSelector(state => state.sidebar)

  const dispatch = useTypedDispatch()
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeSidebar())
      }
    }

    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [dispatch])

  
  return (
    <div
      className={`
        font-display
        bg-background-light dark:bg-background-dark
        text-slate-900 dark:text-white
        antialiased
        flex flex-row
        h-[100vh]
        fixed left-0 right-0 z-[100]
        transition-opacity duration-300
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        w-full max-w-[340px] 
      `}>
      {/* <!-- Left Sidebar --> */}
      <Aside/>
    </div>
  )
}
