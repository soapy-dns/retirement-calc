import type { IAsset } from "@/app/lib/data/types"
import { Card } from "@/app/ui/components/Card"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
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
  console.log("assetSummary", asset.id)
  const navigation = useNavigation()
  const { removeAsset } = useAsset()

  const handleEdit = () => {
    const { id } = asset
    navigation.goTo(AppPath.assetEdit, { id })
  }

  const handleRemove = () => {
    console.log("handle remove")
    if (disabled) return
    console.log("not disabled")

    const { id } = asset
    removeAsset(id)

    // TODO: modal to confirm
  }
  const { AssetClassIcon, type } = getAssetDisplayDetails(asset)

  const { name, description, value, income, incomeBucket } = asset

  const disabled = removeAllowed || incomeBucket

  return (
    <Card>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center justify-center  border-r text-primary">
          <AssetClassIcon className="h-12 w-12" />
          <div className="font-semibold">{type}</div>
        </div>
        <div className="col-span-2 px-4">
          <div className="mb-4">
            <h2 className="my-auto text-primary">{name}</h2>
          </div>
          <div>
            <p className="flex gap-2">
              <b>Description:</b>
              {description}
            </p>
            {asset.value > 0 && (
              <p className="flex gap-2">
                <b>Initial value:</b>
                <span>{currencyFormatter.format(value)}</span>
              </p>
            )}
            {income && (
              <p className="flex gap-2">
                <b>Initial income:</b>
                <span>{currencyFormatter.format(income)}</span>
              </p>
            )}
            <div className="flex">
              <Button buttonType={ButtonType.primary} onClick={handleEdit}>
                <div className="flex items-center">
                  <PencilSquareIcon className="mx-2 h-4 w-4" />
                  <div>Edit</div>
                </div>
              </Button>
              <Button buttonType={ButtonType.secondary} onClick={handleRemove} disabled={disabled}>
                <div className="flex items-center">
                  <TrashIcon className="mx-2 h-4 w-4" />
                  <div>Remove</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
