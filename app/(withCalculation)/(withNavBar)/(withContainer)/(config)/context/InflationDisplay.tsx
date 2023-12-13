import { Card } from "@/app/ui/components/Card"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { Table } from "@/app/ui/components/common/Table"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

export const InflationDisplay: React.FC = () => {
  const navigation = useNavigation()

  const { selectedScenario } = useContext(ScenarioContext)
  const { context } = selectedScenario
  const { inflation } = context
  const headingData = ["From year", "Inflation rate"]
  const rowData = inflation.map((it) => {
    return [it.fromYear.toString(), (it.inflationRate * 100).toFixed(2) + "%"]
  })

  const handleEdit = () => {
    navigation.goTo(AppPath.contextInflationEdit)
  }

  return (
    <Card>
      <h2 className="flex items-center justify-between text-primary">
        Inflation
        <Button buttonType={ButtonType.tertiary} onClick={handleEdit}>
          <div className="flex items-center gap-2">
            <PencilSquareIcon className="mx-2 h-4 w-4" /> <div className="text-base">Edit</div>
          </div>
        </Button>
      </h2>
      <div>
        <Table caption="Inflation configuration" headingData={headingData} rowData={rowData} border={false} />
      </div>{" "}
    </Card>
  )
}
