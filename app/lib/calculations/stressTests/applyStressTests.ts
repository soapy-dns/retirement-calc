import { IScenario } from "../../data/schema/config"
import { applyMarketCrash } from "./applyMarketCrash"

export const applyStressTests = (scenario: IScenario) => {
  const { stressTest } = scenario
  switch (stressTest) {
    case "NONE":
      return scenario

    case "MARKET_CRASH":
      return applyMarketCrash(scenario)
    // case "Global Pandemic":
    //   return applyGlobalPandemic(scenario)
    // case "Recession":
    //   return applyRecession(scenario)
    default:
      return scenario
  }
}
