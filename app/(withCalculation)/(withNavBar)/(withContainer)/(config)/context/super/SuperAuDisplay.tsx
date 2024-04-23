import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import * as React from "react"
import { contextConstants } from "../contextConstants"
import { ContextType, useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"

export const SuperAuDisplay: React.FunctionComponent = (props) => {
  const heading = "Super"
  const navigation = useNavigation()
  const { hasValidationErrors } = useContextConfig()

  const handleEdit = () => {
    navigation.goTo(AppPath.contextSuperEdit)
  }

  const { selectedScenario } = React.useContext(ScenarioContext)
  const { context } = selectedScenario
  const { superAu } = context

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEdit}>
      {hasValidationErrors(ContextType.super) && (
        <div className="mb-4">
          <Alert alertType={AlertType.error} heading="Has configuration errors" />
        </div>
      )}
      <TextDisplayField
        label={contextConstants.SUPER_INVESTMENT_RETURN.LABEL}
        helpText={contextConstants.SUPER_INVESTMENT_RETURN.HELP_TEXT}
        value={superAu ? (superAu?.investmentReturn * 100).toFixed(2) : "-"}
        suffix="%"
      />

    </DisplayCardWithEdit>
  )
}
