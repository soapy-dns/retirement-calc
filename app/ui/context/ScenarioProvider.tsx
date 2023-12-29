import React, { useState, useEffect } from "react"
import { ScenarioContext } from "./ScenarioContext"
import { IScenario, ISelectOption } from "@/app/lib/data/types"
import { scenarios as defaultScenarios } from "@/app/lib/data/scenarios"
import { calculate } from "@/app/lib/calculations"
import { CalculationResults } from "@/app/lib/calculations/types"
import { useAppAlert } from "../hooks/useAppAlert"
import { getRandomKey } from "@/app/lib/utils/getRandomKey"
import { Spinner } from "../components/common/Spinner"

const getScenarioOptions = (scenarios: IScenario[]): ISelectOption[] => {
  const scenarioOptions = scenarios.map((scenario) => ({
    value: scenario.id,
    label: scenario.name
  }))
  return scenarioOptions
}

export const ScenarioProvider = ({ children }: { children: React.ReactNode }) => {
  const [calculating, setCalculating] = useState<boolean>(false)

  const [scenarioOptions, setScenarioOptions] = useState<ISelectOption[]>()
  const [selectedScenarioOption, setSelectedScenarioOption] = useState<ISelectOption>()
  const [selectedScenario, setSelectedScenario] = useState<IScenario>(defaultScenarios[0])
  const [scenarios, setScenarios] = useState<IScenario[]>(defaultScenarios)
  const [calculationResults, setCalculationResults] = useState<CalculationResults>()
  const { displayErrorAlert, displayWarningAlert } = useAppAlert()

  const getSelectedScenarioAssetsOptions = ({ excludeIncome }: { excludeIncome: boolean }): ISelectOption[] => {
    const assets = excludeIncome ? selectedScenario.assets.filter((it) => !it.income) : selectedScenario.assets
    const assetOptions: ISelectOption[] = assets.map((it) => ({ label: it.name, value: it.id }))

    return assetOptions
  }

  const doCalculations = async (selectedScenario: IScenario): Promise<void> => {
    try {
      setCalculating(true)
      const calculationResults = await calculate(selectedScenario)
      setCalculationResults(calculationResults)
      setCalculating(false)

      const { calculationMessage } = calculationResults
      if (calculationMessage) {
        displayWarningAlert(calculationMessage, { duration: 1000 })
      }
    } catch (err) {
      setCalculating(false)

      displayErrorAlert("Error doing calculation.  This is likely a configuration issue.")
    }
  }

  const importScenarios = async (scenarios: IScenario[]) => {
    const defaultSelectedScenario = scenarios[0]

    if (!defaultSelectedScenario) throw new Error("No scenario found in import file")

    await doCalculations(defaultSelectedScenario)

    const scenarioOptions = getScenarioOptions(scenarios)
    const selectedScenarioOption = scenarioOptions.find((it) => it.value === defaultSelectedScenario.id)

    setScenarios(scenarios)
    setSelectedScenario(defaultSelectedScenario)
    setScenarioOptions(scenarioOptions)
    setSelectedScenarioOption(selectedScenarioOption)

    sessionStorage.setItem("scenarios", JSON.stringify(scenarios))
    sessionStorage.setItem("selectedScenario", JSON.stringify(defaultSelectedScenario))
  }

  const onSelectScenario = async (selectedValue: string) => {
    const newSelectedScenario = scenarios.find((it) => it.id === selectedValue)
    if (!newSelectedScenario || !scenarioOptions) {
      throw new Error("ScenarioProvider - Scenario not found")
    }

    const calculationResults = await doCalculations(newSelectedScenario)

    if (newSelectedScenario) setSelectedScenario(newSelectedScenario)

    const selectedScenarioOption = scenarioOptions.find((it) => it.value === selectedValue)
    setSelectedScenarioOption(selectedScenarioOption)

    sessionStorage.setItem("selectedScenario", JSON.stringify(newSelectedScenario))
  }

  const updateScenario = async (updatedScenario: IScenario) => {
    await doCalculations(updatedScenario)

    setSelectedScenario(updatedScenario)

    const index = scenarios.findIndex((it) => it.id === updatedScenario.id) || 0

    if (index === -1) throw new Error(`index not found ${updatedScenario.id}`)

    scenarios.splice(index, 1, updatedScenario)

    const scenarioOptions = getScenarioOptions(scenarios)

    sessionStorage.setItem("scenarios", JSON.stringify(scenarios))
    sessionStorage.setItem("selectedScenario", JSON.stringify(updatedScenario))

    setScenarios(scenarios)
    setSelectedScenario(updatedScenario)
    setScenarioOptions(scenarioOptions)
  }

  const deleteSelectedScenario = async () => {
    if (scenarios.length > 1) {
      const index = scenarios.findIndex((it) => it.id === selectedScenario.id)
      if (index === undefined) throw new Error("No scenario found to delete")

      const remainingScenarios = [...scenarios]
      remainingScenarios.splice(index, 1)

      const scenarioOptions = getScenarioOptions(remainingScenarios)

      const newSelectedScenario = remainingScenarios[0]
      await doCalculations(newSelectedScenario)

      const selectedScenarioOption = scenarioOptions.find((it) => it.value === newSelectedScenario.id)

      sessionStorage.setItem("scenarios", JSON.stringify(remainingScenarios))
      sessionStorage.setItem("selectedScenario", JSON.stringify(newSelectedScenario))

      setScenarios(remainingScenarios)
      setScenarioOptions(scenarioOptions)
      setSelectedScenario(newSelectedScenario)
      setSelectedScenarioOption(selectedScenarioOption)
    }
  }

  const addScenario = async (name: string, description: string) => {
    const newScenario = { ...selectedScenario, name, description, id: getRandomKey() }
    await doCalculations(newScenario)

    const mergedScenarios = scenarios.concat([newScenario])

    const scenarioOptions = getScenarioOptions(mergedScenarios)

    const selectedScenarioOption = scenarioOptions.find((it) => it.value === newScenario.id)

    sessionStorage.setItem("scenarios", JSON.stringify(mergedScenarios))
    sessionStorage.setItem("selectedScenario", JSON.stringify(newScenario))

    setScenarios(mergedScenarios)
    setScenarioOptions(scenarioOptions)
    setSelectedScenario(newScenario)
    setSelectedScenarioOption(selectedScenarioOption)
  }

  // Need to store.  This is remounted because the <Route> is remounted (I think)
  useEffect(() => {
    const scenariosString = sessionStorage.getItem("scenarios")
    const scenarios = scenariosString ? JSON.parse(scenariosString) : defaultScenarios
    setScenarios(scenarios)

    const selectedScenarioString = sessionStorage.getItem("selectedScenario")
    const selectedScenario: IScenario = selectedScenarioString
      ? (JSON.parse(selectedScenarioString) as IScenario)
      : scenarios[0]
    setSelectedScenario(selectedScenario)

    const scenarioOptions = getScenarioOptions(scenarios)
    setScenarioOptions(scenarioOptions)

    const selectedScenarioOption = scenarioOptions.find((it) => it.value === selectedScenario.id)
    setSelectedScenarioOption(selectedScenarioOption)

    // update session storage
    sessionStorage.setItem("scenarios", JSON.stringify(scenarios))
    sessionStorage.setItem("selectedScenario", JSON.stringify(selectedScenario))

    // FIXME: remounts with react v18 and strict mode
    doCalculations(selectedScenario)
  }, [])

  return (
    <ScenarioContext.Provider
      value={{
        onSelectScenario: onSelectScenario,
        scenarioOptions,
        selectedScenarioOption,
        scenarios,
        selectedScenario,
        getSelectedScenarioAssetsOptions,
        importScenarios,
        updateScenario,
        deleteSelectedScenario,
        addScenario,
        calculationResults
      }}
    >
      <div className="z-50 mt-20">{calculating}</div>
      {calculating ? <Spinner text="Calculating..." /> : <>{children}</>}
    </ScenarioContext.Provider>
  )
}
