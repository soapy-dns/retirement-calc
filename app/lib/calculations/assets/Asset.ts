import { YearData } from "./types"
import { AssetGroup } from "@/app/lib/calculations/types"
import { Country } from "../tax/taxCalcs/types"
import { AssetClass, CashAsset, IAsset, LiquidAsset } from "../../data/schema/config"
import { isCashAsset, isLiquidAsset } from "@/app/ui/utils"

type Props = IAsset & {
  incomeProducing: boolean
}

/**
 * percOfDrawdownsTaxable for defined benefits in UK - built into the specific asset
 * percOfEarningsTaxable - when would we need this?
 * incomeProducing
 */
// TODO: need to have sub classes with the relevant properties
export abstract class Asset {
  className: AssetClass
  history: YearData[] = [] // Maybe better not an array
  id: string
  name = "UnNamed Asset"
  description
  incomeProducing = false
  assetOwners
  // scenario // TODO: Why do I need scenarop here?
  abstract readonly percOfEarningsTaxable: number
  abstract readonly percOfDrawdownTaxable: number // eg defined contributions which will have 25% tax free in UK
  incomeBucket = false
  canDrawdown = false
  preferredMinAmt = 0
  drawdownOrder
  drawdownFrom // year from which we can start to drawdown

  country: Country
  public abstract capitalAsset: boolean
  abstract readonly assetGroup: AssetGroup

  // TODO: can this be improved -> https://www.digitalocean.com/community/tutorials/how-to-use-classes-in-typescript
  constructor(assetConfig: Props) {
    const { id, className, name, description, incomeProducing, assetOwners, country = "AU" } = assetConfig

    this.id = id
    this.className = className
    this.name = name
    this.description = description
    this.incomeProducing = incomeProducing
    this.assetOwners = assetOwners
    this.country = country
    if (isLiquidAsset(className)) {
      const { canDrawdown, drawdown } = assetConfig as LiquidAsset
      if (isCashAsset(className)) {
        const { incomeBucket } = assetConfig as CashAsset
        this.incomeBucket = incomeBucket
      }

      this.canDrawdown = canDrawdown || false
      if (drawdown) {
        const { drawdownOrder, drawdownFrom = 99, preferredMinAmt = 0 } = drawdown
        this.drawdownFrom = drawdownFrom
        this.drawdownOrder = drawdownOrder
        this.preferredMinAmt = preferredMinAmt
      }
    }
  }

  getName = () => {
    return this.name
  }

  abstract getAssetClass(): AssetGroup

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
