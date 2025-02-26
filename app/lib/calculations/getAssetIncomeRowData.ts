import { OwnerType } from "../data/schema/config"
import { AssetIncome } from "./assets/types"
import { AssetData } from "./types"

interface Props {
  incomeFromAssets: AssetIncome[]
  owners: OwnerType[]
}

/*
  This doesn't get used.  It doesn't work because there is no apparent return on super or property.
*/
export const getAssetIncomeRowData = ({ incomeFromAssets, owners }: Props) => {
  const assetIncomeRowData = incomeFromAssets.reduce((accum: AssetData, assetIncome: AssetIncome) => {
    const ownerName = owners.find((owner) => owner.identifier === assetIncome.ownerId)?.ownerName || "Unknown"
    accum[`${assetIncome.name} - ${ownerName}`] = assetIncome.history
    return accum
  }, {}) as AssetData

  return assetIncomeRowData
}
