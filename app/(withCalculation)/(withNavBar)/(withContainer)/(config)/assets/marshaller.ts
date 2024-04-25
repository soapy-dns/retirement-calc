import { CashAsset, IAsset, LiquidAsset } from "@/app/lib/data/schema/config"
import { isCashAsset, isLiquidAsset } from "@/app/ui/utils"

type YesNo = "Y" | "N"

export interface ChangedFormData {
  description: string
  value?: number
  income?: number
  assetType: string // TODO: should be enum?
  owners: string[]
  earnsIncome: YesNo
  incomeBucket: YesNo
  incomeTaxPerc: number
  rentalIncome?: number
  rentalExpenses?: number
  canDrawdown: YesNo
  drawdownOrder: number
}

export const marshall = (data: ChangedFormData, asset: IAsset) => {
  const newAsset: IAsset = { ...asset }

  const { className } = asset

  if (isLiquidAsset(className)) {
    const liquidAsset = newAsset as LiquidAsset
    liquidAsset.canDrawdown = data.canDrawdown === "Y"
  }

  if (isCashAsset(className)) {
    const cashAsset = newAsset as CashAsset
    cashAsset.incomeBucket = data.incomeBucket === "Y"
  }

  return newAsset
}

export const unmarshal = () => {}
