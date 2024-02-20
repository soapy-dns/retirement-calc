import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import * as React from "react"

import { contextConstants } from "../contextConstants"
import { ContextType, useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"

export const BankAuDisplay: React.FunctionComponent = (props) => {
  const heading = "Cash"
  const navigation = useNavigation()

  const handleEdit = () => {
    navigation.goTo(AppPath.contextBankEdit)
  }

  const { selectedScenario } = React.useContext(ScenarioContext)
  const { hasValidationErrors } = useContextConfig()

  const { context } = selectedScenario
  const { auBank } = context

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEdit}>
      {hasValidationErrors(ContextType.cash) && (
        <div className="mb-4">
          <Alert alertType={AlertType.error} heading="Has configuration errors" />
        </div>
      )}

      <TextDisplayField
        label={contextConstants.CASH_INTEREST_RATE.LABEL}
        helpText={contextConstants.CASH_INTEREST_RATE.HELP_TEXT}
        value={(auBank.interestRate * 100).toFixed(2)}
        suffix="%"
      />
    </DisplayCardWithEdit>
  )
}
