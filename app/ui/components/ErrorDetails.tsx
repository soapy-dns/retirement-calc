import { useContext } from "react"
import { useRouter } from "next/navigation"

import { ScenarioContext } from "../context/scenario/ScenarioContext"
import { useNavigation } from "../hooks/useNavigation"
import { AppPath } from "../types"
import { Button, ButtonType } from "./common/Button"

export const ErrorDetails: React.FC = () => {
  const scenarioContext = useContext(ScenarioContext)
  const { goTo } = useNavigation()
  const router = useRouter()

  const { calculationResults } = scenarioContext

  const { calculationMessage } = calculationResults || {}

  const serverError = !calculationMessage

  const handleFixConfig = () => goTo(AppPath.config)
  const handleTry = () => router.refresh()

  return (
    <div className="flex flex-col items-center text-primary">
      {serverError ? (
        <>
          <h1 className="text-primary">Ooops and error has occured!</h1>
          <Button buttonType={ButtonType.primary} onClick={handleTry}>
            Retry
          </Button>{" "}
        </>
      ) : (
        <>
          <h1 className="text-primary">There is an error with the configuration.</h1>

          {calculationMessage}
          <Button buttonType={ButtonType.primary} onClick={handleFixConfig}>
            Fix configuration
          </Button>
        </>
      )}
    </div>
  )
}
