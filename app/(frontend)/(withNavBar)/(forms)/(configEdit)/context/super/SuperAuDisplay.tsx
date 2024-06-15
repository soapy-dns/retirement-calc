import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { contextConstants } from "../contextConstants"
import { ContextType, useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"
import { useContext } from "react"

export const SuperAuDisplay: React.FunctionComponent = (props) => {
  const heading = "Super"
  const navigation = useNavigation()
  const { hasValidationErrors } = useContextConfig()
  const { selectedScenario } = useContext(ScenarioContext)

  const handleEdit = () => {
    navigation.goTo(AppPath.contextSuperEdit)
  }
  const handleEditFn = selectedScenario.asAtYear >= getCurrentYear() ? handleEdit : undefined

  const { context } = selectedScenario
  const { superAu } = context

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEditFn}>
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
