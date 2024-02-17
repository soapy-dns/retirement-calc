import { createContext } from "react"
import { ISelectOption } from "@/app/lib/data/types"
import { IScenario } from "@/app/lib/data/schema/config"

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
  updateScenario: (scenario: IScenario) => Promise<{ success: boolean }>
  deleteSelectedScenario: () => Promise<{ success: boolean }>
  addScenario: (name: string, description: string) => Promise<{ success: boolean }>
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
  updateScenario: (scenario: IScenario) => Promise.resolve({ success: false }),
  deleteSelectedScenario: () => Promise.resolve({ success: false }),
  addScenario: () => Promise.resolve({ success: false }),
  calculationResults: undefined,
  calculationMessage: undefined
})
