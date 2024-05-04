import { getStartingYear } from "@/app/lib/calculations/utils/getStartingYear"
import { Card } from "@/app/ui/components/Card"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { Table } from "@/app/ui/components/common/Table"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { ContextType, useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { getCurrencyFormatter } from "@/app/ui/utils/formatter"
import { InformationCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { MouseEvent, useContext } from "react"

interface Props {
  showInfo: () => void
}

export const LivingExpensesDisplay: React.FC<Props> = ({ showInfo }) => {
  const navigation = useNavigation()
  const { getCurrency } = useContextConfig()
  const currencyCountry = getCurrency()
  const currencyFormatter = getCurrencyFormatter(currencyCountry)

  const { selectedScenario } = useContext(ScenarioContext)
  const { hasValidationErrors } = useContextConfig()

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
        <div className="flex gap-2 items-center">
          Living expenses
          <button onClick={showInfo}>
            <InformationCircleIcon className="w-6 h-6" />
          </button>
        </div>
        <Button buttonType={ButtonType.tertiary} onClick={handleEdit}>
          <div className="flex items-center  gap-2">
            <PencilSquareIcon className="mx-2 h-6 w-6" /> <div className="text-base">Edit</div>
          </div>
        </Button>
      </h2>
      <div>
        {hasValidationErrors(ContextType.inflation) && (
          <div className="mb-4">
            <Alert alertType={AlertType.error} heading="Has configuration errors" />
          </div>
        )}
        <Table caption="Living expenses configuration" headingData={headingData} rowData={rowData} border={false} />
      </div>{" "}
    </Card>
  )
}
