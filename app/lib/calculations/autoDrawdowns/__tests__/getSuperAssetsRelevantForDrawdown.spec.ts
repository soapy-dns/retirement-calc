import { getSuperAssetsRelevantForDrawdown } from "../getSuperAssetsRelevantForDrawdown"
import { Asset } from "../../assets/Asset"
import { MandatoryDrawdownPercentages } from "../types"

describe("getSuperAssetsRelevantForDrawdown", () => {
  const mandatoryDrawdownPercentages: MandatoryDrawdownPercentages = {
    AU: 4,
    US: 5
  }

  const assets: Asset[] = [
    { id: 1, country: "AU", className: "AuSuper", drawdownFrom: 2025 },
    { id: 2, country: "AU", className: "Property", drawdownFrom: 2023 },
    { id: 3, country: "US", className: "AuSuper", drawdownFrom: 2024 },
    { id: 4, country: "US", className: "AuSuper", drawdownFrom: 2022 },
    { id: 5, country: "AU", className: "AuSuper", drawdownFrom: 2021 }
  ]

  it("should return only super assets relevant for drawdown", () => {
    const year = 2023
    const result = getSuperAssetsRelevantForDrawdown({ assets, year, mandatoryDrawdownPercentages })
    expect(result).toEqual([
      { id: 4, country: "US", className: "AuSuper", drawdownFrom: 2022 },
      { id: 5, country: "AU", className: "AuSuper", drawdownFrom: 2021 }
    ])
  })

  it("should return an empty array if no assets are relevant for drawdown", () => {
    const year = 2020
    const result = getSuperAssetsRelevantForDrawdown({ assets, year, mandatoryDrawdownPercentages })
    expect(result).toEqual([])
  })

  it("should return assets that have no drawdownFrom year specified", () => {
    const assetsWithNoDrawdownFrom: Asset[] = [
      { id: 1, country: "AU", className: "AuSuper" },
      { id: 2, country: "US", className: "AuSuper" }
    ]
    const year = 2023
    const result = getSuperAssetsRelevantForDrawdown({
      assets: assetsWithNoDrawdownFrom,
      year,
      mandatoryDrawdownPercentages
    })
    expect(result).toEqual([
      { id: 1, country: "AU", className: "AuSuper" },
      { id: 2, country: "US", className: "AuSuper" }
    ])
  })

  it("should return assets that are relevant for drawdown in the current year", () => {
    const year = 2024
    const result = getSuperAssetsRelevantForDrawdown({ assets, year, mandatoryDrawdownPercentages })
    expect(result).toEqual([
      { id: 3, country: "US", className: "AuSuper", drawdownFrom: 2024 },
      { id: 4, country: "US", className: "AuSuper", drawdownFrom: 2022 },
      { id: 5, country: "AU", className: "AuSuper", drawdownFrom: 2021 }
    ])
  })
})
