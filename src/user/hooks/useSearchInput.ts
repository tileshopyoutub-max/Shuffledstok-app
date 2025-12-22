import { useState } from "react"
import { useTypedDispatch } from "../../shared/hooks/redux"
import { hideHero } from "../../store/slices/heroSlice"
import { setSearch } from "../../store/slices/imagesFilterSlice"

interface UseSearchInputOptions {
  initialValue?: string
}

export const useSearchInput = ({initialValue = ''}: UseSearchInputOptions) => {
  const dispatch = useTypedDispatch()
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const applySearch = () => {
    dispatch(hideHero())
    dispatch(setSearch(value.trim()))
    setValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applySearch()
      setValue('')
    }
  }

  return {
    value,
    setValue,
    handleChange,
    handleKeyDown,
    applySearch,
  }
}