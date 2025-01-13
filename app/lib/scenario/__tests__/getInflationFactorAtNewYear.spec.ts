import { InflationRecord } from "../../data/schema/config"
import { getInflationFactorAtNewYear } from "../getInflationFactorAtNewYear"

describe("getInflationFactorAtNewYear", () => {
  it("should the correct inflation factor after 0 year", () => {
    const currentAsAtYear = 2023
    const newYear = 2023

    const inflationConfig: InflationRecord[] = [
      {
        fromYear: 2023,
        inflationRate: 0.1 // 10%
      }
    ]

    const result = getInflationFactorAtNewYear(currentAsAtYear, newYear, inflationConfig)

    expect(result).toBe(1)
  })

  it("should the correct inflation factor after 1 year", () => {
    const currentAsAtYear = 2023
    const newYear = 2024

    const inflationConfig: InflationRecord[] = [
      {
        fromYear: 2023,
        inflationRate: 0.1 // 10%
      }
    ]

    const result = getInflationFactorAtNewYear(currentAsAtYear, newYear, inflationConfig)

    expect(result).toBe(1.1)
  })
})
