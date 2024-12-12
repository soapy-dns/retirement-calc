import React, { ReactNode, createContext, useEffect, useState } from "react"

interface ContextProps {
  shouldDisplayYear: (year: number) => boolean
  getDisplayYears: () => number[]
}
export const DisplayYearContext = createContext<ContextProps>({
  shouldDisplayYear: () => true,
  getDisplayYears: () => []
})

interface DisplayYearProviderProps {
  children: ReactNode
  yearRange: number[]
  verbose: boolean
}
export const DisplayYearProvider = ({ yearRange, children, verbose }: DisplayYearProviderProps) => {
  const [displayYears, setDisplayYears] = useState<number[]>([])

  useEffect(() => {
    const yearsToDisplay = yearRange.filter((year, index) => {
      if (verbose) return true
      if (index < 5) return true
      if (year % 5 === 0) return true
      if (index === yearRange.length - 1) return true
      return false
    })

    setDisplayYears(yearsToDisplay)
  }, [yearRange, verbose])

  // const yearsToDisplay = yearRange.filter((year, index) => {
  //   if (verbose) return true
  //   if (index < 5) return true
  //   if (year % 5 === 0) return true
  //   if (index === yearRange.length - 1) return true
  //   return false
  // })

  const shouldDisplayYear = (year: number) => {
    return displayYears.includes(year)
  }

  const getDisplayYears = () => {
    return displayYears
  }

  return (
    <DisplayYearContext.Provider value={{ shouldDisplayYear, getDisplayYears }}>{children}</DisplayYearContext.Provider>
  )
}
