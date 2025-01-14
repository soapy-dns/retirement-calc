import { applyLowerReturns } from "../applyLowerReturns"
import { IScenario } from "../../../data/schema/config"

describe("applyLowerReturns", () => {
  it("should reduce dividendInterestRate and growthInterestRate for sharesAu", () => {
    const scenario: IScenario = {
      context: {
        sharesAu: {
          dividendInterestRate: 5,
          growthInterestRate: 3
        },
        superAu: {
          investmentReturn: 4
        }
      }
    } as IScenario

    const result = applyLowerReturns(scenario)

    expect(result.context.sharesAu.dividendInterestRate).toBe(4)
    expect(result.context.sharesAu.growthInterestRate).toBe(2)
    expect(result.context.superAu.investmentReturn).toBe(3)
  })

  it("should reduce returns only until 0", () => {
    const scenario: IScenario = {
      context: {
        sharesAu: {
          dividendInterestRate: 0.5,
          growthInterestRate: 0.5
        },
        superAu: {
          investmentReturn: 0.5
        }
      }
    } as IScenario

    const result = applyLowerReturns(scenario)

    expect(result.context.sharesAu.dividendInterestRate).toBe(0)
    expect(result.context.sharesAu.growthInterestRate).toBe(0)
    expect(result.context.superAu.investmentReturn).toBe(0)
  })
})
