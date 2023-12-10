import { IAsset, IScenario } from "../../data/types"
import { AutomatedDrawdown } from "../autoDrawdowns/types"
import { Calculator } from "../calculator/Calculator"

export interface BasicYearData {
  year: number
  value: number
}

export interface CalculationData {
  [dataType: string]: BasicYearData[]
}

// import { AutomatedDrawdown } from "../../autoDrawdowns/types"
// import { Calculator } from "../../calculator/Calculator"
// import { IAsset, IScenario } from "../../../data/types"
// import { BasicYearData } from "calculations/types"

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

export interface YearsTaxData extends BasicYearData {
  totalTaxableAmt: number
  taxableEarningsAmt: number
  taxableDrawdownsAmt: number
  taxableAutomatedDrawdownAmt: number
}

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
  percOfEarningsTaxable: number
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

export interface Tax {
  owner: string
  history: YearsTaxData[]
}

// this should be renamed i think
export interface AssetConfig extends Omit<IAsset, "className"> {
  scenario: IScenario
  startingYear: number
  rentalIncomePerMonth?: number
  rentalExpensesPerMonth?: number
  calculator?: Calculator
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
  [key: string]: YearData[] | BasicYearData[]
}
// TODO: can simplify these interfaces into 1
export interface RowData {
  [key: string]: YearData[] | BasicYearData[]
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

export interface CalculationResults {
  yearRange: number[]
  assetRowData: AssetData
  totalAssetsData: BasicYearData[]
  netPresentValue: BasicYearData[]
  totalEarningsData: BasicYearData[]
  totalExpensesData: ExpenseYearData[]
  earningsRowData: RowData
  drawDownRowData: IncomeRowData
  surplusRowData: SurplusRowData
  expensesRowData: RowData
  calculationMessage: string
  inflationContext: InflationContext
  assetSplit: AssetSplitItem[]
  calculatedAssetData: AssetData
  calculatedAssetNpvData: AssetData
  graphIncomeNpvData: AssetData
}

export enum AssetClass {
  property = "property",
  shares = "shares",
  cash = "cash",
  super = "super",
  income = "income",
  other = "other"
}
