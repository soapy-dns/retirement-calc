import type { IAsset, OwnerType } from "@/app/lib/data/schema/config"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { Card } from "@/app/ui/components/Card"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { ButtonGroup } from "@/app/ui/components/common/ButtonGroup"
import { useAsset } from "@/app/ui/hooks/useAsset"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { getCurrencyFormatter } from "@/app/ui/utils/formatter"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

import { getAssetDisplayDetails } from "./utils"
import { useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"
import { useContext } from "react"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { ButtonGroupEditRemove } from "@/app/ui/components/common/ButtonGroupEditRemove"

interface IAssetItemDisplay {
  removeAllowed: boolean
  asset: IAsset
  owners: OwnerType[]
}

export const AssetSummary = ({ asset, removeAllowed }: IAssetItemDisplay) => {
  const navigation = useNavigation()
  const { removeAsset, hasTransfers, hasValidationErrors } = useAsset()
  const { getCurrency } = useContextConfig()
  const { selectedScenario } = useContext(ScenarioContext)

  const currencyCountry = getCurrency()
  const currencyFormatter = getCurrencyFormatter(currencyCountry)

  const handleEdit = () => {
    const { id } = asset
    navigation.goTo(AppPath.assetEdit, { id })
  }
  const handleEditFn = selectedScenario.asAtYear >= getCurrentYear() ? handleEdit : undefined

  const handleRemove = () => {
    if (disabled) return

    const { id } = asset
    removeAsset(id)

    // TODO: modal to confirm removal
  }

  const { AssetClassIcon, type } = getAssetDisplayDetails(asset)

  const { name, description } = asset

  const transfersExist = hasTransfers(asset)

  const disabled = removeAllowed || transfersExist === true

  return (
    <Card>
      <div className="grid grid-cols-3 justify-items-auto ">
        <div className="sm:flex-col  border-r border-primary text-primary-foreground justify-center items-center text-center hidden sm:flex">
          <AssetClassIcon className="h-12 w-12" />
          <div className="font-semibold">{type}</div>
        </div>

        <div className="col-span-3 sm:col-span-2 px-4">
          <div className="mb-4">
            <h2 className="my-auto text-primary-foreground">{name}</h2>
          </div>
          <div>
            {hasValidationErrors(asset) && (
              <div className="mb-4">
                <Alert alertType={AlertType.ERROR} heading="Asset configuration has errors" />
              </div>
            )}
            {hasTransfers(asset) && (
              <div className="mb-4">
                <Alert alertType={AlertType.INFO} heading="Asset has transfers" />
              </div>
            )}
            <div className="flex gap-2">
              <b>Description:</b>
              <div className="break-words">{description}</div>
            </div>
            {asset.className === "Salary" || asset.className === "AuDefinedBenefits" ? (
              <div className="flex gap-2">
                <b>Initial income:</b>
                <span>{currencyFormatter.format(asset.income.incomeAmt)}</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <b>Initial value:</b>
                <span>{currencyFormatter.format(asset.value)}</span>
              </div>
            )}

            {selectedScenario.asAtYear >= getCurrentYear() && (
              <ButtonGroupEditRemove handleEdit={handleEditFn} handleRemove={handleRemove} disableRemove={disabled} />
              // <ButtonGroup>
              //   <Button buttonType={ButtonType.primary} onClick={handleEdit}>
              //     <div className="flex items-center gap-2">
              //       <PencilSquareIcon className="h-6 w-6" />
              //       <div>Edit</div>
              //     </div>
              //   </Button>
              //   <Button buttonType={ButtonType.secondary} onClick={handleRemove} disabled={disabled}>
              //     <div className="flex items-center gap-2">
              //       <TrashIcon className="h-6 w-6" />
              //       <div>Remove</div>
              //     </div>
              //   </Button>
              // </ButtonGroup>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
