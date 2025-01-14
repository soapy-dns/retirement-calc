import { IScenario } from "../../data/schema/config"

export const applyPropertyCrash = (scenario: IScenario) => {
  const updatedAssets = scenario.assets.map((asset) => {
    if (asset.className === "AuProperty") {
      return {
        ...asset,
        value: asset.value * 0.9
      }
    }
    return asset
  })

  const stressedScenario = { ...scenario, assets: updatedAssets }
  return stressedScenario
}
