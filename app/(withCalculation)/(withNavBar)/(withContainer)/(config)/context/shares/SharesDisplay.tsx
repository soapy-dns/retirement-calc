import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import * as React from "react"
import { contextConstants } from "../contextConstants"
import { ContextType, useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"

export const SharesDisplay: React.FunctionComponent = (props) => {
  const heading = "Shares"
  const navigation = useNavigation()
  const { hasValidationErrors } = useContextConfig()

  const handleEdit = () => {
    navigation.goTo(AppPath.contextSharesEdit)
  }

  const { selectedScenario } = React.useContext(ScenarioContext)
  const { context } = selectedScenario
  const { sharesAu } = context

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEdit}>
      {hasValidationErrors(ContextType.shares) && (
        <div className="mb-4">
          <Alert alertType={AlertType.error} heading="Has configuration errors" />
        </div>
      )}
      <TextDisplayField
        label={contextConstants.SHARES_GROWTH.LABEL}
        helpText={contextConstants.SHARES_GROWTH.HELP_TEXT}
        value={sharesAu ? (sharesAu.growthInterestRate * 100).toFixed(2) : "-"}
        suffix="%"
      />
      <TextDisplayField
        label={contextConstants.SHARES_INCOME.LABEL}
        helpText={contextConstants.SHARES_INCOME.HELP_TEXT}
        value={sharesAu ? (sharesAu.dividendInterestRate * 100).toFixed(2) : "-"}
        suffix="%"
      />
    </DisplayCardWithEdit>
  )
}
