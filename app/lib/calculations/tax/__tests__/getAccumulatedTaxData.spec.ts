import { getAccumulatedData, getAccumulatedNPVData } from "../../tax/getAccumulatedTaxData"
import { BasicYearData } from "../../types"

describe("getAccumulatedData", () => {
  it("should return accumulated data correctly for a single year", () => {
    const yearData: BasicYearData[] = [{ year: 2020, value: 100 }]
    const result = getAccumulatedData(yearData)
    expect(result).toEqual([{ year: 2020, value: 100 }])
  })

  it("should return accumulated data correctly for multiple years", () => {
    const yearData: BasicYearData[] = [
      { year: 2020, value: 100 },
      { year: 2021, value: 200 },
      { year: 2022, value: 300 }
    ]
    const result = getAccumulatedData(yearData)
    expect(result).toEqual([
      { year: 2020, value: 100 },
      { year: 2021, value: 300 },
      { year: 2022, value: 600 }
    ])
  })

  it("should handle empty yearData array", () => {
    const yearData: BasicYearData[] = []
    const result = getAccumulatedData(yearData)
    expect(result).toEqual([])
  })

  it("should handle yearData with zero values", () => {
    const yearData: BasicYearData[] = [
      { year: 2020, value: 0 },
      { year: 2021, value: 0 },
      { year: 2022, value: 0 }
    ]
    const result = getAccumulatedData(yearData)
    expect(result).toEqual([
      { year: 2020, value: 0 },
      { year: 2021, value: 0 },
      { year: 2022, value: 0 }
    ])
  })

  it("should handle negative values in yearData", () => {
    const yearData: BasicYearData[] = [
      { year: 2020, value: -100 },
      { year: 2021, value: -200 },
      { year: 2022, value: -300 }
    ]
    const result = getAccumulatedData(yearData)
    expect(result).toEqual([
      { year: 2020, value: -100 },
      { year: 2021, value: -300 },
      { year: 2022, value: -600 }
    ])
  })
})

describe("getAccumulatedData", () => {
  const inflationContext = {
    2020: {
      inflation: 0.05,
      factor: 1.05
    },
    2021: {
      inflation: 0.05,
      factor: 1.102
    },
    2022: {
      inflation: 0.05,
      factor: 1.158
    }
  }
  it("should return accumulated data correctly for a single year", () => {
    const yearData: BasicYearData[] = [{ year: 2020, value: 100 }]
    const result = getAccumulatedNPVData({ yearData, inflationContext })
    expect(result).toEqual([{ year: 2020, value: 100 }])
  })

  it("should return accumulated data correctly for multiple years", () => {
    const yearData: BasicYearData[] = [
      { year: 2020, value: 100 },
      { year: 2021, value: 200 },
      { year: 2022, value: 300 }
    ]
    const result = getAccumulatedNPVData({ yearData, inflationContext })
    expect(result).toEqual([
      { year: 2020, value: 100 },
      { year: 2021, value: 290 },
      { year: 2022, value: 562 }
    ])
  })
})
