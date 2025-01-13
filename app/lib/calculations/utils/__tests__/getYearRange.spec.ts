import { getYearRange } from "../getYearRange"

describe("getYearRange", () => {
  it("should return the correct range of years when numOfYears is less than MAX_YEARS", () => {
    const startingYear = 2020
    const numOfYears = 10
    const result = getYearRange(startingYear, numOfYears)
    expect(result.yearRange).toEqual([2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030])
    expect(result.to).toBe(2030)
  })

  it("should return the correct range of years when numOfYears is not provided", () => {
    const startingYear = 2020
    const result = getYearRange(startingYear)
    expect(result.yearRange.length).toBe(51)
    expect(result.yearRange[0]).toBe(2020)
    expect(result.yearRange[50]).toBe(2070)
    expect(result.to).toBe(2070)
  })

  it("should return the correct range of years when numOfYears is greater than MAX_YEARS", () => {
    const startingYear = 2020
    const numOfYears = 60
    const result = getYearRange(startingYear, numOfYears)
    expect(result.yearRange.length).toBe(51)
    expect(result.yearRange[0]).toBe(2020)
    expect(result.yearRange[50]).toBe(2070)
    expect(result.to).toBe(2070)
  })

  it("should return the correct range of years when numOfYears is exactly MAX_YEARS", () => {
    const startingYear = 2020
    const numOfYears = 50
    const result = getYearRange(startingYear, numOfYears)
    expect(result.yearRange.length).toBe(51)
    expect(result.yearRange[0]).toBe(2020)
    expect(result.yearRange[50]).toBe(2070)
    expect(result.to).toBe(2070)
  })
})
