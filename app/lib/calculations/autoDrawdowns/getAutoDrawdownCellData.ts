import { DrawdownYearData, YearData } from "../assets/types"
import { BasicYearData } from "../types"
import { AutomatedDrawdown } from "./types"

const getYearData = (initialRowData: Record<string, BasicYearData[]>, allDrawdowns: AutomatedDrawdown[]) => {
  const yearData = allDrawdowns.reduce(
    (accum, automatedDrawdown) => {
      const drawdownData = accum[automatedDrawdown.fromName]
      if (drawdownData) {
        const found = drawdownData.find((it) => {
          return it.year === automatedDrawdown.year
        })
        if (found) {
          found.value = automatedDrawdown.value
        }
      }
      return accum
    },
    initialRowData as Record<string, BasicYearData[]>
  )

  return yearData
}

export const getAutoDrawdownCellData = (totalDrawdownYearData: DrawdownYearData[], yearRange: number[]) => {
  const allDrawdowns: AutomatedDrawdown[] = totalDrawdownYearData.reduce((accum, it) => {
    if (!it.automatedDrawdowns) return accum
    const concatenated = accum.concat(it.automatedDrawdowns)
    return concatenated
  }, [] as AutomatedDrawdown[])

  const getInitYearData = () =>
    yearRange.map((year) => {
      return { year, value: 0 }
    })

  const keySet = new Set<string>()
  allDrawdowns.forEach((drawdown) => {
    keySet.add(drawdown.fromName)
  })
  const keyArray = Array.from(keySet)

  const initialRowData = keyArray.reduce(
    (accum, it) => {
      accum[it] = getInitYearData()
      return accum
    },
    {} as Record<string, BasicYearData[]>
  )

  const yearDataRows = getYearData(initialRowData, allDrawdowns)

  return yearDataRows
}
