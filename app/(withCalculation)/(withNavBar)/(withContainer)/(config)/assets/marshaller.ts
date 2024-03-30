import { IAsset, LiquidAsset } from "@/app/lib/data/schema/config"
import { isLiquidAsset } from "@/app/ui/utils"

type YesNo = "Y" | "N"

export interface ChangedFormData {
  description: string
  value?: number
  income?: number
  assetType: string // TODO: should be enum?
  owners: string[]
  earnsIncome: YesNo
  earningsBucket: YesNo
  earningsTaxPerc: number
  rentalIncome?: number
  rentalExpenses?: number
  canDrawdown: YesNo
  drawdownOrder: number
}

export const marshall = (data: ChangedFormData, asset: IAsset) => {
  const newAsset: IAsset = { ...asset }

  if (isLiquidAsset(asset.className)) {
    const liquidAsset = newAsset as LiquidAsset
    liquidAsset.canDrawdown = data.canDrawdown === "Y"
    liquidAsset.incomeBucket = data.earningsBucket === "Y"
  }

  return newAsset
}

export const unmarshal = () => {}
