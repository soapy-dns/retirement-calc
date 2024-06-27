import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { Table } from "@/app/ui/components/common/Table"
import { InfoButton } from "@/app/ui/components/common/accordian/InfoButton"
import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { ContextType, useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
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

  const handleEditFn = selectedScenario.asAtYear >= getCurrentYear() ? handleEdit : undefined

  const heading = (
    <h2 className="flex items-center justify-between text-primary">
      <div className="flex gap-2 items-center">
        Inflation
        <InfoButton showInfo={showInfo} />
      </div>
    </h2>
  )

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEditFn}>
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
