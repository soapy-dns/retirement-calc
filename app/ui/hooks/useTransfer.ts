import { Transfer } from "@/app/lib/calculations/transfers/types"
import { getRandomKey } from "@/app/lib/utils/getRandomKey"
import { useContext } from "react"
import { ScenarioContext } from "../context/ScenarioContext"
// import { ScenarioContext } from "view/context/ScenarioContext"
// import { Transfer } from "calculations/transfers/types"
// import { getRandomKey } from "view/common/utils"

export const useTransfer = () => {
  const { selectedScenario, updateScenario } = useContext(ScenarioContext)

  const getTransferDetails = (id: string) => {
    const { transfers = [] } = selectedScenario

    return transfers?.find((it) => it.id === id)
  }

  const updateTransfer = (transfer: Transfer) => {
    const { transfers = [] } = selectedScenario
    const index = transfers.findIndex((it) => it.id === transfer.id) || 0

    transfers.splice(index, 1, transfer)
    selectedScenario.transfers = transfers
    updateScenario(selectedScenario)
  }

  const removeTransfer = (id: string) => {
    const { transfers = [] } = selectedScenario

    const index = transfers.findIndex((it) => it.id === id) || 0

    transfers.splice(index, 1)
    selectedScenario.transfers = transfers

    updateScenario(selectedScenario)
  }

  const addTransfer = (transfer: Omit<Transfer, "id">) => {
    const { transfers = [] } = selectedScenario

    // @ts-ignore FIXME:
    const newTransfers = transfers.concat({ ...transfer, id: getRandomKey() })

    newTransfers.sort((a, b) => {
      if (a.year > b.year) return 1
      if (a.year < b.year) return -1
      return 0
    })

    selectedScenario.transfers = newTransfers

    updateScenario(selectedScenario)
  }

  return {
    getTransferDetails,
    updateTransfer,
    addTransfer,
    removeTransfer
  }
}
