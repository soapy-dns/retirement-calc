import React, { ReactNode, createContext, useEffect, useState } from "react"

interface ContextProps {
  shouldDisplayYear: (year: number) => boolean
  getDisplayYears: () => number[]
  toggleAllCols: () => void
}
export const DisplayYearContext = createContext<ContextProps>({
  shouldDisplayYear: () => true,
  getDisplayYears: () => [],
  toggleAllCols: () => {}
})

interface DisplayYearProviderProps {
  children: ReactNode
  yearRange: number[]
}

export const DisplayYearProvider = ({ yearRange, children }: DisplayYearProviderProps) => {
  const [displayYears, setDisplayYears] = useState<number[]>([])
  const [allCols, setAllCols] = useState<boolean>(false)

  useEffect(() => {
    const yearsToDisplay = yearRange.filter((year, index) => {
      if (allCols) return true
      if (index < 5) return true
      if (year % 5 === 0) return true
      if (index > yearRange.length - 3) return true // always show the last 2 years
      return false
    })

    setDisplayYears(yearsToDisplay)
  }, [yearRange, allCols])

  const toggleAllCols = () => {
    setAllCols(!allCols)
  }

  const shouldDisplayYear = (year: number) => {
    return displayYears.includes(year)
  }

  const getDisplayYears = () => {
    return displayYears
  }

  return (
    <DisplayYearContext.Provider value={{ shouldDisplayYear, getDisplayYears, toggleAllCols }}>
      {children}
    </DisplayYearContext.Provider>
  )
}
