import { CapitalAsset, IAsset, IncomeAsset } from "@/app/lib/data/schema/config"
import { isCapitalAsset, isIncomeAsset } from "."

const classNameSortOrder = { Salary: 1, AuProperty: 2, AuSuper: 3, AuDefinedBenefits: 4, AuBank: 5, AuShares: 6 }

export const sortAssetConfig = (assets: IAsset[]) => {
  console.log("sortAssetConfig")
  const newAssets = [...assets]
  newAssets.sort((a, b) => {
    if (classNameSortOrder[a.className] > classNameSortOrder[b.className]) return 1
    if (classNameSortOrder[a.className] < classNameSortOrder[b.className]) return -1

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
