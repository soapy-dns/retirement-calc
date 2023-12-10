import { AutomatedDrawdown } from "../../autoDrawdowns/types"
import { Calculator } from "../../calculator/Calculator"
import { IAsset, IScenario } from "../../../data/types"
import { BasicYearData } from "../../types"

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
