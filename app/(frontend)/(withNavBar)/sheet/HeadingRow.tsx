import { useContext } from "react"
import { HeadingCell } from "./heading/Cell"
import { DisplayYearContext } from "./context/DisplayYearProvider"

export const HeadingRow = () => {
  const { getDisplayYears } = useContext(DisplayYearContext)
  const displayYears = getDisplayYears()

  return (
    <>
      {displayYears.map((year, index) => {
        return <HeadingCell key={index} year={year} />
      })}
    </>
  )
}
