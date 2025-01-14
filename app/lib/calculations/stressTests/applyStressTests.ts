import { IScenario } from "../../data/schema/config"
import { applyLowerReturns } from "./applyLowerReturns"
import { applyMarketCrash } from "./applyMarketCrash"

export const applyStressTests = (scenario: IScenario) => {
  const { stressTest } = scenario
  switch (stressTest) {
    case "NONE":
      return scenario

    case "MARKET_CRASH":
      return applyMarketCrash(scenario)

    case "LOWER_RETURNS":
      return applyLowerReturns(scenario)

    default:
      return scenario
  }
}
