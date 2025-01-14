import { IScenario } from "../../data/schema/config"

// TODO: Need to work out requirement
/*
guiide assumes each person needs 40,000gbp per year for the last 2 years of their life.  
Do we take the expected life expectancy, take 2 years off of it then add 40,000gbp in todays money for the remaining period?
But what if we don't know the ages?  Make age a required field? (this would make calculations more accurate)
*/
export const applyLowerReturns = (scenario: IScenario) => {
  const { context } = scenario

  const newContext = { ...context }
  const { livingExpenses } = newContext

  const stressedScenario = { ...scenario, context: newContext }
  return stressedScenario
}
