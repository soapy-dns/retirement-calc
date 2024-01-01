import { AssetClass } from "@/app/lib/calculations/types"
import { ISelectOption } from "@/app/lib/data/types"

export const assetTypeOptions = [
  {
    label: "Defined benefits pension",
    value: "AuDefinedBenefits",
    income: true,
    property: false,
    assetClass: AssetClass.income_defined_benefit
  },
  { label: "Salary", value: "Salary", income: true, property: false, assetClass: AssetClass.income_salary },
  {
    label: "Defined contributions pension",
    value: "AuSuper",
    income: false,
    property: false,
    assetClass: AssetClass.super
  },
  { label: "Shares", value: "AuShares", income: false, property: false, assetClass: AssetClass.shares },
  { label: "Property", value: "AuProperty", income: false, property: true, assetClass: AssetClass.property },
  { label: "Cash", value: "AuBank", income: false, property: false, assetClass: AssetClass.cash }
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
