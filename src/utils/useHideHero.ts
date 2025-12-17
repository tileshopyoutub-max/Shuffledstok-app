import { useLocation } from "react-router-dom"
import { useTypedDispatch } from "../shared/hooks/redux"
import { useEffect, useRef } from "react"
import { hideHero } from "../store/slices/heroSlice"

export const useHideHeroOnNavigate = (fromPath: string = '/') => {
  const location = useLocation()
  const dispatch = useTypedDispatch()
  const prevPathRef = useRef(location.pathname)

  useEffect(() => {
    if (prevPathRef.current === fromPath && location.pathname !== fromPath) {
      dispatch(hideHero())
    }
    prevPathRef.current = location.pathname
  }, [location.pathname, fromPath, dispatch])
}