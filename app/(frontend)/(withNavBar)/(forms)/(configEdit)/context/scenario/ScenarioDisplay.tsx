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
import { Card } from "@/app/ui/components/Card"
import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { ButtonGroupEditRemove } from "@/app/ui/components/common/ButtonGroupEditRemove"
import { StressTestDisplay } from "./StressTestDisplay"

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

  const { name, description, asAtYear, stressTest } = selectedScenario

  const removeButtonDisabled = scenarios?.length === 1

  const EditButton = () => (
    <div className="mx-auto my-6 w-3/4">
      <Button buttonType={ButtonType.primary} onClick={handleEdit}>
        <div className="flex items-center gap-2">
          <PencilSquareIcon className="h-6 w-6" />
          <div>Edit</div>
        </div>
      </Button>
    </div>
  )

  return (
    <Card>
      <h2 className="text-primary flex justify-center">{name}</h2>
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

      <div className="px-4">
        {removeButtonDisabled && (
          <div className="my-4">
            <Alert heading="Note" alertType={AlertType.INFO}>
              There is only 1 scenario. Therefore this scanario can only be edited or duplicated but not removed.
            </Alert>
          </div>
        )}

        {selectedScenario.asAtYear < getCurrentYear() && (
          <div className="my-4">
            <Alert alertType={AlertType.WARNING}>
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1 ">
                  <LockClosedIcon className="w-8 h-8 sm:w-10 sm:h-10 text-warning-foreground" />
                </div>
                <p className="col-span-11 py-2">
                  This scenario has an &apos;As at year&apos; in the past. It is therefore locked to further changes.
                  You can still copy it to a new scenario. (Updates to the asAtDate will be made and context values
                  updatesd as projected.)
                </p>
              </div>
            </Alert>
          </div>
        )}

        <TextDisplayField label={scenarioConstants.DESCRIPTION.LABEL} value={description || "n/a"} />

        <TextDisplayField label={scenarioConstants.AS_AT_YEAR.LABEL} value={asAtYear} />

        <StressTestDisplay />
      </div>

      {asAtYear === getCurrentYear() && <EditButton />}
    </Card>
  )
}
