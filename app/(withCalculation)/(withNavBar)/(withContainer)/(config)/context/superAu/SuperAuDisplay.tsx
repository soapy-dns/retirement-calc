import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import * as React from "react"

import { contextConstants } from "../contextConstants"

export const SuperAuDisplay: React.FunctionComponent = (props) => {
  const heading = "Super"
  const navigation = useNavigation()

  const handleEdit = () => {
    navigation.goTo(AppPath.contextSuperEdit)
  }

  const { selectedScenario } = React.useContext(ScenarioContext)
  const { context } = selectedScenario
  const { superAu } = context

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEdit}>
      <TextDisplayField
        label={contextConstants.SUPER_INVESTMENT_RETURN.LABEL}
        helpText={contextConstants.SUPER_INVESTMENT_RETURN.HELP_TEXT}
        value={superAu ? (superAu?.investmentReturn * 100).toFixed(2) : "-"}
        suffix="%"
      />
      <TextDisplayField
        label={contextConstants.SUPER_TAXATION_RATE.LABEL}
        helpText={contextConstants.SUPER_TAXATION_RATE.HELP_TEXT}
        value={superAu ? (superAu?.taxationRate * 100).toFixed(2) : "-"}
        suffix="%"
      />
    </DisplayCardWithEdit>
  )
}
