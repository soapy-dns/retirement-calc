import * as React from "react"

import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { LockClosedIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { scenarioConstants } from "./scenarioConstants"
import { ButtonGroup } from "@/app/ui/components/common/ButtonGroup"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"

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
      <div className="mb-8">
        <ButtonGroup>
          <Button buttonType={ButtonType.tertiary} onClick={handleAdd}>
            <div className="flex items-center justify-center gap-2">
              <PlusCircleIcon className="h-6 w-6" />
              Copy this scenario
            </div>
          </Button>
          <Button buttonType={ButtonType.tertiary} onClick={handleRemove} disabled={removeButtonDisabled}>
            <div className="flex items-center justify-center gap-2">
              <TrashIcon className="h-6 w-6" />
              <div>Remove this scenario</div>
            </div>
          </Button>
        </ButtonGroup>
      </div>

      {removeButtonDisabled && (
        <div className="my-4">
          <Alert heading="Note" alertType={AlertType.info}>
            There is only 1 scenario. Therefore this scanario can only be edited or duplicated but not removed.
          </Alert>
        </div>
      )}

      {selectedScenario.asAtYear < getCurrentYear() && (
        <div className="my-4">
          <Alert alertType={AlertType.info}>
            <div className="flex gap-4">
              <LockClosedIcon className="w-6 h-6 text-primary" /> This scenario has an &apos;As at year&apos; in the
              past. It is therefore locked to further changes.
            </div>
          </Alert>
        </div>
      )}

      <TextDisplayField label={scenarioConstants.NAME.LABEL} helpText={scenarioConstants.NAME.HELP_TEXT} value={name} />
      {asAtYear === getCurrentYear() && <EditButton />}

      <TextDisplayField
        label={scenarioConstants.DESCRIPTION.LABEL}
        helpText={scenarioConstants.DESCRIPTION.HELP_TEXT}
        value={description || "n/a"}
      />
      {asAtYear === getCurrentYear() && <EditButton />}

      <TextDisplayField
        label={scenarioConstants.AS_AT_YEAR.LABEL}
        helpText={scenarioConstants.AS_AT_YEAR.HELP_TEXT}
        value={asAtYear}
      />
    </>
  )
}
