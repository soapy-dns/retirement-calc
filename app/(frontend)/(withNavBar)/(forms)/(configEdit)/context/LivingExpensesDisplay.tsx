import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { Table } from "@/app/ui/components/common/Table"
import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { ContextType, useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { getCurrencyFormatter } from "@/app/ui/utils/formatter"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

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

  const { context, asAtYear } = selectedScenario
  const { livingExpenses } = context

  const headingData = ["From year", "Value at today's date"]
  const rowData = livingExpenses.map((it) => {
    return [it?.fromYear?.toString() || asAtYear.toString(), currencyFormatter.format(it.amountInTodaysTerms)]
  })

  const handleEdit = () => {
    navigation.goTo(AppPath.contextLivingExpensesEdit)
  }
  const handleEditFn = selectedScenario.asAtYear >= getCurrentYear() ? handleEdit : undefined

  const heading = (
    <h2 className="flex items-center justify-between text-primary">
      <div className="flex gap-2 items-center">
        Living expenses
        <button onClick={showInfo}>
          <InformationCircleIcon className="w-6 h-6" />
        </button>
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
        <Table caption="Living expenses configuration" headingData={headingData} rowData={rowData} border={false} />
      </div>{" "}
    </DisplayCardWithEdit>
  )
}
