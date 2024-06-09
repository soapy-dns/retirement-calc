export const AssetType = {
  AuBank: "AuBank",
  AuDefinedBenefits: "AuDefinedBenefits",
  AuProperty: "AuProperty",
  AuShares: "AuShares",
  AuSuper: "AuSuper",
  Salary: "Salary"
}

// TODO: move to be near the Select component
export interface ISelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface IncomeConfig {
  name: string
  description: string
  className: string
  value: number
  owners: string[]
  initialIncome: number // first year.
  percTaxFree: number
}
