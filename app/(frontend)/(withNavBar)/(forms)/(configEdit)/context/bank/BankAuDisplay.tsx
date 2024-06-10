import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { useContext } from "react"

import { contextConstants } from "../contextConstants"
import { ContextType, useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"

export const BankAuDisplay: React.FunctionComponent = (props) => {
  const heading = "Cash"
  const navigation = useNavigation()
  const { selectedScenario } = useContext(ScenarioContext)

  const handleEdit = () => {
    navigation.goTo(AppPath.contextBankEdit)
  }

  const { hasValidationErrors } = useContextConfig()

  const { context, asAtYear } = selectedScenario
  const { auBank } = context

  const handleEditFn = asAtYear >= getCurrentYear() ? handleEdit : undefined

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEditFn}>
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
