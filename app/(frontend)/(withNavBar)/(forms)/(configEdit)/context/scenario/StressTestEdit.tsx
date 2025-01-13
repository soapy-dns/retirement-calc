import { stressTestOptions } from "@/app/lib/data/options"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { SelectQuestion } from "@/app/ui/components/form/SelectQuestion"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import React from "react"
import { Control } from "react-hook-form"
import { scenarioConstants } from "./scenarioConstants"

interface Props {
  control: Control<any, object>
  watch: Function
}

export const StressTestEdit: React.FunctionComponent<Props> = (props) => {
  const { control, watch } = props
  const stressTest = watch("stressTest")

  const option = stressTestOptions.find((it) => it.value === stressTest)

  const { summary } = option || {}

  const selectOptions = stressTestOptions.map((it) => ({ label: it.label, value: it.value }))

  return (
    <>
      <SelectQuestion
        id="stressTest"
        control={control}
        label={scenarioConstants.STRESS_TEST.LABEL}
        options={selectOptions}
        editable={true}
        helpText={scenarioConstants.STRESS_TEST.HELP_TEXT}
        summaryText={summary}
      />
    </>
  )
}
