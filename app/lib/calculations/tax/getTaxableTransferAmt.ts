import { Transfer } from "../../data/schema/config"
import { Asset } from "../assets/Asset"
import { getTransferFromAmt } from "../transfers/getTransferFromAmt"
import { getValueOfAssetAtYear } from "../transfers/getValueOfAssetAtYear"

/**
 * Get the amount of transfers that are taxable for a given owner.  If an asset is shared it is assumed to be 50:50
 */
export const getTaxableTransferAmt = (manualTransfers: Transfer[], ownerId: string, assets: Asset[]): number => {
  if (!manualTransfers) return 0

  const taxableDrawdownAmt = manualTransfers?.reduce((accum, transfer) => {
    const { from } = transfer

    // get the value of the transfer year for the asset.  I think there is a function for this  TODO:
    const matchingAsset = assets.find((asset) => {
      return asset.id === from
    })

    if (!matchingAsset) return accum

    const valueOfFromAssetAtYear = getValueOfAssetAtYear(matchingAsset, transfer.year)

    const transferFromAmt = getTransferFromAmt(transfer, valueOfFromAssetAtYear)

    const { ownerIds } = matchingAsset

    if (ownerIds.includes(ownerId)) {
      // eg in UK 25% of super drawdown is tax free.  This is calculated in the asset setup
      const increment = (transferFromAmt * matchingAsset.percOfDrawdownTaxable) / 100 / ownerIds.length
      return accum + increment
    }
    return accum
  }, 0)

  return Math.round(taxableDrawdownAmt)
}
