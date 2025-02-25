import { IAsset, IScenario } from "../../data/schema/config"
import { AutomatedDrawdown } from "../autoDrawdowns/types"

export interface BasicYearData {
  year: number
  value: number
}

export interface CalculationData {
  [dataType: string]: BasicYearData[]
}

export interface YearData extends BasicYearData {
  transferAmt?: number
  incomeCalc?: string
  income: number
  incomeFromAssets?: number // will only be populated if income bucket
  growth?: number // for Property / Share Calculators TODO: as above
  surplusAdjustment?: number // this being option kind of indicates I'm doing something incorrect as far as typescript is concerned
  automatedAssetDrawdownAmt?: number
}

export interface DrawdownYearData extends BasicYearData {
  autoDrawdownAmt: number
  automatedDrawdowns: AutomatedDrawdown[]
}

// this this is duplicated so commented out
// export interface YearsTaxData extends BasicYearData {
//   totalTaxableAmt: number
//   totalIncomeAmt: number
//   taxableDrawdownsAmt: number
//   taxableAutomatedDrawdownAmt: number
// }

export interface ExpenseYearData extends BasicYearData {
  livingExpenses: number
  taxes: number
}

export interface Earning {
  id: string
  name: string
  description?: string
  owner: string
  income?: number
  percOfIncomeTaxable: number
  proportion: number
  history: BasicYearData[]
}

interface Heading {
  value: string
}

export type Cell = YearData | Heading | BasicYearData | Earning

export interface Income {
  history: YearData[]
}

// export interface Tax {
//   owner: string
//   history: YearsTaxData[]
// }

// this should be renamed i think
export interface AssetConfig extends Omit<IAsset, "className"> {
  scenario: IScenario
  startingYear: number
  rentalIncomePerMonth?: number
  rentalExpensesPerMonth?: number
}

export interface DefinedBenefitAssetProps extends AssetConfig {
  income?: number // will default to 0
}

export interface LivingExpensesYearData {
  numYears: number
  amountInTodaysTerms: number
}

// TODO: these should be in calculations types area
export interface SurplusYearData extends BasicYearData {
  automatedAssetDrawdownAmt: number
  adjustedAsset: string
}
export interface AssetData {
  [key: string]: BasicYearData[]
}

export interface SurplusRowData {
  [key: string]: SurplusYearData[]
}
export interface IncomeRowData {
  [key: string]: DrawdownYearData[]
}

export interface InflationContext {
  [year: number]: {
    inflation: number
    factor: number
  }
}

export interface AssetSplitItem {
  assetClass: string
  fraction: number
}

export interface ValidationIssue {
  code: string
  message: string
  path: Array<number | string>
}
interface CalculationResultsFail {
  success: false
  calculationMessage: string
  errors?: ValidationIssue[]
}

interface CalculationResultsSuccess {
  success: true
  calculationMessage: string
  yearRange: number[]
  assetRowData: AssetData
  totalAssetsData: BasicYearData[]
  netPresentValue: BasicYearData[]
  totalAssetIncome: BasicYearData[]
  totalExpensesData: ExpenseYearData[]
  assetIncomeRowData: AssetData
  totalDrawdownData: DrawdownYearData[]
  drawdownRowData: AssetData
  surplusRowData: SurplusRowData
  expensesRowData: AssetData
  incomeTaxesData: BasicYearData[]
  earningsTaxesData: BasicYearData[]
  totalTaxesData: BasicYearData[]
  inflationContext: InflationContext
  assetSplitYearly: Record<number, AssetSplitItem[]>
  calculatedAssetData: AssetData
  calculatedAssetNpvData: AssetData
  graphIncomeNpvData: AssetData
  incomeTaxesByOwner: AssetData
  incomeByOwner: AssetData
  totalTaxableAmtDataByOwner: AssetData
  accumulatedTaxData: BasicYearData[]
  accumulatedNpvTaxData: BasicYearData[]
  calculatedEndYear: number
  maxEndYear: number
}

export type CalculationResults = CalculationResultsSuccess | CalculationResultsFail

export enum CapitalAssetGroup {
  property = "property",
  shares = "shares",
  cash = "cash",
  super = "super"
  // income_defined_benefit = "income_defined_benefit",
  // income_salary = "income_salary",
  // other = "other"
}

export enum IncomeAssetGroup {
  income_defined_benefit = "income_defined_benefit",
  income_salary = "income_salary"
}
export enum AssetGroup {
  property = "property",
  shares = "shares",
  cash = "cash",
  super = "super",
  income_defined_benefit = "income_defined_benefit",
  income_salary = "income_salary",
  other = "other"
}
