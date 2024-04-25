import { Asset } from "./Asset"
import { AssetGroup, InflationContext } from "@/app/lib/calculations/types"
import { YearData } from "./types"

import { getPercDrawdownTaxable, getPercIncomeTaxable } from "../tax/utils"
import { DefinedBenefitsContext, IAsset, IScenario, Transfer } from "../../data/schema/config"

export class Salary extends Asset {
  capitalAsset: boolean
  assetGroup: AssetGroup
  percOfIncomeTaxable: number
  percOfDrawdownTaxable: number
  incomeAmount: number
  incomeStartYear?: number
  incomeEndYear?: number
  inflationContext: InflationContext
  salaryContext: DefinedBenefitsContext // FIXME:
  transfers?: Transfer[]

  constructor(assetConfig: IAsset, startingYear: number, scenario: IScenario, inflationContext: InflationContext) {
    if (assetConfig.className !== "Salary") throw new Error("Invalid config for Salary")

    super({
      ...assetConfig,
      incomeProducing: true
    })

    this.capitalAsset = false
    this.assetGroup = AssetGroup.income_salary
    const {
      context: { taxResident, definedBenefitsAu }
    } = scenario
    this.percOfIncomeTaxable = getPercIncomeTaxable(taxResident, assetConfig.country, this.assetGroup)
    this.percOfDrawdownTaxable = getPercDrawdownTaxable(taxResident, assetConfig.country, this.assetGroup)

    const { income } = assetConfig
    const { incomeAmt: incomeAmount, incomeStartYear, incomeEndYear } = income
    this.incomeAmount = incomeAmount
    this.incomeStartYear = incomeStartYear
    this.incomeEndYear = incomeEndYear
    this.inflationContext = inflationContext
    this.salaryContext = definedBenefitsAu // FIXME:

    this.history.push({ value: 0, year: startingYear, income: incomeAmount })
  }

  calcNextYear = (yearData: YearData): YearData => {
    const { year } = yearData

    let newIncome
    if (
      !this.incomeAmount ||
      (this.incomeEndYear && this.incomeEndYear < year) ||
      (this.incomeStartYear && this.incomeStartYear > year)
    ) {
      newIncome = 0
    } else {
      const rateVarianceFactor = this.rateVariation ? this.rateVariation + 1 : 1

      const adjustmentFactor = this.inflationContext[year - 1]
        ? this.inflationContext[year - 1].factor * rateVarianceFactor
        : 1

      newIncome = this.incomeAmount * adjustmentFactor
    }

    const nextYearData = {
      year: year + 1,
      value: 0,
      income: Math.round(newIncome)
    }

    this.history.push(nextYearData)
    return nextYearData // TODO: do we need to return this?
  }
  getAssetClass = () => {
    return AssetGroup.other
  }
}
