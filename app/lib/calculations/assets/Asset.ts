import { Calculator } from "../calculator/Calculator"
import { AssetConfig, YearData } from "./types"
import { AssetClass } from "@/app/lib/calculations/types"

interface Props extends AssetConfig {
  incomeProducing: boolean
}

/**
 * percOfDrawdownsTaxable for defined benefits in UK - built into the specific asset
 * percOfEarningsTaxable - when would we need this?
 * incomeProducing
 */
// TODO: need to have sub classes with the relevant properties
export abstract class Asset {
  calculator?: Calculator
  history: YearData[] = [] // Maybe better not an array
  id: string
  name = "UnNamed Asset"
  description
  incomeProducing = false
  assetOwners
  scenario
  percOfEarningsTaxable: number // The % of earnings which are taxable - eg defined benefits may have 25% tax free
  incomeBucket = false
  canDrawdown = true
  preferredMinAmt
  drawdownOrder
  drawdownFrom // year from which we can start to drawdown
  // propertyRented = false
  rentalIncomePerMonth // TODO: move to subclass
  rentalExpensesPerMonth // move to subclass
  public abstract capitalAsset: boolean

  // TODO: can this be improved -> https://www.digitalocean.com/community/tutorials/how-to-use-classes-in-typescript
  constructor(props: Props) {
    const {
      id,
      name,
      description,
      incomeProducing,
      assetOwners,
      calculator,
      incomeBucket,
      canDrawdown,
      drawdownFrom,
      preferredMinAmt,
      drawdownOrder,
      scenario,
      percOfEarningsTaxable = 100,
      rentalIncomePerMonth,
      rentalExpensesPerMonth
    } = props

    this.id = id
    this.name = name
    this.description = description
    this.incomeProducing = incomeProducing
    this.assetOwners = assetOwners
    this.calculator = calculator
    this.incomeBucket = incomeBucket || false
    this.canDrawdown = canDrawdown || false
    this.preferredMinAmt = preferredMinAmt || 0
    this.drawdownOrder = drawdownOrder || 99
    this.scenario = scenario
    this.percOfEarningsTaxable = percOfEarningsTaxable
    this.drawdownFrom = drawdownFrom
    this.rentalIncomePerMonth = rentalIncomePerMonth
    this.rentalExpensesPerMonth = rentalExpensesPerMonth
  }

  getName = () => {
    return this.name
  }

  abstract getAssetClass(): AssetClass

  // TODO: we can maybe change the structure of 'history'.  An array might not be optimal
  getYearData = (year: number): YearData => {
    const yearData = this.history.find((it) => it.year === year)
    if (!yearData) throw new Error(`No year data found for asset ${this.name}, year ${year}`)

    return yearData
  }

  getLatestYearData = (): YearData => {
    const yearData = this.history[this.history.length - 1]
    if (!yearData) throw new Error(`No year data found for ${this.name}`)
    return yearData
  }

  /**
   * Get min amount left for drawdown
   */
  getAmountLeft = (year: number) => {
    const history = this.getYearData(year)
    const preferredMinAmt = this.preferredMinAmt ?? 0
    return history ? history.value - preferredMinAmt : 0 // is returning 0 correct? FIXME:
  }

  // TODO: this is calculating and storing which is a bit ugly
  calcNextYear = (yearData: YearData, assets: Asset[]): YearData => {
    if (!this.calculator) throw new Error(`No calculator set for ${this.name}`)

    // TODO: just pass the latest Values (which is yearData) to the calculate metho
    const nextYearData = this.calculator.calculate(yearData, assets)

    this.history.push(nextYearData)

    return nextYearData
  }
}
