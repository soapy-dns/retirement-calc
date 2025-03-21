import { useContext } from "react"
import { ScenarioContext } from "../context/scenario/ScenarioContext"

export const useAssets = () => {
  const { selectedScenario } = useContext(ScenarioContext)

  const ownerHasAssets = (ownerId: string): boolean => {
    const foundAsset = selectedScenario?.assets.find((asset) => asset.assetOwners.includes(ownerId))
    return !!foundAsset
  }

  return {
    ownerHasAssets
  }
}
