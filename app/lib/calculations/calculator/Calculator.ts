import { Asset } from "../assets/Asset"
import { AssetConfig, YearData } from "../assets/types"
import { Transfer } from "@/app/lib/data/schema/config"

// export interface incomeCalculator {
//   config: unknown
// }

export abstract class Calculator {
  protected abstract config: object
  protected transfers: Transfer[] | undefined
  protected assetConfig: AssetConfig

  constructor(assetConfig: AssetConfig, transfers?: Transfer[]) {
    this.transfers = transfers

    this.assetConfig = assetConfig
  }

  abstract calculate(yearData: YearData, assets: Asset[]): YearData
}
