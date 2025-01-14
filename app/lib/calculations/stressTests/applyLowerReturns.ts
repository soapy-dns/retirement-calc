import { IScenario } from "../../data/schema/config"

const getReducedValue = (value: number) => {
  if (value > 1) {
    return value - 1
  }
  return 0
}

export const applyLowerReturns = (scenario: IScenario) => {
  const { context } = scenario

  const newContext = { ...context }
  const { sharesAu, superAu } = newContext

  sharesAu.dividendInterestRate = getReducedValue(sharesAu.dividendInterestRate)
  sharesAu.growthInterestRate = getReducedValue(sharesAu.growthInterestRate)

  superAu.investmentReturn = getReducedValue(superAu.investmentReturn)

  const stressedScenario = { ...scenario, context: newContext }
  return stressedScenario
}
