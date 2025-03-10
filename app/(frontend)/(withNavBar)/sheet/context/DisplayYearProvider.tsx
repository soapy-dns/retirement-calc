import React, { ReactNode, createContext, useEffect, useState } from "react"
import { boolean } from "zod"

interface ContextProps {
  showAllYears: boolean
  shouldDisplayYear: (year: number) => boolean
  getDisplayYears: () => number[]
  toggleYears: () => void
}
export const DisplayYearContext = createContext<ContextProps>({
  showAllYears: false,
  shouldDisplayYear: () => true,
  getDisplayYears: () => [],
  toggleYears: () => {}
})

interface DisplayYearProviderProps {
  children: ReactNode
  yearRange: number[]
}

export const DisplayYearProvider = ({ yearRange, children }: DisplayYearProviderProps) => {
  const [yearsToDisplay, setYearsToDisplay] = useState<number[]>([])
  const [showAllYears, setShowAllYears] = useState<boolean>(false)

  useEffect(() => {
    const sessionString = sessionStorage.getItem("SHOW_ALL_YEARS")
    if (sessionString) {
      let typedResult = sessionString === "true" ? true : false
      setShowAllYears(typedResult)
    }
  }, [])

  useEffect(() => {
    const years = yearRange.filter((year, index) => {
      if (showAllYears) return true
      if (index < 5) return true
      if (year % 5 === 0) return true
      if (index > yearRange.length - 3) return true // always show the last 2 years
      return false
    })

    setYearsToDisplay(years)
  }, [yearRange, showAllYears])

  const toggleYears = () => {
    setShowAllYears(!showAllYears)
    const sessionString = showAllYears ? "false" : "true"
    sessionStorage.setItem("SHOW_ALL_YEARS", sessionString)
  }

  const shouldDisplayYear = (year: number) => {
    if (showAllYears) return true
    return yearsToDisplay.includes(year)
  }

  const getDisplayYears = () => {
    return yearsToDisplay
  }

  return (
    <DisplayYearContext.Provider value={{ shouldDisplayYear, getDisplayYears, toggleYears, showAllYears }}>
      {children}
    </DisplayYearContext.Provider>
  )
}
