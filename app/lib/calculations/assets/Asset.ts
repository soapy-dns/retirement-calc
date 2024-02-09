import { AssetConfig, YearData } from "./types"
import { AssetClass } from "@/app/lib/calculations/types"
import { Country } from "../tax/taxCalcs/types"
import { getPercIncomeTaxable } from "../tax/utils"

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
  history: YearData[] = [] // Maybe better not an array
  id: string
  name = "UnNamed Asset"
  description
  incomeProducing = false
  assetOwners
  scenario // TODO: Why do I need scenarop here?
  abstract readonly percOfEarningsTaxable: number
  abstract readonly percOfDrawdownTaxable: number // eg defined contributions which will have 25% tax free in UK
  incomeBucket = false
  canDrawdown = true
  preferredMinAmt
  drawdownOrder
  drawdownFrom // year from which we can start to drawdown
  // propertyRented = false
  rentalIncomePerMonth // TODO: move to subclass
  rentalExpensesPerMonth // move to subclass
  country: Country
  public abstract capitalAsset: boolean
  abstract readonly assetClass: AssetClass

  // TODO: can this be improved -> https://www.digitalocean.com/community/tutorials/how-to-use-classes-in-typescript
  constructor(props: Props) {
    const {
      id,
      name,
      description,
      incomeProducing,
      assetOwners,
      incomeBucket,
      canDrawdown,
      drawdownFrom,
      preferredMinAmt,
      drawdownOrder,
      scenario,
      // percOfEarningsTaxable = 100,
      rentalIncomePerMonth,
      rentalExpensesPerMonth,
      country = "AU"
    } = props

    this.id = id
    this.name = name
    this.description = description
    this.incomeProducing = incomeProducing
    this.assetOwners = assetOwners
    this.incomeBucket = incomeBucket || false
    this.canDrawdown = canDrawdown || false
    this.preferredMinAmt = preferredMinAmt || 0
    this.drawdownOrder = drawdownOrder || 99
    this.scenario = scenario
    // this.percOfEarningsTaxable = percOfEarningsTaxable
    this.drawdownFrom = drawdownFrom
    this.rentalIncomePerMonth = rentalIncomePerMonth
    this.rentalExpensesPerMonth = rentalExpensesPerMonth
    this.country = country
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
  abstract calcNextYear(yearData: YearData, assets: Asset[]): YearData
}
