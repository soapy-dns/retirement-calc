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
    console.log("handleAdd")
    navigation.goTo(AppPath.transferAdd)
  }

  return (
    <>
      <div className="my-4 flex justify-center">
        <Button buttonType={ButtonType.secondary} onClick={handleAdd}>
          <div className="flex items-center gap-2">
            <PlusCircleIcon className="h-4 w-4" />
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
