import { Asset } from "../assets/Asset"
import { Earning } from "../assets/types"
import { Country } from "../tax/taxCalcs/types"
import { getPercIncomeTaxable } from "../tax/utils"

/**
 * Builds an array of 'earnings' details based on the Assets
 * TODO: asset proportion
 */
export const initialiseEarningsFromAssets = (assets: Asset[]): Earning[] => {
  const earningsFromAssets: Earning[] = []

  const incomeProducingAssets = assets.filter((it) => it.incomeProducing === true)
  incomeProducingAssets.forEach((asset) => {
    const { assetOwners, id, name, description, percOfEarningsTaxable } = asset
    const proportion = 1 / assetOwners.length
    assetOwners.forEach((assetOwner) => {
      earningsFromAssets.push({
        id,
        name,
        description,
        owner: assetOwner,
        percOfEarningsTaxable,
        proportion: proportion,
        history: []
      })
    })
  })

  return earningsFromAssets
}
