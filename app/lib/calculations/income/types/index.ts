import { Calculator } from "calculations/calculator/Calculator"
import { IncomeConfig } from "data/types"

// TODO: I think we might be better swapping the names of IncomeConfig and IIncome
export interface IIncome extends Omit<IncomeConfig, "className"> {
  //   scenario: IScenario
  //   startingYear: number
  calculator?: Calculator
}
