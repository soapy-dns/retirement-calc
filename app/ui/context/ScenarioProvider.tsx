import React, { useState } from "react"
import { ScenarioContext } from "./ScenarioContext"
import { IScenario, ISelectOption } from "@/app/lib/data/types"
import { useEffect } from "react"
import { scenarios as defaultScenarios } from "@/app/lib/data/scenarios"
import { calculate, calculateAsync } from "@/app/lib/calculations"
import { CalculationResults } from "@/app/lib/calculations/types"
import { useAppAlert } from "../hooks/useAppAlert"
// import { getRandomKey } from "view/common/utils"

const getScenarioOptions = (scenarios: IScenario[]): ISelectOption[] => {
  const scenarioOptions = scenarios.map((scenario) => ({
    value: scenario.id,
    label: scenario.name
  }))
  return scenarioOptions
}

export const ScenarioProvider = ({ children }: { children: React.ReactNode }) => {
  const [scenarioOptions, setScenarioOptions] = useState<ISelectOption[]>()
  const [selectedScenarioOption, setSelectedScenarioOption] = useState<ISelectOption>()
  const [selectedScenario, setSelectedScenario] = useState<IScenario>(defaultScenarios[0])
  const [scenarios, setScenarios] = useState<IScenario[]>(defaultScenarios)
  const [calculationResults, setCalculationResults] = useState<CalculationResults>()
  // const [calculationMessage, setCalculationMessage] = useState<string>()
  const { displayErrorAlert, displayWarningAlert } = useAppAlert()

  const getSelectedScenarioAssetsOptions = ({ excludeIncome }: { excludeIncome: boolean }): ISelectOption[] => {
    const assets = excludeIncome ? selectedScenario.assets.filter((it) => !it.income) : selectedScenario.assets
    const assetOptions: ISelectOption[] = assets.map((it) => ({ label: it.name, value: it.id }))

    return assetOptions
  }

  const importScenarios = (scenarios: IScenario[]) => {}

  // const importScenarios = (scenarios: IScenario[]) => {
  //   try {
  //     const defaultSelectedScenario = scenarios[0]

  //     if (!defaultSelectedScenario) throw new Error("No scenario found in import file")

  //     const calculationResults = calculate(defaultSelectedScenario)
  //     setCalculationResults(calculationResults)

  //     const scenarioOptions = getScenarioOptions(scenarios)
  //     const selectedScenarioOption = scenarioOptions.find((it) => it.value === defaultSelectedScenario.id)

  //     setScenarios(scenarios)
  //     setSelectedScenario(defaultSelectedScenario)
  //     setScenarioOptions(scenarioOptions)
  //     setSelectedScenarioOption(selectedScenarioOption)

  //     sessionStorage.setItem("scenarios", JSON.stringify(scenarios))
  //     sessionStorage.setItem("selectedScenario", JSON.stringify(defaultSelectedScenario))

  //     const { calculationMessage } = calculationResults

  //     if (calculationMessage) {
  //       displayWarningAlert(calculationMessage)
  //     }
  //   } catch (err) {
  //     displayErrorAlert(
  //       "Calculation error.  File to import likely has incorrect configuration.  The file has not been imported."
  //     )
  //   }
  // }

  const onSelectScenario = (selectedValue: string) => {}

  // // when an different scenario is selected
  // const onSelectScenario = (selectedValue: string) => {
  //   try {
  //     const newSelectedScenario = scenarios.find((it) => it.id === selectedValue)
  //     if (!newSelectedScenario || !scenarioOptions) {
  //       throw new Error("ScenarioProvider - Scenario not found")
  //     }

  //     const calculationResults = calculate(newSelectedScenario)

  //     if (newSelectedScenario) setSelectedScenario(newSelectedScenario)

  //     const selectedScenarioOption = scenarioOptions.find((it) => it.value === selectedValue)
  //     setSelectedScenarioOption(selectedScenarioOption)

  //     setCalculationResults(calculationResults)

  //     sessionStorage.setItem("selectedScenario", JSON.stringify(newSelectedScenario))

  //     const { calculationMessage } = calculationResults
  //     if (calculationMessage) {
  //       displayWarningAlert(calculationMessage, { duration: 1000 })
  //     }
  //   } catch (err) {
  //     displayErrorAlert("Calculation error.  Selected scenario configuration is likely incorrect.  Please correct.")
  //   }
  // }

  const updateScenario = async (updatedScenario: IScenario) => {}

  // // For an updated scenario
  // const updateScenario = async (updatedScenario: IScenario) => {
  //   try {
  //     const calculationResults = await calculateAsync(updatedScenario)
  //     setCalculationResults(calculationResults)

  //     setSelectedScenario(updatedScenario)

  //     const index = scenarios.findIndex((it) => it.id === updatedScenario.id) || 0

  //     if (index === -1) throw new Error(`index not found ${updatedScenario.id}`)

  //     scenarios.splice(index, 1, updatedScenario)

  //     const scenarioOptions = getScenarioOptions(scenarios)

  //     sessionStorage.setItem("scenarios", JSON.stringify(scenarios))
  //     sessionStorage.setItem("selectedScenario", JSON.stringify(updatedScenario))

  //     setScenarios(scenarios)
  //     setSelectedScenario(updatedScenario)
  //     setScenarioOptions(scenarioOptions)

  //     const { calculationMessage } = calculationResults
  //     if (calculationMessage) {
  //       displayWarningAlert(calculationMessage, { duration: 1000 })
  //     }
  //   } catch (err) {
  //     displayErrorAlert(
  //       `Calculation error.  Updated scenario ${updatedScenario.name} likely incorrect.  Please correct.`
  //     )
  //   }
  // }

  const deleteSelectedScenario = () => {}

  // const deleteSelectedScenario = () => {
  //   if (scenarios.length > 1) {
  //     const index = scenarios.findIndex((it) => it.id === selectedScenario.id)
  //     if (index === undefined) throw new Error("No scenario found to delete")

  //     const remainingScenarios = [...scenarios]
  //     remainingScenarios.splice(index, 1)

  //     const scenarioOptions = getScenarioOptions(remainingScenarios)

  //     const newSelectedScenario = remainingScenarios[0]

  //     const selectedScenarioOption = scenarioOptions.find((it) => it.value === newSelectedScenario.id)

  //     sessionStorage.setItem("scenarios", JSON.stringify(remainingScenarios))
  //     sessionStorage.setItem("selectedScenario", JSON.stringify(newSelectedScenario))

  //     setScenarios(remainingScenarios)
  //     setScenarioOptions(scenarioOptions)
  //     setSelectedScenario(newSelectedScenario)
  //     setSelectedScenarioOption(selectedScenarioOption)

  //     try {
  //       const calculationResults = calculate(newSelectedScenario)
  //       setCalculationResults(calculationResults)
  //       const { calculationMessage } = calculationResults
  //       if (calculationMessage) {
  //         displayWarningAlert(calculationMessage, { duration: 1000 })
  //       }
  //     } catch (err) {
  //       displayErrorAlert(`Calculation error.  Scenario ${newSelectedScenario.name} likely incorrect.  Please correct.`)
  //     }
  //   }
  // }

  const addScenario = (name: string, description: string) => {}

  // const addScenario = (name: string, description: string) => {
  //   const newScenario = { ...selectedScenario, name, description, id: getRandomKey() }

  //   try {
  //     const calculationResults = calculate(newScenario)
  //     setCalculationResults(calculationResults)

  //     scenarios.concat([newScenario])

  //     const scenarioOptions = getScenarioOptions(scenarios)

  //     const selectedScenarioOption = scenarioOptions.find((it) => it.value === newScenario.id)

  //     sessionStorage.setItem("scenarios", JSON.stringify(scenarios))
  //     sessionStorage.setItem("selectedScenario", JSON.stringify(newScenario))

  //     setScenarios(scenarios)
  //     setScenarioOptions(scenarioOptions)
  //     setSelectedScenario(newScenario)
  //     setSelectedScenarioOption(selectedScenarioOption)

  //     const { calculationMessage } = calculationResults
  //     if (calculationMessage) {
  //       displayWarningAlert(calculationMessage, { duration: 1000 })
  //     }
  //   } catch (err) {
  //     displayErrorAlert(
  //       `Calculation error.  Newly added scenario ${newScenario.name} likely incorrect.  Please correct.`
  //     )
  //   }
  // }

  const doCalculations = async (selectedScenario: IScenario) => {
    try {
      const calculationResults = await calculateAsync(selectedScenario)
      setCalculationResults(calculationResults)
      const { calculationMessage } = calculationResults
      if (calculationMessage) {
        displayWarningAlert(calculationMessage, { duration: 1000 })
      }
    } catch (err) {
      displayErrorAlert("Error with calc - make this msg standard")
    }
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

    doCalculations(selectedScenario)
    // try {
    //   const calculationResults = calculate(selectedScenario)
    //   setCalculationResults(calculationResults)
    //   const { calculationMessage } = calculationResults
    //   if (calculationMessage) {
    //     displayWarningAlert(calculationMessage, { duration: 1000 })
    //   }
    // } catch (err) {
    //   displayErrorAlert("Error with calc - make this msg standard")
    // }
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
      {children}
    </ScenarioContext.Provider>
  )
}
