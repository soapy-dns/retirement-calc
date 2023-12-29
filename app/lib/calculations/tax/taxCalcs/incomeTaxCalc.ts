import { ContextData } from "@/app/lib/data/types"
import { Asset } from "../../assets/Asset"

export abstract class IncomeTaxCalc {
  protected factor = 1

  constructor(factor: number) {
    this.factor = factor
  }

  getPercDrawdownTaxable(context: ContextData, asset: Asset) {
    console.log("--asset--", asset)
    console.log("--context--", context)
  }

  abstract getTax(income: number): number
}
