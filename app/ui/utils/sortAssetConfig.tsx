import { CapitalAsset, IAsset, IncomeAsset } from "@/app/lib/data/schema/config"
import { isCapitalAsset, isIncomeAsset } from "."

export const sortAssetConfig = (assets: IAsset[]) => {
  const newAssets = [...assets]
  newAssets.sort((a, b) => {
    if (a.className > b.className) return 1
    if (a.className < b.className) return -1

    // both have same asset className
    if (isCapitalAsset(a.className)) {
      const capitalA = a as CapitalAsset
      const capitalB = b as CapitalAsset
      if (capitalA.value > capitalB.value) return 1
      if (capitalA.value < capitalB.value) return -1
    }

    if (isIncomeAsset(a.className)) {
      const incomeA = a as IncomeAsset
      const incomeB = b as IncomeAsset
      if (incomeA.income > incomeB.income) return 1
      if (incomeA.income < incomeB.income) return -1
    }
    return 0
  })

  return newAssets
}
