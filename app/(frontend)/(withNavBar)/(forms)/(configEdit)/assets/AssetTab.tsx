import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

import { AssetSummary } from "./AssetSummary"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"

export const AssetTab = () => {
  const navigation = useNavigation()

  const { selectedScenario } = useContext(ScenarioContext)
  if (!selectedScenario) return null

  const { assets, context, asAtYear } = selectedScenario

  const { owners } = context

  const handleAdd = () => {
    navigation.goTo(AppPath.assetAdd)
  }

  return (
    <div className="">
      <p className="mx-4">
        Resources <span className="text-primary-foreground">(assets)</span> used to hold or create economic value.
      </p>

      {asAtYear >= getCurrentYear() && (
        <div className="mx-auto my-6 w-3/4">
          <Button buttonType={ButtonType.secondary} onClick={handleAdd}>
            <div className="flex items-center gap-2">
              <PlusCircleIcon className="h-6 w-6" />
              Add another asset
            </div>
          </Button>
        </div>
      )}

      {assets.map((asset, index) => {
        return (
          <AssetSummary
            asset={asset}
            owners={owners}
            key={asset.name}
            removeAllowed={index === 0 && assets.length === 1}
          />
        )
      })}
    </div>
  )
}
