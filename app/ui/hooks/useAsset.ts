import { IAsset } from "@/app/lib/data/schema/config"
import { getRandomKey } from "@/app/lib/utils/getRandomKey"
import { useContext } from "react"
import { ScenarioContext } from "../context/scenario/ScenarioContext"
import { sortAssetConfig } from "../utils/sortAssetConfig"

export const useAsset = () => {
  const { selectedScenario, updateScenario, calculationResults } = useContext(ScenarioContext)

  const getAssetDetails = (id: string): IAsset | undefined => {
    const foundAsset = selectedScenario?.assets.find((asset) => asset.id === id)
    return foundAsset
  }

  const hasValidationErrors = (asset: IAsset): boolean => {
    if (!calculationResults || calculationResults.success) return false

    const { errors } = calculationResults

    if (!errors) return false
    const assetErrors = errors.filter((it) => it.path[0] === "assets")

    if (!assetErrors) return false
    const assets = [...selectedScenario.assets]
    const index = assets.findIndex((it) => it.id === asset.id) || 0
    const matchingAssets = assetErrors.filter((it) => it.path[1] === index)

    return matchingAssets.length > 0
  }

  const hasTransfers = (asset: IAsset): boolean => {
    if (!selectedScenario?.transfers) return false
    const foundTransfer = selectedScenario?.transfers?.find(
      (transfer) => transfer.from === asset.id || transfer.to === asset.id
    )
    return !!foundTransfer
  }

  const updateAsset = async (asset: IAsset): Promise<{ success: boolean }> => {
    const assets = [...selectedScenario.assets]
    const index = assets.findIndex((it) => it.id === asset.id) || 0

    assets.splice(index, 1, asset)

    const newAssets = sortAssetConfig(assets)

    selectedScenario.assets = newAssets

    const { success } = await updateScenario(selectedScenario)
    return { success }
  }

  const removeAsset = async (id: string): Promise<{ success: boolean }> => {
    const assets = [...selectedScenario.assets]

    const index = assets.findIndex((it) => it.id === id) || 0
    if (index === -1) throw new Error(`Asset ${id} not found`)

    assets.splice(index, 1)

    const newAssets = sortAssetConfig(assets)

    selectedScenario.assets = newAssets

    const { success } = await updateScenario(selectedScenario)
    return { success }
  }

  const addAsset = async (assetConfig: Omit<IAsset, "id">): Promise<{ success: boolean }> => {
    const oldAssets: IAsset[] = [...selectedScenario.assets]
    const additionalAsset = { ...assetConfig, id: getRandomKey() } as IAsset

    const newAssets = sortAssetConfig(oldAssets.concat([additionalAsset]))

    selectedScenario.assets = newAssets

    const { success } = await updateScenario(selectedScenario)
    return { success }
  }

  return {
    getAssetDetails,
    addAsset,
    updateAsset,
    removeAsset,
    hasTransfers,
    hasValidationErrors
  }
}
