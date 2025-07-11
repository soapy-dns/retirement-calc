import React, { useState, useEffect } from "react"

import { ScenarioContext } from "./ScenarioContext"
import { ISelectOption } from "@/app/lib/data/types"
import { IScenario, StressTest } from "@/app/lib/data/schema/config"

import { getDefaultScenarios } from "@/app/lib/data/scenarios"
import { calculate } from "@/app/lib/calculations"
import { CalculationResults } from "@/app/lib/calculations/types"
import { useAppAlert } from "../../hooks/useAppAlert"
import { Spinner } from "../../components/common/Spinner"

import { FormattedErrors } from "../../components/formattedErrors/FormattedErrors"
import { isIncomeAsset } from "../../utils"
import { getNewScenario } from "../../../lib/scenario/getNewScenario"
import { sortScenarios } from "../../utils/sortScenarios"
import { CalculationWarning } from "./CalculationWarning"

// https://sheribyrnehaber.medium.com/designing-toast-messages-for-accessibility-fb610ac364be#:~:text=Issue%20%231%3A%20How%20long%20should%20toasts%20stay%20up%20for%3F&text=A%20good%20length%20of%20time,best%20practice%20is%206%20seconds.
const WARNING_DURATION = 7000 // duration for warning messages

const getScenarioOptions = (scenarios: IScenario[]): ISelectOption[] => {
  const scenarioOptions = scenarios.map((scenario) => ({
    value: scenario.id,
    label: scenario.name
  }))
  return scenarioOptions
}

const defaultScenarios = getDefaultScenarios()

interface Props {
  showCalculationInfo: () => void
  children: React.ReactNode
}

export const ScenarioProvider = ({ showCalculationInfo, children }: Props) => {
  const [calculating, setCalculating] = useState<boolean>(false)

  const [scenarioOptions, setScenarioOptions] = useState<ISelectOption[]>()
  const [selectedScenarioOption, setSelectedScenarioOption] = useState<ISelectOption>()
  const [selectedScenario, setSelectedScenario] = useState<IScenario>(defaultScenarios[0])
  const [scenarios, setScenarios] = useState<IScenario[]>(defaultScenarios)
  const [calculationResults, setCalculationResults] = useState<CalculationResults>()
  const { displayErrorAlert, displayWarningAlert } = useAppAlert()

  const getSelectedScenarioAssetsOptions = ({ excludeIncome }: { excludeIncome: boolean }): ISelectOption[] => {
    const assets = excludeIncome
      ? selectedScenario.assets.filter((it) => !isIncomeAsset(it.className))
      : selectedScenario.assets
    const assetOptions: ISelectOption[] = assets.map((it) => ({ label: it.name, value: it.id }))

    return assetOptions
  }

  const doCalculations = async (
    selectedScenario: IScenario
  ): Promise<{ success: boolean; calculationResults?: CalculationResults }> => {
    try {
      setCalculating(true)
      const calculationResults = await calculate(selectedScenario)
      console.log("calculationResults", calculationResults)
      setCalculationResults(calculationResults)
      setCalculating(false)

      const { success, calculationMessage } = calculationResults

      if (success) {
        const { calculatedEndYear, maxEndYear } = calculationResults
        if (maxEndYear >= calculatedEndYear) {
          const calculationMessageElement = (
            <CalculationWarning calculatedEndYear={calculatedEndYear} showMore={showCalculationInfo} />
          )

          displayWarningAlert(calculationMessageElement, { duration: WARNING_DURATION })
        }
        // server actions will return a 200 error for validation messages.  This may change in future
      } else if (!success) {
        if ("errors" in calculationResults) {
          console.log("calculationResults- errors", calculationResults)
          const { errors } = calculationResults
          if (errors) {
            displayErrorAlert(
              <FormattedErrors
                errors={errors}
                assets={selectedScenario.assets}
                transfers={selectedScenario.transfers || []}
              />
            )
          }
        } else {
          // Not a complete fuck up.  Show the error returned.
          displayErrorAlert(`${calculationMessage}`)
        }
      }

      return { success, calculationResults }
    } catch (err) {
      // server error
      setCalculating(false)
      // console.log("--err--", err)
      displayErrorAlert("Error doing calculation.  Please check your configuration")
      return { success: false }
    }
  }

  const importScenarios = async (
    scenarios: IScenario[]
  ): Promise<{ success: boolean; calculationResults?: CalculationResults }> => {
    // sort scenarios by decending date
    const sortedScenarios = sortScenarios(scenarios)

    const defaultSelectedScenario = sortedScenarios[0]

    if (!defaultSelectedScenario) throw new Error("No scenario found in import file")

    const scenarioOptions = getScenarioOptions(sortedScenarios)
    const selectedScenarioOption = scenarioOptions.find((it) => it.value === defaultSelectedScenario.id)

    setScenarios(sortedScenarios)
    setSelectedScenario(defaultSelectedScenario)
    setScenarioOptions(scenarioOptions)
    setSelectedScenarioOption(selectedScenarioOption)

    sessionStorage.setItem("scenarios", JSON.stringify(scenarios))
    sessionStorage.setItem("selectedScenario", JSON.stringify(defaultSelectedScenario))

    const { success, calculationResults } = await doCalculations(defaultSelectedScenario)

    return { success, calculationResults }
  }

  const onSelectScenario = async (selectedValue: string) => {
    const newSelectedScenario = scenarios.find((it) => it.id === selectedValue)
    if (!newSelectedScenario || !scenarioOptions) {
      throw new Error("ScenarioProvider - Scenario not found")
    }

    // no subsequent navigation, so don't need to return the success flag
    await doCalculations(newSelectedScenario)

    if (newSelectedScenario) setSelectedScenario(newSelectedScenario)

    const selectedScenarioOption = scenarioOptions.find((it) => it.value === selectedValue)
    setSelectedScenarioOption(selectedScenarioOption)

    sessionStorage.setItem("selectedScenario", JSON.stringify(newSelectedScenario))
  }

  const updateScenario = async (updatedScenario: IScenario): Promise<{ success: boolean }> => {
    // console.log("--updateScenario---updatedScenario", updatedScenario)
    const { success } = await doCalculations(updatedScenario)

    // irrespective of whether the calculation works or not we update the scenario.  The customer can change it.
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
    return { success }
  }

  const deleteSelectedScenario = async (): Promise<{ success: boolean }> => {
    if (scenarios.length > 1) {
      const index = scenarios.findIndex((it) => it.id === selectedScenario.id)
      if (index === undefined) throw new Error("No scenario found to delete")

      const remainingScenarios = [...scenarios]
      remainingScenarios.splice(index, 1)

      const scenarioOptions = getScenarioOptions(remainingScenarios)

      const newSelectedScenario = remainingScenarios[0]
      const { success } = await doCalculations(newSelectedScenario)

      const selectedScenarioOption = scenarioOptions.find((it) => it.value === newSelectedScenario.id)

      sessionStorage.setItem("scenarios", JSON.stringify(remainingScenarios))
      sessionStorage.setItem("selectedScenario", JSON.stringify(newSelectedScenario))

      setScenarios(remainingScenarios)
      setScenarioOptions(scenarioOptions)
      setSelectedScenario(newSelectedScenario)
      setSelectedScenarioOption(selectedScenarioOption)

      return { success }
    }
    return { success: false }
  }

  /*
  Note: although this is 'adding' a scenario, it is doing so by copying another. 
  If the as at date is in the past we will have to do some manipulations
  */
  const addScenario = async (
    name: string,
    description: string,
    stressTest: StressTest
  ): Promise<{ success: boolean }> => {
    const newScenario = await getNewScenario(selectedScenario, name, description, (stressTest = "NONE"))

    const { success } = await doCalculations(newScenario) // this also updates the calculationResults in state.

    const mergedScenarios = scenarios.concat([newScenario])

    const scenarioOptions = getScenarioOptions(mergedScenarios)

    const selectedScenarioOption = scenarioOptions.find((it) => it.value === newScenario.id)

    sessionStorage.setItem("scenarios", JSON.stringify(mergedScenarios))
    sessionStorage.setItem("selectedScenario", JSON.stringify(newScenario))

    setScenarios(mergedScenarios)
    setScenarioOptions(scenarioOptions)
    setSelectedScenario(newScenario)
    setSelectedScenarioOption(selectedScenarioOption)
    return { success }
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
