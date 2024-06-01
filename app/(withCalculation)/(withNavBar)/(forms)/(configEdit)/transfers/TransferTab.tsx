import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

import { TransferDisplay } from "./TransferDisplay"

export const TransfersTab: React.FC = () => {
  const { selectedScenario } = useContext(ScenarioContext)
  const navigation = useNavigation()

  const { transfers } = selectedScenario

  const handleAdd = () => {
    navigation.goTo(AppPath.transferAdd)
  }

  return (
    <>
      <p className="mx-4">
        Assets bought or sold <span className="text-primary">(transfers)</span> in the period can be defined here.
      </p>
      <div className="my-4 flex justify-center">
        <Button buttonType={ButtonType.secondary} onClick={handleAdd}>
          <div className="flex items-center gap-2">
            <PlusCircleIcon className="h-6 w-6" />
            Add another transfer
          </div>
        </Button>
      </div>

      {!transfers || transfers.length === 0 ? (
        <div>No transfers exist.</div>
      ) : (
        <TransferDisplay transfers={transfers} />
      )}
    </>
  )
}
