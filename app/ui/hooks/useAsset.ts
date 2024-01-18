import { IAsset } from "@/app/lib/data/schema"
import { getRandomKey } from "@/app/lib/utils/getRandomKey"
import { useContext } from "react"
import { ScenarioContext } from "../context/ScenarioContext"

export const useAsset = () => {
  const { selectedScenario, updateScenario } = useContext(ScenarioContext)

  const getAssetDetails = (id: string) => {
    const foundAsset = selectedScenario?.assets.find((asset) => asset.id === id)
    return foundAsset
  }

  const hasTransfers = (asset: IAsset): boolean => {
    if (!selectedScenario?.transfers) return false
    const foundTransfer = selectedScenario?.transfers?.find(
      (transfer) => transfer.from === asset.id || transfer.to === asset.id
    )
    return !!foundTransfer
  }

  const updateAsset = (asset: IAsset) => {
    const assets = [...selectedScenario.assets]
    const index = assets.findIndex((it) => it.id === asset.id) || 0

    assets.splice(index, 1, asset)
    selectedScenario.assets = assets

    updateScenario(selectedScenario)
  }

  const removeAsset = (id: string) => {
    const newAssets = [...selectedScenario.assets]

    const index = selectedScenario?.assets.findIndex((it) => it.id === id) || 0
    if (index === -1) throw new Error(`Asset ${id} not found`)

    newAssets.splice(index, 1)
    selectedScenario.assets = newAssets

    updateScenario(selectedScenario)
  }

  const addAsset = (asset: Omit<IAsset, "id">) => {
    const newAssets = [...selectedScenario.assets].concat({ ...asset, id: getRandomKey() })

    newAssets.sort((a, b) => {
      if (a.className > b.className) return 1
      if (a.className < b.className) return -1
      return 0
    })

    selectedScenario.assets = newAssets

    updateScenario(selectedScenario)
  }

  return {
    getAssetDetails,
    addAsset,
    updateAsset,
    removeAsset,
    hasTransfers
  }
}
