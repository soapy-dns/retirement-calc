import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  HomeIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline"
import { IAsset } from "@/app/lib/data/schema/config"

export const getAssetDisplayDetails = (assetConfig: IAsset) => {
  const { className } = assetConfig

  switch (className) {
    case "AuBank":
      return { AssetClassIcon: BanknotesIcon, type: "CASH" }
    case "AuSuper":
      return { AssetClassIcon: ArrowTrendingDownIcon, type: "DEFINED CONTRIBUTIONS" }
    case "AuDefinedBenefits":
      return { AssetClassIcon: CurrencyDollarIcon, type: "DEFINED BENEFITS" }
    case "AuShares":
      return { AssetClassIcon: ArrowTrendingUpIcon, type: "SHARES" }
    case "AuProperty":
      return { AssetClassIcon: HomeIcon, type: "PROPERTY" }
    case "Salary":
      return { AssetClassIcon: BriefcaseIcon, type: "SALARY" }

    default:
      return { AssetClassIcon: QuestionMarkCircleIcon, type: "UNKNOWN" }
  }
}
