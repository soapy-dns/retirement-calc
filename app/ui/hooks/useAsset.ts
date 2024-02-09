import { IAsset } from "@/app/lib/data/schema/config"
import { getRandomKey } from "@/app/lib/utils/getRandomKey"
import { useContext } from "react"
import { ScenarioContext } from "../context/ScenarioContext"

export const useAsset = () => {
  const { selectedScenario, updateScenario, calculationResults } = useContext(ScenarioContext)

  const getAssetDetails = (id: string) => {
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
    console.log("--assetErrors--", asset.name, assetErrors)

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
    selectedScenario.assets = assets

    const { success } = await updateScenario(selectedScenario)
    return { success }
  }

  const removeAsset = async (id: string): Promise<{ success: boolean }> => {
    const newAssets = [...selectedScenario.assets]

    const index = selectedScenario?.assets.findIndex((it) => it.id === id) || 0
    if (index === -1) throw new Error(`Asset ${id} not found`)

    newAssets.splice(index, 1)
    selectedScenario.assets = newAssets

    const { success } = await updateScenario(selectedScenario)
    return { success }
  }

  const addAsset = async (asset: Omit<IAsset, "id">): Promise<{ success: boolean }> => {
    const newAssets = [...selectedScenario.assets].concat({ ...asset, id: getRandomKey() })

    newAssets.sort((a, b) => {
      if (a.className > b.className) return 1
      if (a.className < b.className) return -1
      return 0
    })

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
