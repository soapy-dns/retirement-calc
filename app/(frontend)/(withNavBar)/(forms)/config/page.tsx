"use client"
import React, { useContext } from "react"
import { InformationCircleIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { AssetTab } from "../(configEdit)/assets/AssetTab"
import { ContextTab } from "../(configEdit)/context/ContextTab"
import { TransfersTab } from "../(configEdit)/transfers/TransferTab"
import { ScenarioDisplay } from "../(configEdit)/context/scenario/ScenarioDisplay"
import { NoActionModal } from "@/app/ui/components/NoActionModal"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { ConfigTab } from "@/app/ui/context/types"
import { AppPath } from "@/app/ui/types"
import { ConfigTabContext } from "@/app/ui/context/ConfigTabProvider"
import { HelpModalContext } from "@/app/ui/context/HelpModalProvider"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { ConfigNavBar } from "../(configEdit)/ConfigNavBar"
import Scenarios from "@/docs/info/ScenarioInfo.mdx"
import { ButtonGroup } from "@/app/ui/components/common/ButtonGroup"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"

const ConfigPage: React.FC = () => {
  const { activeTab } = useContext(ConfigTabContext)
  const { selectedScenario, deleteSelectedScenario, scenarios } = React.useContext(ScenarioContext)

  const { onToggle: onHelpModalToggle, showModal } = useContext(HelpModalContext)
  const navigation = useNavigation()

  const toggleHelpText = () => {
    onHelpModalToggle()
  }
  const headingText = "Scenario configurations."

  // const handleAdd = () => {
  //   navigation.goTo(AppPath.scenarioAdd)
  // }

  // const handleRemove = () => {
  //   if (scenarios && scenarios?.length > 1) {
  //     deleteSelectedScenario()
  //   }
  // }

  // const removeButtonDisabled = scenarios?.length === 1

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

      <div className="mt-4 mb-12">
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
