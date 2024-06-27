import { useContext } from "react"
import { ScenarioContext } from "../context/scenario/ScenarioContext"
// import { ScenarioContext } from "view/context/scenario/ScenarioContext"

export const useOwner = () => {
  const { selectedScenario } = useContext(ScenarioContext)

  const getOwners = () => {
    return selectedScenario?.context.owners
  }

  return {
    getOwners
  }
}
