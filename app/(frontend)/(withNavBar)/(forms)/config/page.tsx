"use client"

import React, { useContext } from "react"
import { AssetTab } from "../(configEdit)/assets/AssetTab"
import { ContextTab } from "../(configEdit)/context/ContextTab"
import { TransfersTab } from "../(configEdit)/transfers/TransferTab"
import { ScenarioDisplay } from "../(configEdit)/context/scenario/ScenarioDisplay"
import { NoActionModal } from "@/app/ui/components/NoActionModal"
import { ConfigTab } from "@/app/ui/context/types"
import { ConfigTabContext } from "@/app/ui/context/ConfigTabProvider"
import { HelpModalContext } from "@/app/ui/context/HelpModalProvider"
import { ConfigNavBar } from "../../../../ui/navbar/ConfigNavBar"
import Scenarios from "@/docs/info/ScenarioInfo.mdx"
import { InfoButton } from "@/app/ui/components/common/accordian/InfoButton"

const ConfigPage: React.FC = () => {
  const { activeTab } = useContext(ConfigTabContext)

  const { onToggle: onHelpModalToggle, showModal } = useContext(HelpModalContext)

  const toggleHelpText = () => {
    onHelpModalToggle()
  }
  const headingText = "Scenario configuration."

  return (
    <main>
      <div className="flex content-center text-primary-foreground justify-center">
        <h1 className="flex items-center gap-2">
          {headingText}
          <InfoButton showInfo={toggleHelpText} />
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
    </main>
  )
}

export default ConfigPage
