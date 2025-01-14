import { getInflationContext } from "../calculations/utils/getInflationContext"
import { getYearRange } from "../calculations/utils/getYearRange"
import { InflationRecord } from "../data/schema/config"

export const getInflationFactorAtNewYear = (
  currentAsAtYear: number,
  newYear: number,
  inflationConfig: InflationRecord[]
): number => {
  const { yearRange } = getYearRange(currentAsAtYear)
  const inflationContext = getInflationContext(yearRange, inflationConfig)

  if (!inflationContext[newYear]) throw new Error(`No inflation configuration for year ${newYear}`)

  const contextForPreviousYear = inflationContext[newYear - 1]

  return contextForPreviousYear ? contextForPreviousYear.factor : 1
}
