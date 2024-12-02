import { Asset } from "@/app/lib/calculations/assets/Asset"
import { AssetClass } from "@/app/lib/data/schema/config"

export const getErrorMsgId = (id: string) => `${id}-validation-error`

const earnedIncomeAssetClassNames = ["Salary"]
const incomeAssetClassNames = ["AuDefinedBenefits", "Salary"]
const capitalAssetClassNames = ["AuProperty", "AuShares", "AuBank", "AuSuper"]
const propertyAssetClassNames = ["AuProperty"]
const liquidAssetClassNames = ["AuShares", "AuBank", "AuSuper"]
const cashAssetClassNames = ["AuBank"]
const definedBenefitsClassNames = ["AuDefinedBenefits"]
const superAssetClassNames = ["AuSuper"]

// TODO: can we not use instanceof here?

export const isEarnedIncomeAsset = (className: AssetClass) => earnedIncomeAssetClassNames.includes(className)

export const isIncomeAsset = (className: AssetClass) => incomeAssetClassNames.includes(className)

export const isCapitalAsset = (className: AssetClass) => capitalAssetClassNames.includes(className)

export const isPropertyAsset = (className: AssetClass) => propertyAssetClassNames.includes(className)

export const isLiquidAsset = (className: AssetClass) => liquidAssetClassNames.includes(className)

export const isCashAsset = (className: AssetClass) => cashAssetClassNames.includes(className)

export const isIncomeProducingAsset = (asset: Asset) => asset.incomeProducing

export const isDefinedBenefitAsset = (className: AssetClass) => definedBenefitsClassNames.includes(className)

export const isSuperAsset = (className: AssetClass) => superAssetClassNames.includes(className)
