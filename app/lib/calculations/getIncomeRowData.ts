import { isEarnedIncomeAsset, isIncomeAsset, isInvestmentIncomeAsset } from "@/app/ui/utils"
import { OwnerType } from "../data/schema/config"
import { AssetIncome } from "./assets/types"
import { AssetData } from "./types"

interface Props {
  incomeFromAssets: AssetIncome[]
  owners: OwnerType[]
}

const getRowData = ({ incomeFromAssets, owners }: Props): AssetData => {
  const incomeRowData = incomeFromAssets.reduce((accum: AssetData, assetIncome: AssetIncome) => {
    const ownerName = owners.find((owner) => owner.identifier === assetIncome.ownerId)?.ownerName || "Unknown"
    accum[`${assetIncome.name} - ${ownerName}`] = assetIncome.history
    return accum
  }, {}) as AssetData

  return incomeRowData
}

export const getInvestmentIncomeRowData = ({ incomeFromAssets, owners }: Props): AssetData => {
  const investmentIncomeAssets = incomeFromAssets.filter((asset) => isInvestmentIncomeAsset(asset.className))

  return getRowData({ incomeFromAssets: investmentIncomeAssets, owners })
}

export const getEarnedIncomeRowData = ({ incomeFromAssets, owners }: Props): AssetData => {
  // TODO: naming could be better
  const earnedIncomeAssets = incomeFromAssets.filter((asset) => isIncomeAsset(asset.className))

  return getRowData({ incomeFromAssets: earnedIncomeAssets, owners })
}
