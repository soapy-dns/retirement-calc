import { IScenario } from "../../data/schema/config"

const SIZE_OF_CRASH = 0.3
const SUPER_EXPOSURE = 0.7

export const applyMarketCrash = (scenario: IScenario) => {
  const updatedAssets = scenario.assets.map((asset) => {
    if (asset.className === "AuShares") {
      return {
        ...asset,
        value: asset.value * (1 - SIZE_OF_CRASH)
      }
    } else if (asset.className === "AuSuper") {
      return {
        ...asset,
        value: asset.value * SUPER_EXPOSURE * (1 - SIZE_OF_CRASH) + asset.value * (1 - SUPER_EXPOSURE)
      }
    }
    return asset
  })

  const stressedScenario = { ...scenario, assets: updatedAssets }
  return stressedScenario
}
