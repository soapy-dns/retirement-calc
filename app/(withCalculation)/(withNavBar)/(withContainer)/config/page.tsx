"use client"
import { useContext } from "react"
import { InformationCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { AssetTab } from "../(config)/assets/AssetTab"
import { ContextTab } from "../(config)/context/ContextTab"
import { TransfersTab } from "../(config)/transfers/TransferTab"
import { ScenarioDisplay } from "../(config)/context/scenario/ScenarioDisplay"
import { GenericModal } from "@/app/ui/components/GenericModal"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { ConfigTab } from "@/app/ui/context/types"
import { AppPath } from "@/app/ui/types"
import { ConfigTabContext, ConfigTabProvider } from "@/app/ui/context/ConfigTabProvider"
import { HelpModalContext } from "@/app/ui/context/HelpModalProvider"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { ConfigNavBar } from "../(config)/ConfigNavBar"

const HelpModalContent: React.FC = () => {
  return (
    <>
      <p>
        This section allows you to configure your calculations for the projected values of your assets in subsequent
        years.
      </p>
      <p>There are 3 parts.</p>
      <ol>
        <li>
          <b>Context</b> - the environment the calculations take place in. e.g. the inflation rate.
        </li>
        <li>
          <b>Assets</b> - The assets at the start of the period. This allows each asset value to be calculated for
          subsequent years.
        </li>
        <li>
          <b>Transfers</b> - Any transfers which should be configured to take place. Note that some assets can be
          automatically transfered depending on the asset configuration.
        </li>
      </ol>
    </>
  )
}

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
    <ConfigTabProvider>
      <div className="flex content-center text-primary">
        <h1 className="flex items-center gap-2">
          {headingText}
          <button onClick={toggleHelpText}>
            <InformationCircleIcon className="h-6 w-6 " />
          </button>
        </h1>
      </div>

      <ScenarioDisplay />

      <div className="mb-8 flex justify-center">
        <Button buttonType={ButtonType.secondary} onClick={handleAdd}>
          <div className="flex items-center gap-2">
            <PlusCircleIcon className="h-4 w-4" />
            Duplicate this scenario
          </div>
        </Button>
      </div>

      <ConfigNavBar />
      {activeTab === ConfigTab.context && <ContextTab />}
      {activeTab === ConfigTab.assets && <AssetTab />}
      {activeTab === ConfigTab.transfers && <TransfersTab />}
      <GenericModal
        showModal={showModal}
        heading={headingText}
        content={<HelpModalContent />}
        onToggle={onHelpModalToggle}
      />
    </ConfigTabProvider>
  )
}

export default ConfigPage
