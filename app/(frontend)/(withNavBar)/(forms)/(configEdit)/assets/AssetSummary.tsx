import type { CashAsset, IAsset, OwnerType } from "@/app/lib/data/schema/config"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { Card } from "@/app/ui/components/Card"
import { useAsset } from "@/app/ui/hooks/useAsset"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { getCurrencyFormatter } from "@/app/ui/utils/formatter"

import { getAssetDisplayDetails } from "./utils"
import { useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"
import { useContext, useState } from "react"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { ButtonGroupEditRemove } from "@/app/ui/components/common/ButtonGroupEditRemove"
import { isCashAsset } from "@/app/ui/utils"
import { GenericModal } from "@/app/ui/components/modals/GenericModal"

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
  const [showCantRemoveModal, setShowCantRemoveModal] = useState<boolean>(false)

  const currencyCountry = getCurrency()
  const currencyFormatter = getCurrencyFormatter(currencyCountry)

  const handleEdit = () => {
    const { id } = asset
    navigation.goTo(AppPath.assetEdit, { id })
  }
  const handleEditFn = selectedScenario.asAtYear >= getCurrentYear() ? handleEdit : undefined

  const handleRemove = () => {
    const transfersExist = hasTransfers(asset)
    if (transfersExist) {
      setShowCantRemoveModal(true)
      return
    }

    const { id } = asset
    removeAsset(id)
  }

  const { AssetClassIcon, type } = getAssetDisplayDetails(asset)

  const { name, description, className } = asset

  // const transfersExist = hasTransfers(asset)

  // const disabled = transfersExist === true

  console.log("disabled, removeAlleed", asset.name, removeAllowed)

  return (
    <>
      <Card>
        <div className="grid grid-cols-3 justify-items-auto ">
          <div className="sm:flex-col  border-r border-primary text-primary-foreground justify-center items-center text-center hidden sm:flex">
            <AssetClassIcon className="h-12 w-12" />
            <div className="font-semibold px-2">{type}</div>
          </div>

          <div className="col-span-3 sm:col-span-2 px-4">
            <div className="mb-4">
              <h2 className="my-auto text-primary-foreground">{name}</h2>
            </div>
            {isCashAsset(className) && (asset as CashAsset).incomeBucket && (
              <>
                <div className="mb-4">
                  <Alert alertType={AlertType.INFO} heading="Income bucket."></Alert>
                </div>
              </>
            )}

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
                <ButtonGroupEditRemove
                  handleEdit={handleEditFn}
                  handleRemove={handleRemove}
                  disableRemove={!removeAllowed}
                />
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
      <GenericModal
        showModal={showCantRemoveModal}
        heading="Warning"
        handleCancel={() => {
          setShowCantRemoveModal(false)
        }}
      >
        This asset has transfers. You will need to remove the transfers before you can remove this asset.
      </GenericModal>
    </>
  )
}
