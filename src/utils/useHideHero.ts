import { useLocation } from "react-router-dom"
import { useTypedDispatch } from "../shared/hooks/redux"
import { useEffect, useRef } from "react"
import { hideHero, showHero } from "../store/slices/heroSlice"

export const useHideHeroOnNavigation = (homePath: string = "/") => {
  const location = useLocation()
  const dispatch = useTypedDispatch()
  const prevPathRef = useRef(location.pathname)

  useEffect(() => {
    const prevPath = prevPathRef.current
    const currentPath = location.pathname

    if (prevPath === homePath && currentPath !== homePath) {
      dispatch(hideHero())
    }

    if (currentPath === homePath && prevPath !== homePath) {
      dispatch(showHero())
    }

    prevPathRef.current = currentPath
  }, [location.pathname, homePath, dispatch])
}

/** @deprecated Use useHideHeroOnNavigation */
export const useHideHeroOnNavigate = useHideHeroOnNavigation