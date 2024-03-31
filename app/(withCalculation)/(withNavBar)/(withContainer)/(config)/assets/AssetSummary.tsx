import type { IAsset } from "@/app/lib/data/schema/config"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { Card } from "@/app/ui/components/Card"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { ButtonGroup } from "@/app/ui/components/common/ButtonGroup"
import { useAsset } from "@/app/ui/hooks/useAsset"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { currencyFormatter } from "@/app/ui/utils/formatter"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

import { getAssetDisplayDetails } from "./utils"

interface IAssetItemDisplay {
  removeAllowed: boolean
  asset: IAsset
  owners: string[]
}

export const AssetSummary = ({ asset, owners, removeAllowed }: IAssetItemDisplay) => {
  const navigation = useNavigation()
  const { removeAsset, hasTransfers, hasValidationErrors } = useAsset()

  const handleEdit = () => {
    const { id } = asset
    navigation.goTo(AppPath.assetEdit, { id })
  }

  const handleRemove = () => {
    if (disabled) return

    const { id } = asset
    removeAsset(id)

    // TODO: modal to confirm
  }

  const { AssetClassIcon, type } = getAssetDisplayDetails(asset)

  const { name, description } = asset

  const transfersExist = hasTransfers(asset)

  const disabled = removeAllowed || transfersExist === true

  return (
    <Card>
      <div className="grid grid-cols-3 justify-items-auto ">
        <div className="sm:flex-col  border border-primary text-primary justify-center items-center text-center hidden sm:flex">
          <AssetClassIcon className="h-12 w-12" />
          <div className="font-semibold">{type}</div>
        </div>

        <div className="col-span-3 sm:col-span-2 px-4">
          <div className="mb-4">
            <h2 className="my-auto text-primary">{name}</h2>
          </div>
          <div>
            {hasValidationErrors(asset) && (
              <div className="mb-4">
                <Alert alertType={AlertType.error} heading="Asset configuration has errors" />
              </div>
            )}
            {hasTransfers(asset) && (
              <div className="mb-4">
                <Alert alertType={AlertType.info} heading="Asset has transfers" />
              </div>
            )}
            <p className="flex gap-2">
              <b>Description:</b>
              {description}
            </p>
            {asset.className === "Salary" || asset.className === "AuDefinedBenefits" ? (
              <p className="flex gap-2">
                <b>Initial income:</b>
                <span>{currencyFormatter.format(asset.income.incomeAmt)}</span>
              </p>
            ) : (
              <p className="flex gap-2">
                <b>Initial value:</b>
                <span>{currencyFormatter.format(asset.value)}</span>
              </p>
            )}

            <ButtonGroup>
              <Button buttonType={ButtonType.primary} onClick={handleEdit}>
                <div className="flex items-center">
                  <PencilSquareIcon className="mx-2 h-6 w-6" />
                  <div>Edit</div>
                </div>
              </Button>
              <Button buttonType={ButtonType.secondary} onClick={handleRemove} disabled={disabled}>
                <div className="flex items-center">
                  <TrashIcon className="mx-2 h-6 w-6" />
                  <div>Remove</div>
                </div>
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </Card>
  )
}
