import { IAsset } from "@/app/lib/data/schema/config"

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
  const newAsset: IAsset = {
    ...asset,
    canDrawdown: data.canDrawdown === "Y",
    // incomeProducing: data.earnsIncome === "Y",
    incomeBucket: data.earningsBucket === "Y"
  }

  return newAsset
}
export const unmarshal = () => {}
