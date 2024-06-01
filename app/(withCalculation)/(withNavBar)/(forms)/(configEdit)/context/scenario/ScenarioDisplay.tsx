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
import { EditButton } from "@/app/ui/components/common/EditButton"
import { RemoveButton } from "@/app/ui/components/common/RemoveButton"
import { ButtonGroup } from "@/app/ui/components/common/ButtonGroup"

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
        {/* <div className="flex justify-end">
          <EditButton onClick={handleEdit} />
          <RemoveButton onClick={handleRemove} disabled={removeButtonDisabled} />
        </div> */}
      </h2>

      <TextDisplayField label={scenarioConstants.NAME.LABEL} helpText={scenarioConstants.NAME.HELP_TEXT} value={name} />
      <TextDisplayField
        label={scenarioConstants.DESCRIPTION.LABEL}
        helpText={scenarioConstants.DESCRIPTION.HELP_TEXT}
        value={description || "n/a"}
      />
      <ButtonGroup>
        <Button buttonType={ButtonType.primary} onClick={handleEdit}>
          <div className="flex items-center justify-center">
            <PencilSquareIcon className="mx-2 h-6 w-6" />
            <div>Edit</div>
          </div>
        </Button>
        <Button buttonType={ButtonType.secondary} onClick={handleRemove} disabled={removeButtonDisabled}>
          <div className="flex items-center justify-center">
            <TrashIcon className="mx-2 h-6 w-6" />
            <div>Remove</div>
          </div>
        </Button>
      </ButtonGroup>
    </Card>
  )
}
