import { IScenario } from "../../data/schema/config"

export const applyMarketCrash = (scenario: IScenario) => {
  const updatedAssets = scenario.assets.map((asset) => {
    if (asset.className === "AuShares") {
      return {
        ...asset,
        value: asset.value * 0.8
      }
    } else if (asset.className === "AuSuper") {
      return {
        ...asset,
        value: asset.value * 0.7 * 0.8 + asset.value * 0.3
      }
    }
    return asset
  })

  const stressedScenario = { ...scenario, assets: updatedAssets }
  return stressedScenario
}
