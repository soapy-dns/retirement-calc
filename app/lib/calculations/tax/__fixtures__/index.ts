import { ContextConfig, IAsset, IScenario } from "@/app/lib/data/types"
import { Asset } from "../../assets/Asset"
import { buildInitialAssets } from "../../assets/assetUtils"
import { getInflationContext } from "../../utils/getInflationContext"
import { getYearRange } from "../../utils/yearRange"

export const simpleAuContext: ContextConfig = {
  taxResident: "AU",
  // au2ukExchangeRate: 0.52,
  currency: "AU",
  owners: ["Him", "Her"],
  auBank: {
    interestRate: 0.005
  },
  superAu: {
    investmentReturn: 0.05, // net of fees but not taxation
    taxationRate: 0.15
  },
  definedBenefitsAu: {
    useInflationRate: true
  },
  definedBenefitsUk: {
    useInflationRate: true
  },
  sharesAu: {
    growthInterestRate: 0.03,
    dividendInterestRate: 0.03
  },
  property: {
    growthInterestRate: 0.03
  },
  inflation: [{ fromYear: 2023, inflationRate: 0.03 }],
  livingExpenses: [
    { fromYear: 2023, amountInTodaysTerms: 80000 },
    { fromYear: 2038, amountInTodaysTerms: 50000 }
  ]
}

const definedContributionsAssetConfig: IAsset = {
  id: "HER_AU_SUPER",
  name: "Her AU super",
  description: "Australian super - defined contributions",
  country: "AU",
  className: "AuSuper",
  value: 500000,
  assetOwners: ["Her"],
  // incomeProducing: false,
  canDrawdown: true,
  drawdownOrder: 50
}

const simpleAuScenarioWithDefinedContributions: IScenario = {
  id: "AUDC",
  name: "AUDC",
  description: "scenario description",
  context: simpleAuContext,
  assets: [definedContributionsAssetConfig]
}

export const getDefinedContributionsAsset = (): Asset[] => {
  const startingYear = 2023
  const { yearRange } = getYearRange(startingYear, 2)

  const inflationContext = getInflationContext(yearRange, simpleAuContext.inflation)

  return buildInitialAssets(2023, simpleAuScenarioWithDefinedContributions, inflationContext)
}
