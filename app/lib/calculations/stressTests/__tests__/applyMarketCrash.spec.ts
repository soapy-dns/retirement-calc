import { applyMarketCrash } from "../applyMarketCrash"
import { IScenario } from "../../../data/schema/config"

describe("applyMarketCrash", () => {
  it("should reduce the value of AuShares assets by 30%", () => {
    const scenario: IScenario = {
      assets: [{ className: "AuShares", value: 1000 }]
    }
    const result = applyMarketCrash(scenario)
    expect(result.assets[0].value).toBe(700)
  })

  it("should reduce the value of AuSuper assets by 16%", () => {
    const scenario: IScenario = {
      assets: [{ className: "AuSuper", value: 1000 }]
    }
    const result = applyMarketCrash(scenario)
    expect(result.assets[0].value).toBe(790)
  })

  it("should not change the value of other assets", () => {
    const scenario: IScenario = {
      assets: [{ className: "Other", value: 1000 }]
    }
    const result = applyMarketCrash(scenario)
    expect(result.assets[0].value).toBe(1000)
  })

  it("should handle mixed asset classes correctly", () => {
    const scenario: IScenario = {
      assets: [
        { className: "AuShares", value: 1000 },
        { className: "AuSuper", value: 1000 },
        { className: "Other", value: 1000 }
      ]
    }
    const result = applyMarketCrash(scenario)
    expect(result.assets[0].value).toBe(700)
    expect(result.assets[1].value).toBe(790)
    expect(result.assets[2].value).toBe(1000)
  })

  it("should handle an empty assets array", () => {
    const scenario: IScenario = {
      assets: []
    }
    const result = applyMarketCrash(scenario)
    expect(result.assets.length).toBe(0)
  })
})
