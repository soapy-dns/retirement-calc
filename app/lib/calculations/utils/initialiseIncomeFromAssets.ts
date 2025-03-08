import { isIncomeProducingAsset } from "@/app/ui/utils"
import { Asset } from "../assets/Asset"
import { AssetIncome } from "../assets/types"

/**
 * Builds an array of 'income' details based on the Assets
 * TODO: asset proportion
 */
export const initialiseIncomeFromAssets = (assets: Asset[]): AssetIncome[] => {
  const incomeFromAssets: AssetIncome[] = []

  const incomeProducingAssets = assets.filter((asset) => isIncomeProducingAsset(asset))

  incomeProducingAssets.forEach((asset) => {
    const { ownerIds, id, name, className, description, percOfIncomeTaxable } = asset
    const proportion = 1 / ownerIds.length
    ownerIds.forEach((ownerId) => {
      incomeFromAssets.push({
        id,
        name,
        className,
        description,
        ownerId,
        percOfIncomeTaxable,
        proportion: proportion,
        history: []
      })
    })
  })

  return incomeFromAssets
}
