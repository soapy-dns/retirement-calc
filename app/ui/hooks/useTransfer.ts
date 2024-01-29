import { Transfer } from "@/app/lib/data/schema/config"
import { getRandomKey } from "@/app/lib/utils/getRandomKey"
import { useContext } from "react"
import { ScenarioContext } from "../context/ScenarioContext"

export const useTransfer = () => {
  const { selectedScenario, updateScenario } = useContext(ScenarioContext)

  const getTransferDetails = (id: string) => {
    const { transfers = [] } = selectedScenario

    return transfers?.find((it) => it.id === id)
  }

  const updateTransfer = async (transfer: Transfer): Promise<{ success: boolean }> => {
    const { transfers = [] } = selectedScenario
    const index = transfers.findIndex((it) => it.id === transfer.id) || 0

    transfers.splice(index, 1, transfer)
    selectedScenario.transfers = transfers
    const { success } = await updateScenario(selectedScenario)
    return { success }
  }

  const removeTransfer = async (id: string): Promise<{ success: boolean }> => {
    const { transfers = [] } = selectedScenario

    const index = transfers.findIndex((it) => it.id === id) || 0

    transfers.splice(index, 1)
    selectedScenario.transfers = transfers

    const { success } = await updateScenario(selectedScenario)
    return { success }
  }

  const addTransfer = async (transfer: Omit<Transfer, "id">): Promise<{ success: boolean }> => {
    const { transfers = [] } = selectedScenario

    // @ts-ignore FIXME:
    const newTransfers = transfers.concat({ ...transfer, id: getRandomKey() })

    newTransfers.sort((a, b) => {
      if (a.year > b.year) return 1
      if (a.year < b.year) return -1
      return 0
    })

    selectedScenario.transfers = newTransfers

    const { success } = await updateScenario(selectedScenario)
    return { success }
  }

  return {
    getTransferDetails,
    updateTransfer,
    addTransfer,
    removeTransfer
  }
}
