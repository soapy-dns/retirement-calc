// import { Country } from "@/app/lib/calculations/tax/taxCalcs/types"

export const AssetType = {
  AuBank: "AuBank",
  AuDefinedBenefits: "AuDefinedBenefits",
  AuProperty: "AuProperty",
  AuShares: "AuShares",
  AuSuper: "AuSuper",
  Salary: "Salary"
}

// export interface IScenario {
//   id: string
//   name: string
//   description?: string
//   assets: IAsset[]
//   context: ContextConfig
//   transfers?: Transfer[]
// }

// TODO: move to be near the Select component
export interface ISelectOption {
  value: string
  label: string
  disabled?: boolean
}

// TODO: Can we make some of these eg income conditional on className?
// export interface IAsset {
//   id: string
//   name: string
//   description: string
//   className: string
//   value: number
//   assetOwners: string[]
//   income?: number
//   incomeBucket?: boolean
//   canDrawdown?: boolean
//   drawdownFrom?: number
//   drawdownOrder?: number
//   // drawdownTaxed?: boolean
//   // percOfEarningsTaxable?: number
//   preferredMinAmt?: number
//   isRented?: boolean
//   rentalIncomePerMonth?: number
//   rentalExpensesPerMonth?: number
//   incomeStartYear?: number
//   incomeEndYear?: number
//   country: Country
// }

export interface IncomeConfig {
  name: string
  description: string
  className: string
  value: number
  owners: string[]
  initialIncome: number // first year.
  percTaxFree: number
}

// export interface CashContext {
//   interestRate: number
// }

// export interface DefinedBenefitsContext {
//   useInflationRate: boolean
//   indexationRate?: number // should be required if useInflationRate === true
// }

// export interface PropertyContext {
//   growthInterestRate: number
//   incomeTaxRate?: number
// }

// export interface SharesContext {
//   growthInterestRate: number
//   dividendInterestRate: number
// }

// export interface SuperContext {
//   investmentReturn: number // net of fees but not taxation
//   taxationRate: number
// }

// export interface InflationRecord {
//   fromYear: number
//   inflationRate: number
// }

// export interface LivingExpensesRecord {
//   fromYear: number
//   amountInTodaysTerms: number
// }

// export interface ContextConfig {
//   taxResident: Country
//   au2ukExchangeRate?: number // TODO: make this more generic
//   currency: Country
//   numOfYears?: number
//   // owners: Owner[]
//   owners: string[]
//   auBank: CashContext
//   definedBenefitsAu: DefinedBenefitsContext
//   property: PropertyContext // should have one per country
//   sharesAu?: SharesContext
//   superAu?: SuperContext
//   // definedBenefitsUk?: DefinedBenefitsContext
//   inflation: InflationRecord[]
//   livingExpenses: LivingExpensesRecord[]
// }
