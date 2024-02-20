import { useContext } from "react"
import { ScenarioContext } from "../context/ScenarioContext"

export enum ContextType {
  inflation = "inflation",
  cash = "auBank",
  shares = "sharesAu",
  super = "superAu",
  property="property",
  definedBenefits = "definedBenefitsAu"
}
export const useContextConfig = () => {
  const { calculationResults } = useContext(ScenarioContext)

  const hasValidationErrors = (contextType: ContextType): boolean => {
    if (!calculationResults || calculationResults.success) return false

    const { errors } = calculationResults

    if (!errors) return false

    const contextErrors = errors.filter((it) => it.path[0] === "context")

    if (!contextErrors) return false
    const matching = contextErrors.find((it) => {
      console.log(it.path[1], contextType)
      if (it.path[1] === contextType) return true

      if (ContextType[it.path[1] as keyof typeof ContextType] === contextType) return true
      return false
    })

    return !!matching
  }

  return {
    hasValidationErrors
  }
}
