"use client"
import { useContext } from "react"
import { InformationCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { AssetTab } from "../(config)/assets/AssetTab"
import { ContextTab } from "../(config)/context/ContextTab"
import { TransfersTab } from "../(config)/transfers/TransferTab"
import { ScenarioDisplay } from "../(config)/context/scenario/ScenarioDisplay"
import { NoActionModal } from "@/app/ui/components/NoActionModal"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { ConfigTab } from "@/app/ui/context/types"
import { AppPath } from "@/app/ui/types"
import { ConfigTabContext } from "@/app/ui/context/ConfigTabProvider"
import { HelpModalContext } from "@/app/ui/context/HelpModalProvider"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { ConfigNavBar } from "../(config)/ConfigNavBar"
import Scenarios from "@/docs/info/ScenarioInfo.mdx"

const ConfigPage: React.FC = () => {
  const { activeTab } = useContext(ConfigTabContext)
  const { onToggle: onHelpModalToggle, showModal } = useContext(HelpModalContext)
  const navigation = useNavigation()

  const toggleHelpText = () => {
    onHelpModalToggle()
  }
  const headingText = "Scenario configurations."

  const handleAdd = () => {
    navigation.goTo(AppPath.scenarioAdd)
  }

  return (
    <>
      <div className="flex content-center text-primary">
        <h1 className="flex items-center gap-2">
          {headingText}
          <button onClick={toggleHelpText}>
            <InformationCircleIcon className="h-6 w-6 " />
          </button>
        </h1>
      </div>

      <div className="mb-4">
        <Button buttonType={ButtonType.secondary} onClick={handleAdd}>
          <div className="flex items-center gap-2">
            <PlusCircleIcon className="h-6 w-6" />
            Duplicate this scenario
          </div>
        </Button>
      </div>

      <div className="mb-12">
        <ScenarioDisplay />
      </div>

      <ConfigNavBar />

      {activeTab === ConfigTab.context && <ContextTab />}
      {activeTab === ConfigTab.assets && <AssetTab />}
      {activeTab === ConfigTab.transfers && <TransfersTab />}
      <NoActionModal showModal={showModal} heading={headingText} onToggle={onHelpModalToggle}>
        <Scenarios />
      </NoActionModal>
    </>
  )
}

export default ConfigPage
