import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import * as React from "react"
import { contextConstants } from "../contextConstants"
import { ContextType, useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"

export const SharesDisplay: React.FunctionComponent = (props) => {
  const heading = "Shares"
  const navigation = useNavigation()
  const { hasValidationErrors } = useContextConfig()
  const { selectedScenario } = React.useContext(ScenarioContext)

  const handleEdit = () => {
    navigation.goTo(AppPath.contextSharesEdit)
  }

  const { context, asAtYear } = selectedScenario
  const { sharesAu } = context
  const handleEditFn = asAtYear >= getCurrentYear() ? handleEdit : undefined

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEditFn}>
      {hasValidationErrors(ContextType.shares) && (
        <div className="mb-4">
          <Alert alertType={AlertType.ERROR} heading="Has configuration errors" />
        </div>
      )}
      <TextDisplayField
        label={contextConstants.SHARES_GROWTH.LABEL}
        value={sharesAu ? (sharesAu.growthInterestRate * 100).toFixed(2) : "-"}
        suffix="%"
      />
      <TextDisplayField
        label={contextConstants.SHARES_INCOME.LABEL}
        value={sharesAu ? (sharesAu.dividendInterestRate * 100).toFixed(2) : "-"}
        suffix="%"
      />
    </DisplayCardWithEdit>
  )
}
