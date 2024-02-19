import { getStartingYear } from "@/app/lib/calculations/utils/getStartingYear"
import { Card } from "@/app/ui/components/Card"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { Table } from "@/app/ui/components/common/Table"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { currencyFormatter } from "@/app/ui/utils/formatter"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

export const LivingExpensesDisplay: React.FC = () => {
  const navigation = useNavigation()

  const { selectedScenario } = useContext(ScenarioContext)
  const { context } = selectedScenario
  const { livingExpenses } = context

  const headingData = ["From year", "Value at today's date"]
  const rowData = livingExpenses.map((it) => {
    return [it?.fromYear?.toString() || getStartingYear().toString(), currencyFormatter.format(it.amountInTodaysTerms)]
  })

  const handleEdit = () => {
    navigation.goTo(AppPath.contextLivingExpensesEdit)
  }

  return (
    <Card>
      <h2 className="flex items-center justify-between text-primary">
        Living expenses
        <Button buttonType={ButtonType.tertiary} onClick={handleEdit}>
          <div className="flex items-center gap-2">
            <PencilSquareIcon className="mx-2 h-6 w-6" /> <div className="text-base">Edit</div>
          </div>
        </Button>
      </h2>
      <div>
        <Table caption="Living expenses configuration" headingData={headingData} rowData={rowData} border={false} />
      </div>{" "}
    </Card>
  )
}
