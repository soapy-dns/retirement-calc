import { BasicYearData, InflationContext } from "../types"
import { getInflationFactor } from "../utils/getInflationFactor"

export const getAccumulatedData = (yearData: BasicYearData[]): BasicYearData[] => {
  const newYearData: BasicYearData[] = []

  yearData.forEach((it, index) => {
    const prevValue = newYearData[index - 1]?.value || 0

    const accumValue = it.value + prevValue
    newYearData.push({ year: it.year, value: accumValue })
  })

  return newYearData
}

interface Props {
  yearData: BasicYearData[]
  inflationContext: InflationContext
}
/**
 This only applies the factor to the current value and adds that on to the previous value.
 */
export const getAccumulatedNPVData = ({ yearData, inflationContext }: Props) => {
  const newYearData: BasicYearData[] = []
  yearData.forEach((it, index) => {
    const prevValue = newYearData[index - 1]?.value || 0
    const factor = getInflationFactor(it.year, inflationContext)

    const accumValue = Math.round(it.value / factor + prevValue)
    newYearData.push({ year: it.year, value: accumValue })
  })

  return newYearData
}
