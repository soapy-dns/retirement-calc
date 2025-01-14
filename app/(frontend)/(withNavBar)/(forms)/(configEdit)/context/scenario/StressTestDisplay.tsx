import { stressTestOptions } from "@/app/lib/data/options"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import React from "react"
import { scenarioConstants } from "./scenarioConstants"

export const StressTestDisplay: React.FunctionComponent = (props) => {
  const { selectedScenario } = React.useContext(ScenarioContext)
  const { stressTest } = selectedScenario

  const option = stressTestOptions.find((it) => it.value === stressTest)

  const { summary, label } = option || {}
  return (
    <>
      <TextDisplayField label={scenarioConstants.STRESS_TEST.LABEL} value={label || ""} />
      {summary && (
        <div className="ml-4">
          <Alert heading="Details" alertType={AlertType.INFO}>
            {summary}
          </Alert>
        </div>
      )}
    </>
  )
}
