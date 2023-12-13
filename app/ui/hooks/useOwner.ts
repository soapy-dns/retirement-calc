import { useContext } from "react"
import { ScenarioContext } from "../context/ScenarioContext"
// import { ScenarioContext } from "view/context/ScenarioContext"

export const useOwner = () => {
  const { selectedScenario } = useContext(ScenarioContext)

  const getOwners = () => {
    return selectedScenario?.context.owners
  }

  return {
    getOwners
  }
}
