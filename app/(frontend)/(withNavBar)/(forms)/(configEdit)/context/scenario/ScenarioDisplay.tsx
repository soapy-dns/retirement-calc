import * as React from "react"

import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { scenarioConstants } from "./scenarioConstants"
import { ButtonGroup } from "@/app/ui/components/common/ButtonGroup"

// TODO: common card component - buttons top right or at the bottom

export const ScenarioDisplay: React.FunctionComponent = (props) => {
  const navigation = useNavigation()
  const { selectedScenario, deleteSelectedScenario, scenarios } = React.useContext(ScenarioContext)

  const handleAdd = () => {
    navigation.goTo(AppPath.scenarioAdd)
  }

  const handleEdit = () => {
    navigation.goTo(AppPath.scenarioEdit, { id: selectedScenario.id })
  }

  const handleRemove = () => {
    if (scenarios && scenarios?.length > 1) {
      deleteSelectedScenario()
    }
  }

  const { name, description, asAtYear } = selectedScenario

  const removeButtonDisabled = scenarios?.length === 1

  const EditButton = () => (
    <Button buttonType={ButtonType.tertiary} onClick={handleEdit}>
      <div className="flex items-center justify-center gap-2">
        <PencilSquareIcon className="h-6 w-6" />
        <div>Edit</div>
      </div>
    </Button>
  )

  return (
    <>
      <ButtonGroup>
        <Button buttonType={ButtonType.tertiary} onClick={handleAdd}>
          <div className="flex items-center gap-2">
            <PlusCircleIcon className="h-6 w-6" />
            Duplicate this scenario
          </div>
        </Button>
        <Button buttonType={ButtonType.tertiary} onClick={handleRemove} disabled={removeButtonDisabled}>
          <div className="flex items-center justify-center gap-2">
            <TrashIcon className="h-6 w-6" />
            <div>Remove this scenario</div>
          </div>
        </Button>
      </ButtonGroup>

      {removeButtonDisabled && (
        <div className="my-4">
          <Alert heading="Note" alertType={AlertType.info}>
            There is only 1 scenario. Therefore this scanario can only be edited or duplicated but not removed.
          </Alert>
        </div>
      )}

      <TextDisplayField label={scenarioConstants.NAME.LABEL} helpText={scenarioConstants.NAME.HELP_TEXT} value={name} />
      <EditButton />
      {/* <Button buttonType={ButtonType.tertiary} onClick={handleEdit}>
        <div className="flex items-center justify-center gap-2">
          <PencilSquareIcon className="h-6 w-6" />
          <div>Edit</div>
        </div>
      </Button> */}

      <TextDisplayField
        label={scenarioConstants.DESCRIPTION.LABEL}
        helpText={scenarioConstants.DESCRIPTION.HELP_TEXT}
        value={description || "n/a"}
      />
      <EditButton />

      <TextDisplayField
        label={scenarioConstants.AS_AT_YEAR.LABEL}
        helpText={scenarioConstants.AS_AT_YEAR.HELP_TEXT}
        value={asAtYear}
      />
      <EditButton />
    </>
  )
}
