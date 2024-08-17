import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

import { TransferDisplay } from "./TransferDisplay"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"

export const TransfersTab: React.FC = () => {
  const { selectedScenario } = useContext(ScenarioContext)
  const navigation = useNavigation()

  const { transfers, asAtYear } = selectedScenario

  const handleAdd = () => {
    navigation.goTo(AppPath.transferAdd)
  }

  return (
    <div>
      <p className="mx-4">
        Assets bought or sold <span className="text-primary-foreground">(transfers)</span> in the period can be defined
        here.
      </p>
      {/* <div className="my-4 flex justify-center"> */}
      {asAtYear >= getCurrentYear() && (
        <div className="mx-auto my-6 w-3/4">
          <Button buttonType={ButtonType.secondary} onClick={handleAdd}>
            <div className="flex items-center gap-2">
              <PlusCircleIcon className="h-6 w-6" />
              {transfers?.length === 0 ? <div>Add a transfer</div> : <div>Add another transfer</div>}
            </div>
          </Button>
        </div>
      )}

      {!transfers || transfers.length === 0 ? (
        <p className="mx-4 min-h-96 h-96">No transfers exist.</p>
      ) : (
        <TransferDisplay transfers={transfers} />
      )}
    </div>
  )
}
