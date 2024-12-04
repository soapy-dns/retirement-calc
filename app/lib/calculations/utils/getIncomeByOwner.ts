import { OwnerType } from "../../data/schema/config"
import { AssetIncome } from "../assets/types"
import { AssetData } from "../types"
import { accumToBasicYearData } from "./accumToBasicYearData"

interface Props {
  owners: OwnerType[]
  incomeFromAssets: AssetIncome[]
}

export const getIncomeByOwner = ({ owners, incomeFromAssets }: Props) => {
  return owners.reduce((accum, owner) => {
    const filteredAssets = incomeFromAssets.filter((it) => it.ownerId === owner.identifier)
    accum[owner.ownerName] = accumToBasicYearData(filteredAssets.map((it) => it.history).flat() || 0)
    return accum
  }, {} as AssetData)
}
