import { AssetClass } from "@/app/lib/data/schema/config"

export const getErrorMsgId = (id: string) => `${id}-validation-error`

const incomeAssetClassNames = ["AuDefinedBenefits", "Salary"]
const capitalAssetClassNames = ["AuProperty", "AuShares", "AuBank", "AuSuper"]
const propertyAssetClassNames = ["AuProperty"]
const liquidAssetClassNames = ["AuShares", "AuBank", "AuSuper"]

export const isIncomeAsset = (className: AssetClass) => incomeAssetClassNames.includes(className)

export const isCapitalAsset = (className: AssetClass) => capitalAssetClassNames.includes(className)

export const isPropertyAsset = (className: AssetClass) => propertyAssetClassNames.includes(className)

export const isLiquidAsset = (className: AssetClass) => liquidAssetClassNames.includes(className)
