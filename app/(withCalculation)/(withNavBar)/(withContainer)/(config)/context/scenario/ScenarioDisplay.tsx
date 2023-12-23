import * as React from "react"

import { AlertType } from "@/app/ui/components/alert/Alert"
import { Card } from "@/app/ui/components/Card"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { scenarioConstants } from "./scenarioConstants"

// TODO: common card component - buttons top right or at the bottom

export const ScenarioDisplay: React.FunctionComponent = (props) => {
  const navigation = useNavigation()
  const { selectedScenario, deleteSelectedScenario, scenarios } = React.useContext(ScenarioContext)

  const handleEdit = () => {
    navigation.goTo(AppPath.scenarioEdit, { id: selectedScenario.id })
  }

  const handleRemove = () => {
    if (scenarios && scenarios?.length > 1) {
      deleteSelectedScenario()
    }
  }

  const { name, description } = selectedScenario

  const removeButtonDisabled = scenarios?.length === 1

  return (
    <Card type={AlertType.info}>
      <h2 className="flex items-center justify-between text-primary">
        Scenario
        <div className="flex">
          <Button buttonType={ButtonType.tertiary} onClick={handleEdit}>
            <div className="flex items-center">
              <PencilSquareIcon className="mx-2 h-4 w-4" /> <div className="text-base">Edit</div>
            </div>
          </Button>
          <Button buttonType={ButtonType.tertiary} onClick={handleRemove} disabled={removeButtonDisabled}>
            <div className="flex items-center">
              <TrashIcon className="mx-2 h-4 w-4" />
              <div className="text-base">Remove</div>
            </div>
          </Button>
        </div>
      </h2>

      <TextDisplayField label={scenarioConstants.NAME.LABEL} helpText={scenarioConstants.NAME.HELP_TEXT} value={name} />
      <TextDisplayField
        label={scenarioConstants.DESCRIPTION.LABEL}
        helpText={scenarioConstants.DESCRIPTION.HELP_TEXT}
        value={description || "n/a"}
      />
    </Card>
  )
}
