import { AssetGroup } from "@/app/lib/calculations/types"
import { ISelectOption } from "@/app/lib/data/types"

export const assetTypeOptions = [
  {
    label: "Defined benefits pension",
    value: "AuDefinedBenefits",
    // income: true,
    // property: false,
    assetClass: AssetGroup.income_defined_benefit
  },
  { label: "Salary", value: "Salary", income: true, property: false, assetClass: AssetGroup.income_salary },
  {
    label: "Defined contributions pension",
    value: "AuSuper",
    // income: false,
    // property: false,
    assetClass: AssetGroup.super
  },
  { label: "Shares", value: "AuShares", assetClass: AssetGroup.shares },
  { label: "Property", value: "AuProperty", assetClass: AssetGroup.property },
  { label: "Cash", value: "AuBank", assetClass: AssetGroup.cash }
]

// TODO: I don't think this is used now
// export const getRealAssets = () => assetTypeOptions.filter((it) => it.assetClass !== AssetClass.income)

export const drawdownOrderOptions: ISelectOption[] = [
  { label: "1st", value: "10" },
  { label: "2nd", value: "20" },
  { label: "3rd", value: "30" },
  { label: "4th", value: "40" },
  { label: "5th", value: "50" }
]
