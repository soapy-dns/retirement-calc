import { Asset } from "./Asset"
import { AssetClass, InflationContext } from "@/app/lib/calculations/types"
import { DefinedBenefitAssetProps, YearData } from "./types"

import { getPercDrawdownTaxable, getPercIncomeTaxable } from "../tax/utils"
import { DefinedBenefitsContext, Transfer } from "../../data/schema/config"

export class Salary extends Asset {
  capitalAsset: boolean
  assetClass: AssetClass
  percOfEarningsTaxable: number
  percOfDrawdownTaxable: number
  income?: number
  incomeStartYear?: number
  incomeEndYear?: number
  inflationContext: InflationContext
  salaryContext: DefinedBenefitsContext // FIXME:
  transfers?: Transfer[]

  constructor(assetConfig: DefinedBenefitAssetProps, inflationContext: InflationContext) {
    // is income producing - it has to be - that is all it does
    super({
      ...assetConfig,
      incomeProducing: true,
      canDrawdown: false // can never drawdown from a defined benefit income stream
    })

    this.capitalAsset = false
    this.assetClass = AssetClass.income_salary
    const { value, startingYear, income = 0, scenario, incomeStartYear, incomeEndYear } = assetConfig
    const {
      context: { taxResident, definedBenefitsAu }
    } = scenario
    this.percOfEarningsTaxable = getPercIncomeTaxable(taxResident, assetConfig.country, this.assetClass)
    this.percOfDrawdownTaxable = getPercDrawdownTaxable(taxResident, assetConfig.country, this.assetClass)
    this.income = income
    this.incomeStartYear = incomeStartYear
    this.incomeEndYear = incomeEndYear
    this.inflationContext = inflationContext
    this.salaryContext = definedBenefitsAu // FIXME:

    // I don't believe this should ever occur but typescript makes me.  maybe there is a better way
    this.history.push({ value, year: startingYear, income, transferAmt: 0 })
  }

  calcNextYear = (yearData: YearData): YearData => {
    const { year } = yearData

    let newIncome
    if (
      !this.income ||
      (this.incomeEndYear && this.incomeEndYear < year) ||
      (this.incomeStartYear && this.incomeStartYear > year)
    ) {
      newIncome = 0
    } else {
      const inflationFactor = this.inflationContext[year - 1] ? this.inflationContext[year - 1].factor : 1

      newIncome = this.income * inflationFactor
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
    return AssetClass.other
  }
}
