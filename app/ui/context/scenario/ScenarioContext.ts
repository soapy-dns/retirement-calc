import { createContext } from "react"
import { ISelectOption } from "@/app/lib/data/types"
import { IScenario, StressTest } from "@/app/lib/data/schema/config"

import { getDefaultScenarios } from "@/app/lib/data/scenarios"
import { CalculationResults } from "@/app/lib/calculations/types"

interface IScenarioContext {
  selectedScenario: IScenario
  scenarios?: IScenario[]
  selectedScenarioOption?: ISelectOption
  getSelectedScenarioAssetsOptions: (excludeIncome: { excludeIncome: boolean }) => ISelectOption[]
  scenarioOptions?: ISelectOption[]
  onSelectScenario: (option: string) => void
  importScenarios: (scenarios: IScenario[]) => Promise<{ success: boolean; calculationResults?: CalculationResults }>
  updateScenario: (scenario: IScenario) => Promise<{ success: boolean }>
  deleteSelectedScenario: () => Promise<{ success: boolean }>
  addScenario: (
    name: string,
    description: string,
    stressTest: StressTest
  ) => Promise<{ success: boolean; calculationResults?: CalculationResults }>
  calculationResults?: CalculationResults
  calculationMessage?: string
}
const scenarios = getDefaultScenarios()

export const ScenarioContext = createContext<IScenarioContext>({
  selectedScenario: scenarios[0],
  scenarios: scenarios,
  selectedScenarioOption: undefined,
  getSelectedScenarioAssetsOptions: () => [],
  scenarioOptions: [],
  onSelectScenario: (scenarioOption): void => {},
  importScenarios: () => Promise.resolve({ success: false }),
  updateScenario: (scenario: IScenario) => Promise.resolve({ success: false }),
  deleteSelectedScenario: () => Promise.resolve({ success: false }),
  addScenario: (name: string, description: string, stressTest: StressTest) => Promise.resolve({ success: false }),
  calculationResults: undefined,
  calculationMessage: undefined
})
