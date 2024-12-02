import { accumToBasicYearData } from "../accumToBasicYearData"

describe("toBasicYearData", () => {
  it("should accumulate tax history to BasicYearData array", () => {
    const historyYearData = [
      { year: 2022, value: 20, someOtherField: 1 },
      { year: 2022, value: 30, someOtherField: 2 },
      { year: 2023, value: 40, someOtherField: 3 }
    ]
    const result = accumToBasicYearData(historyYearData)

    expect(result).toEqual([
      { year: 2022, value: 50 },
      { year: 2023, value: 40 }
    ])
  })
})
