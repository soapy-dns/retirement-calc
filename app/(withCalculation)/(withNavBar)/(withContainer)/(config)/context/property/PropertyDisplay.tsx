import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import * as React from "react"

import { contextConstants } from "../contextConstants"

export const PropertyDisplay: React.FunctionComponent = (props) => {
  const heading = "Property"
  const navigation = useNavigation()

  const handleEdit = () => {
    navigation.goTo(AppPath.contextPropertyEdit)
  }

  const { selectedScenario } = React.useContext(ScenarioContext)
  const { context } = selectedScenario
  const { property } = context

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEdit}>
      <TextDisplayField
        label={contextConstants.PROPERTY_GROWTH_RATE.LABEL}
        helpText={contextConstants.PROPERTY_GROWTH_RATE.HELP_TEXT}
        value={(property.growthInterestRate * 100).toFixed(2)}
        suffix="%"
      />
    </DisplayCardWithEdit>
  )
}
