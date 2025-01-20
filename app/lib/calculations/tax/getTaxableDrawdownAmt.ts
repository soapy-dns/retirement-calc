import { Transfer } from "../../data/schema/config"
import { Asset } from "../assets/Asset"
import { AutomatedDrawdown } from "../autoDrawdowns/types"

/**
 * Get the amount of drawdowns that are taxable for a given owner.  If an asset is shared it is assumed to be 50:50
 */
export const getTaxableDrawdownAmt = (
  automatedDrawdownsForYear: AutomatedDrawdown[],
  ownerId: string,
  assets: Asset[]
): number => {
  if (!automatedDrawdownsForYear) return 0

  const taxableDrawdownAmt = automatedDrawdownsForYear?.reduce((accum, drawdown) => {
    const { from, value } = drawdown

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
