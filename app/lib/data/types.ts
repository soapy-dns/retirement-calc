import { Country } from "@/app/lib/calculations/tax/taxCalcs/types"
import { BasicYearData } from "@/app/lib/calculations/types"
import { DrawdownYearData, YearData } from "@/app/lib/calculations/assets/types"
import { Transfer } from "@/app/lib/calculations/transfers/types"

export interface IScenario {
  id: string
  name: string
  description?: string
  assets: IAsset[]
  context: ContextData
  transfers?: Transfer[]
}

// TODO: move to be near the Select component
export interface ISelectOption {
  value: string
  label: string
  disabled?: boolean
}

// TODO: Can we make some of these eg income conditional on className?
export interface IAsset {
  id: string
  name: string
  description: string
  className: string
  value: number
  assetOwners: string[]
  income?: number
  // incomeProducing?: boolean
  incomeBucket?: boolean
  canDrawdown?: boolean
  drawdownFrom?: number
  drawdownOrder?: number
  // drawdownTaxed?: boolean
  percOfEarningsTaxable?: number
  preferredMinAmt?: number
  isRented?: boolean
  rentalIncomePerMonth?: number
  rentalExpensesPerMonth?: number
  incomeEndYear?: number
  country: Country
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

export interface CashContext {
  interestRate: number
}

export interface DefinedBenefitsContext {
  useInflationRate: boolean
  indexationRate?: number // should be required if useInflationRate === true
}

export interface PropertyContext {
  growthInterestRate: number
  incomeTaxRate?: number
}

export interface SharesContext {
  growthInterestRate: number
  dividendInterestRate: number
}

export interface SuperContext {
  investmentReturn: number // net of fees but not taxation
  taxationRate: number
}

export interface InflationRecord {
  fromYear: number
  inflationRate: number
}

export interface LivingExpensesRecord {
  fromYear: number
  amountInTodaysTerms: number
}

export interface ContextData {
  taxResident: Country
  au2ukExchangeRate?: number // TODO: make this more generic
  currency: Country
  numOfYears?: number
  // owners: Owner[]
  owners: string[]
  auBank: CashContext
  definedBenefitsAu: DefinedBenefitsContext
  property: PropertyContext // should have one per country
  sharesAu?: SharesContext
  superAu?: SuperContext
  definedBenefitsUk?: DefinedBenefitsContext
  inflation: InflationRecord[]
  livingExpenses: LivingExpensesRecord[]
}
