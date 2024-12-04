import { Transfer } from "../../data/schema/config"
import { Asset } from "../assets/Asset"

/**
 * Get the amount of drawdowns that are taxable for a given owner.  If an asset is shared it is assumed to be 50:50
 */
export const getTaxableDrawdownAmt = (transfersForYear: Transfer[], ownerId: string, assets: Asset[]): number => {
  if (!transfersForYear) return 0

  const taxableDrawdownAmt = transfersForYear?.reduce((accum, transfer) => {
    const { from, value = 0 } = transfer

    const matchingAsset = assets.find((asset) => {
      return asset.id === from
    })

    if (!matchingAsset) return accum

    const { ownerIds } = matchingAsset

    if (ownerIds.includes(ownerId)) {
      // eg in UK 25% of super drawdown is tax free.  This is calculated in the asset setup
      const increment = (value * matchingAsset.percOfDrawdownTaxable) / 100 / ownerIds.length
      return accum + increment
    }
    return accum
  }, 0)

  return Math.round(taxableDrawdownAmt)
}
