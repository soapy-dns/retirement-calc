import { IScenario } from "@/app/lib/data/schema/config"
import { HelpModalContext } from "../context/HelpModalProvider"
import { ScenarioContext } from "../context/scenario/ScenarioContext"

interface Props {
  onToggle?: () => void
  showModal?: boolean
  modalData?: any
  selectedScenario: IScenario
  children: React.ReactNode
}
export const ProviderWrapper = ({
  onToggle = () => {},
  showModal = false,
  modalData = {},
  selectedScenario,
  children
}: Props) => {
  return (
    <HelpModalContext.Provider value={{ onToggle, showModal, modalData }}>
      {/* @ts-ignore */}
      <ScenarioContext.Provider value={{ selectedScenario: selectedScenario }}>{children}</ScenarioContext.Provider>
    </HelpModalContext.Provider>
  )
}
