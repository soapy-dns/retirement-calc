import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import * as React from "react"
import { contextConstants } from "../contextConstants"
import { ContextType, useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"

export const PropertyDisplay: React.FunctionComponent = (props) => {
  const heading = "Property"
  const navigation = useNavigation()
  const { hasValidationErrors } = useContextConfig()
  const { selectedScenario } = React.useContext(ScenarioContext)

  const handleEdit = () => {
    navigation.goTo(AppPath.contextPropertyEdit)
  }

  const { context, asAtYear } = selectedScenario
  const { property } = context

  const handleEditFn = asAtYear >= getCurrentYear() ? handleEdit : undefined

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEditFn}>
      {hasValidationErrors(ContextType.property) && (
        <div className="mb-4">
          <Alert alertType={AlertType.error} heading="Has configuration errors" />
        </div>
      )}
      <TextDisplayField
        label={contextConstants.PROPERTY_GROWTH_RATE.LABEL}
        helpText={contextConstants.PROPERTY_GROWTH_RATE.HELP_TEXT}
        value={(property.growthInterestRate * 100).toFixed(2)}
        suffix="%"
      />
    </DisplayCardWithEdit>
  )
}
