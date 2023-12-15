import { IncomeConfig } from "@/app/lib/data/types"
import { Calculator } from "../../calculator/Calculator"

// TODO: I think we might be better swapping the names of IncomeConfig and IIncome
export interface IIncome extends Omit<IncomeConfig, "className"> {
  //   scenario: IScenario
  //   startingYear: number
  calculator?: Calculator
}
