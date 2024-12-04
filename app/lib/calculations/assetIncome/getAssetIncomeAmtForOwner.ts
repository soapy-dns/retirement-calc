import { get } from "lodash"
import { OwnerType } from "../../data/schema/config"
import { AssetIncome } from "../assets/types"

interface Props {
  year: number
  incomeFromAssets: AssetIncome[]
  owner: OwnerType
}

export const getAssetIncomeAmtForOwner = ({ year, incomeFromAssets, owner }: Props): number => {
  const ownerIncomeFromAssets = incomeFromAssets.filter((it) => it.ownerId === owner.identifier)
  const totalIncomeFromAssetsAmt = ownerIncomeFromAssets.reduce((accum, incomeDetails) => {
    const yearData = incomeDetails.history.find((it) => it.year === year)
    const incomeAmt = yearData?.value || 0
    return accum + incomeAmt
  }, 0)

  return totalIncomeFromAssetsAmt
}
