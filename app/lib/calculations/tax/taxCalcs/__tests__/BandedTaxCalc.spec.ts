import { BandedTaxCalc } from "../BandedTaxCalc"
import config from "@/app/lib/config.json"

const inflationFactor = 1.27
const year = 2030
const inflationContext = {
  [year]: {
    inflation: 0.03,
    factor: inflationFactor
  }
}

describe("tests without currency conversion", () => {
  const taxCalc = new BandedTaxCalc(1, config.incomeTax.AU.rates, inflationContext)

  it("should be no tax below threshold 1", () => {
    const incomeAsAtTheYear = 18199 * inflationFactor

    const taxAmt = taxCalc.getTax(incomeAsAtTheYear, year)
    expect(taxAmt).toEqual(0)
  })

  it("should start taxing above 1st threshold", () => {
    const incomeAsAtTheYear = 18300 * inflationFactor

    const taxAmt = taxCalc.getTax(incomeAsAtTheYear, year)
    expect(taxAmt).toEqual(Math.round(19 * inflationFactor))
  })

  it("should be ok above 2nd threshold", () => {
    const incomeAsAtTheYear = 50000 * inflationFactor

    const taxAmt = taxCalc.getTax(incomeAsAtTheYear, year)
    expect(taxAmt).toEqual(Math.round(8372))
  })

  it("should be correct after 3rd threshold", () => {
    const incomeAsAtTheYear = 125000 * inflationFactor

    const taxAmt = taxCalc.getTax(incomeAsAtTheYear, year)
    expect(taxAmt).toEqual(36947)
  })

  it("should be correct after 4th threshold", () => {
    const incomeAsAtTheYear = 200000 * inflationFactor

    const taxAmt = taxCalc.getTax(incomeAsAtTheYear, year)
    expect(taxAmt).toEqual(72316)
  })
})

describe("test with currency conversion", () => {
  const taxCalc = new BandedTaxCalc(2, config.incomeTax.AU.rates, inflationContext)

  it("should do with currency conversion ok", () => {
    const incomeAsAtTheYear = 50000 * inflationFactor

    const taxAmt = taxCalc.getTax(incomeAsAtTheYear, year)
    expect(taxAmt).toEqual(13711)
  })

  it("should do with currency conversion ok", () => {
    const incomeAsAtTheYear = 100000 * inflationFactor

    const taxAmt = taxCalc.getTax(incomeAsAtTheYear, year)
    expect(taxAmt).toEqual(36158) // This is in the non australian currency as is the input
  })
})
