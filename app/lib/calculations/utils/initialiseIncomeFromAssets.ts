import { Asset } from "../assets/Asset"
import { AssetIncome } from "../assets/types"
import { Country } from "../tax/taxCalcs/types"
import { getPercIncomeTaxable } from "../tax/utils"

/**
 * Builds an array of 'income' details based on the Assets
 * TODO: asset proportion
 */
export const initialiseIncomeFromAssets = (assets: Asset[]): AssetIncome[] => {
  const incomeFromAssets: AssetIncome[] = []

  const incomeProducingAssets = assets.filter((it) => it.incomeProducing === true)
  incomeProducingAssets.forEach((asset) => {
    const { assetOwners, id, name, description, percOfIncomeTaxable } = asset
    const proportion = 1 / assetOwners.length
    assetOwners.forEach((assetOwner) => {
      incomeFromAssets.push({
        id,
        name,
        description,
        owner: assetOwner,
        percOfIncomeTaxable,
        proportion: proportion,
        history: []
      })
    })
  })

  return incomeFromAssets
}
