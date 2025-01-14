import { applyPropertyCrash } from "../applyPropertyCrash"
import { IScenario } from "../../../data/schema/config"

describe("applyPropertyCrash", () => {
  it("should reduce the value of AuProperty assets by 10%", () => {
    const scenario: IScenario = {
      assets: [
        { className: "AuProperty", value: 1000 },
        { className: "Stock", value: 2000 }
      ]
    }

    const result = applyPropertyCrash(scenario)

    expect(result.assets[0].value).toBe(900)
    expect(result.assets[1].value).toBe(2000)
  })

  it("should not change the value of non-AuProperty assets", () => {
    const scenario: IScenario = {
      assets: [
        { className: "Stock", value: 2000 },
        { className: "Bond", value: 1500 }
      ]
    }

    const result = applyPropertyCrash(scenario)

    expect(result.assets[0].value).toBe(2000)
    expect(result.assets[1].value).toBe(1500)
  })

  it("should handle an empty assets array", () => {
    const scenario: IScenario = {
      assets: []
    }

    const result = applyPropertyCrash(scenario)

    expect(result.assets.length).toBe(0)
  })

  it("should handle a scenario with no AuProperty assets", () => {
    const scenario: IScenario = {
      assets: [
        { className: "Stock", value: 2000 },
        { className: "Bond", value: 1500 }
      ]
    }

    const result = applyPropertyCrash(scenario)

    expect(result.assets[0].value).toBe(2000)
    expect(result.assets[1].value).toBe(1500)
  })

  it("should handle a scenario with only AuProperty assets", () => {
    const scenario: IScenario = {
      assets: [
        { className: "AuProperty", value: 1000 },
        { className: "AuProperty", value: 2000 }
      ]
    }

    const result = applyPropertyCrash(scenario)

    expect(result.assets[0].value).toBe(900)
    expect(result.assets[1].value).toBe(1800)
  })
})
