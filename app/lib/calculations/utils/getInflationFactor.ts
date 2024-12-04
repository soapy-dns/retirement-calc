import { InflationContext } from "../types"

export const getInflationFactor = (year: number, inflationContext: InflationContext) => {
  return inflationContext[year - 1] ? inflationContext[year - 1].factor : 1
}
