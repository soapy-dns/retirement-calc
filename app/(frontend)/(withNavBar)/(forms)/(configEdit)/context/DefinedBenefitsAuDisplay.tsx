import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import * as React from "react"

import { ContextType, useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { contextConstants } from "./contextConstants"

export const DefinedBenefitsAuDisplay: React.FunctionComponent = (props) => {
  const heading = "Defined benefits pension"
  const navigation = useNavigation()
  const { hasValidationErrors } = useContextConfig()

  const handleEdit = () => {
    navigation.goTo(AppPath.contextDefinedBenefitsEdit)
  }

  const { selectedScenario } = React.useContext(ScenarioContext)
  const { context } = selectedScenario
  const { definedBenefitsAu } = context

  return (
    <DisplayCardWithEdit heading={heading}>
      {hasValidationErrors(ContextType.definedBenefits) && (
        <div className="mb-4">
          <Alert alertType={AlertType.error} heading="Has configuration errors" />
        </div>
      )}
      <>
        <TextDisplayField
          label={contextConstants.USE_INFLATION_RATE.LABEL}
          helpText={contextConstants.USE_INFLATION_RATE.HELP_TEXT}
          value="Yes"
          // value={definedBenefitsAu.useInflationRate ? "Yes..." : "No"}
        />

        {/* {!definedBenefitsAu.useInflationRate && (
          <TextDisplayField
            label={contextConstants.DEFINED_BENEFITS_INDEXATION.LABEL}
            helpText={contextConstants.DEFINED_BENEFITS_INDEXATION.HELP_TEXT}
            value={definedBenefitsAu?.indexationRate ? definedBenefitsAu?.indexationRate * 100 : "-"}
          />
        )} */}
      </>
    </DisplayCardWithEdit>
  )
}
