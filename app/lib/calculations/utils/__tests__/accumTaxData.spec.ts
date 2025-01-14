import { accumTaxData } from "../accumTaxData"
import { YearsTaxData } from "../../assets/types"

describe("accumTaxData", () => {
  it("should accumulate tax data correctly when years are unique", () => {
    const input: YearsTaxData[] = [
      {
        year: 2020,
        value: 100,
        totalTaxableAmt: 1000,
        taxableIncomeAmt: 500,
        taxableDrawdownsAmt: 300,
        taxableAutomatedDrawdownAmt: 200
      },
      {
        year: 2021,
        value: 200,
        totalTaxableAmt: 2000,
        taxableIncomeAmt: 1000,
        taxableDrawdownsAmt: 600,
        taxableAutomatedDrawdownAmt: 400
      }
    ]
    const expectedOutput: YearsTaxData[] = [
      {
        year: 2020,
        value: 100,
        totalTaxableAmt: 1000,
        taxableIncomeAmt: 500,
        taxableDrawdownsAmt: 300,
        taxableAutomatedDrawdownAmt: 200
      },
      {
        year: 2021,
        value: 200,
        totalTaxableAmt: 2000,
        taxableIncomeAmt: 1000,
        taxableDrawdownsAmt: 600,
        taxableAutomatedDrawdownAmt: 400
      }
    ]
    expect(accumTaxData(input)).toEqual(expectedOutput)
  })

  it("should accumulate tax data correctly when years are duplicated", () => {
    const input: YearsTaxData[] = [
      {
        year: 2020,
        value: 100,
        totalTaxableAmt: 1000,
        taxableIncomeAmt: 500,
        taxableDrawdownsAmt: 300,
        taxableAutomatedDrawdownAmt: 200
      },
      {
        year: 2020,
        value: 150,
        totalTaxableAmt: 1500,
        taxableIncomeAmt: 700,
        taxableDrawdownsAmt: 400,
        taxableAutomatedDrawdownAmt: 300
      }
    ]
    const expectedOutput: YearsTaxData[] = [
      {
        year: 2020,
        value: 250,
        totalTaxableAmt: 2500,
        taxableIncomeAmt: 1200,
        taxableDrawdownsAmt: 700,
        taxableAutomatedDrawdownAmt: 500
      }
    ]

    const result = accumTaxData(input)
    expect(result).toEqual(expectedOutput)
  })

  it("should handle empty input", () => {
    const input: YearsTaxData[] = []
    const expectedOutput: YearsTaxData[] = []
    expect(accumTaxData(input)).toEqual(expectedOutput)
  })

  it("should handle single year input", () => {
    const input: YearsTaxData[] = [
      {
        year: 2020,
        value: 100,
        totalTaxableAmt: 1000,
        taxableIncomeAmt: 500,
        taxableDrawdownsAmt: 300,
        taxableAutomatedDrawdownAmt: 200
      }
    ]
    const expectedOutput: YearsTaxData[] = [
      {
        year: 2020,
        value: 100,
        totalTaxableAmt: 1000,
        taxableIncomeAmt: 500,
        taxableDrawdownsAmt: 300,
        taxableAutomatedDrawdownAmt: 200
      }
    ]
    expect(accumTaxData(input)).toEqual(expectedOutput)
  })
})
