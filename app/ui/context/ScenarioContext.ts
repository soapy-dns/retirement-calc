import { createContext } from "react"
import { IScenario, ISelectOption } from "@/app/lib/data/types"
import { scenarios } from "@/app/lib/data/scenarios"
import { CalculationResults } from "@/app/lib/calculations/types"

interface IScenarioContext {
  selectedScenario: IScenario
  scenarios?: IScenario[]
  selectedScenarioOption?: ISelectOption
  getSelectedScenarioAssetsOptions: (excludeIncome: { excludeIncome: boolean }) => ISelectOption[]
  scenarioOptions?: ISelectOption[]
  onSelectScenario: (option: string) => void
  importScenarios: (scenarios: IScenario[]) => void
  updateScenario: (scenario: IScenario) => void
  deleteSelectedScenario: () => void
  addScenario: (name: string, description: string) => void
  calculationResults?: CalculationResults
  calculationMessage?: string
}

export const ScenarioContext = createContext<IScenarioContext>({
  selectedScenario: scenarios[0],
  scenarios: scenarios,
  selectedScenarioOption: undefined,
  getSelectedScenarioAssetsOptions: () => [],
  scenarioOptions: [],
  onSelectScenario: (scenarioOption): void => {},
  importScenarios: () => {},
  updateScenario: (scenario: IScenario) => {},
  deleteSelectedScenario: () => {},
  addScenario: () => {
    console.log("default addScenario")
  },
  calculationResults: undefined,
  calculationMessage: undefined
})
