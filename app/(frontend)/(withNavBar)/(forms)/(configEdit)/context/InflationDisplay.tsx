import { Card } from "@/app/ui/components/Card"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { EditButton } from "@/app/ui/components/common/EditButton"
import { Table } from "@/app/ui/components/common/Table"
import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { ContextType, useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { InformationCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

interface Props {
  showInfo: () => void
}

export const InflationDisplay: React.FC<Props> = ({ showInfo }) => {
  const navigation = useNavigation()

  const { selectedScenario } = useContext(ScenarioContext)
  const { hasValidationErrors } = useContextConfig()
  const { context } = selectedScenario
  const { inflation } = context
  const headingData = ["From year", "Inflation rate"]
  const rowData = inflation.map((it) => {
    return [it.fromYear.toString(), (it.inflationRate * 100).toFixed(2) + "%"]
  })

  const handleEdit = () => {
    navigation.goTo(AppPath.contextInflationEdit)
  }

  const heading = (
    <h2 className="flex items-center justify-between text-primary">
      <div className="flex gap-2 items-center">
        Inflation
        <button onClick={showInfo}>
          <InformationCircleIcon className="w-6 h-6" />
        </button>
      </div>
    </h2>
  )

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEdit}>
      <div>
        {hasValidationErrors(ContextType.inflation) && (
          <div className="mb-4">
            <Alert alertType={AlertType.error} heading="Has configuration errors" />
          </div>
        )}
        <Table caption="Inflation configuration" headingData={headingData} rowData={rowData} border={false} />
      </div>{" "}
    </DisplayCardWithEdit>
  )
}
