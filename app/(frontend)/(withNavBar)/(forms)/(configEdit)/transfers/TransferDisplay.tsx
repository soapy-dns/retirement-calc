import { Transfer } from "@/app/lib/data/schema/config"
import { Card } from "@/app/ui/components/Card"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { ButtonGroup } from "@/app/ui/components/common/ButtonGroup"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { useTransfer } from "@/app/ui/hooks/useTransfer"
import { AppPath } from "@/app/ui/types"
import { getCurrencyFormatter } from "@/app/ui/utils/formatter"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { FunctionComponent, useContext } from "react"
import { transferConstants } from "./transferConstants"
import { useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"
import { scrollFieldIntoView } from "@/app/ui/utils/scrollUtils"
import { configNavBarId } from "../ConfigNavBar"

interface Props {
  transfers: Transfer[]
}
export const TransferDisplay: FunctionComponent<Props> = ({ transfers }) => {
  const navigation = useNavigation()
  const { removeTransfer } = useTransfer()
  const { getSelectedScenarioAssetsOptions, selectedScenario } = useContext(ScenarioContext)
  const { getCurrency } = useContextConfig()
  const currencyCountry = getCurrency()
  const currencyFormatter = getCurrencyFormatter(currencyCountry)
  const { asAtYear } = selectedScenario

  const handleEdit = (id: string) => {
    navigation.goTo(AppPath.transferEdit, { id })
  }

  const handleRemove = (id: string) => {
    removeTransfer(id)
    // scroll to config nav
    scrollFieldIntoView(configNavBarId, 30)

    // TODO: modal to confirm.
  }

  const transferOptions = getSelectedScenarioAssetsOptions({ excludeIncome: true })

  const getDisplayValue = (value: string) => {
    const matchingOption = transferOptions.find((it) => it.value === value)
    if (!matchingOption) throw new Error(`No matching option found for ${value}`)
    return matchingOption?.label
  }

  return (
    <div className="ml-4">
      {transfers.map((transfer) => {
        const { id, year, from, to, value, migrateAll, costOfTransfer } = transfer

        return (
          <Card key={transfer.from}>
            <TextDisplayField label={transferConstants.YEAR.LABEL} value={year} />
            <TextDisplayField label={transferConstants.FROM.LABEL} value={getDisplayValue(from)} />
            <TextDisplayField label={transferConstants.TO.LABEL} value={getDisplayValue(to)} />
            <TextDisplayField label={transferConstants.MIGRATE_ALL.LABEL} value={migrateAll ? "Yes" : "No"} />
            {!migrateAll && value && (
              <>
                <TextDisplayField label={transferConstants.VALUE.LABEL} value={currencyFormatter.format(value)} />
              </>
            )}
            <TextDisplayField
              label={transferConstants.TRANSFER_COST.LABEL}
              value={costOfTransfer ? currencyFormatter.format(costOfTransfer) : ""}
            />

            {asAtYear >= getCurrentYear() && (
              <ButtonGroup>
                <Button buttonType={ButtonType.primary} onClick={(e) => handleEdit(id)}>
                  <div className="flex items-center justify-center">
                    <PencilSquareIcon className="mx-2 h-6 w-6" />
                    <div>Edit</div>
                  </div>
                </Button>
                <Button buttonType={ButtonType.secondary} onClick={() => handleRemove(id)}>
                  <div className="flex items-center justify-center">
                    <TrashIcon className="mx-2 h-6 w-6" />
                    <div>Remove</div>
                  </div>
                </Button>
              </ButtonGroup>
            )}
          </Card>
        )
      })}
    </div>
  )
}
