import { AuIncomeTaxCalc } from "../AuIncomeTaxCalc"

const taxCalc = new AuIncomeTaxCalc(1)

describe("test", () => {
  it("should be no tax below threshold 1", () => {
    expect(taxCalc.getTax(18199)).toEqual(0)
  })

  it("should start taxing above 1st threshold", () => {
    expect(taxCalc.getTax(18300)).toEqual(19)
  })
  it("should do first rate until 2nd threshold", () => {
    expect(taxCalc.getTax(45000)).toEqual(5092)
  })
  it("should do 2nd rate after 2nd threshold", () => {
    expect(taxCalc.getTax(45100)).toEqual(5125)
  })

  // TODO: do more
})
