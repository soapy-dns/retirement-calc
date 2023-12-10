import { getInflationContext, getInflationForEachYear } from "../getInflationContext"

describe("test", () => {
  it("should get array of rates for all necessary years", () => {
    const yearRange = [2023, 2024, 2025, 2026, 2027]

    // starts before year range, inflation config continues after yearRange
    const inflationConfig = [
      { fromYear: 2022, inflationRate: 0.1 },
      { fromYear: 2025, inflationRate: 0.07 },
      { fromYear: 2028, inflationRate: 0.05 }
    ]
    const result = getInflationForEachYear(yearRange, inflationConfig)

    const expectedResult = [
      { fromYear: 2022, inflationRate: 0.1 },
      { fromYear: 2023, inflationRate: 0.1 },
      { fromYear: 2024, inflationRate: 0.1 },
      { fromYear: 2025, inflationRate: 0.07 },
      { fromYear: 2026, inflationRate: 0.07 },
      { fromYear: 2027, inflationRate: 0.07 }
    ]
    expect(result).toEqual(expectedResult)
  })

  it("should build inflation context correctly", () => {
    const yearRange = [2023, 2024, 2025, 2026, 2027]

    const inflationConfig = [{ fromYear: 2022, inflationRate: 0.1 }]
    const result = getInflationContext(yearRange, inflationConfig)

    const expectedResult = {
      "2022": { inflation: 0.1, factor: 1.1 },
      "2023": { inflation: 0.1, factor: 1.2100000000000002 },
      "2024": { inflation: 0.1, factor: 1.3310000000000004 },
      "2025": { inflation: 0.1, factor: 1.4641000000000006 },
      "2026": { inflation: 0.1, factor: 1.6105100000000008 },
      "2027": { inflation: 0.1, factor: 1.771561000000001 }
    }
    expect(result).toEqual(expectedResult)
  })
})
