import { AutomatedDrawdown } from "../../autoDrawdowns/types"
import { IScenario, IAsset } from "../../../data/schema/config"

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
  taxableIncomeAmt: number
  taxableDrawdownsAmt: number
  taxableAutomatedDrawdownAmt: number
}

export interface ExpenseYearData extends BasicYearData {
  livingExpenses: number
  taxes: number
}

export interface AssetIncome {
  id: string
  name: string
  description?: string
  // country: Country
  owner: string
  income?: number
  // assetClass: AssetClass
  percOfIncomeTaxable: number
  proportion: number
  history: BasicYearData[]
}

interface Heading {
  value: string
}

export type Cell = YearData | Heading | BasicYearData | AssetIncome

export interface Income {
  history: YearData[]
}

export interface Tax {
  owner: string
  history: YearsTaxData[]
}

export interface EarningsTax {
  owner: string
  history: BasicYearData[]
}

export interface LivingExpensesYearData {
  numYears: number
  amountInTodaysTerms: number
}
