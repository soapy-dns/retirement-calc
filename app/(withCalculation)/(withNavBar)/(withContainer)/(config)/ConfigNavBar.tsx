import { CurrencyDollarIcon, GlobeAltIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid"
import { ConfigTabContext } from "@/app/ui/context/ConfigTabProvider"
import { ConfigTab } from "@/app/ui/context/types"

export const ConfigNavBar = () => {
  const { activeTab, updateActiveTab } = useContext(ConfigTabContext)

  const handleContextClick = () => {
    updateActiveTab(ConfigTab.context)
  }

  const handleAssetsClick = () => {
    updateActiveTab(ConfigTab.assets)
  }

  const handleTransfersClick = () => {
    updateActiveTab(ConfigTab.transfers)
  }

  const tabColors = "hover:bg-primary-lighter"
  const selectedTabClassNames = "border-b-4 border-primary "

  return (
    <div className=" mb-4 flex  justify-around bg-primary-lightest py-1 pl-3">
      <button
        onClick={handleContextClick}
        className={`${tabColors} ${activeTab === ConfigTab.context ? selectedTabClassNames : null}`}
      >
        <div className="mx-4 flex flex-row p-2">
          <div className="hidden sm:inline">Context</div>
          <GlobeAltIcon className="ml-2 h-6 w-6" />
        </div>
      </button>

      <button
        onClick={handleAssetsClick}
        className={`${tabColors} ${activeTab === ConfigTab.assets ? selectedTabClassNames : null}`}
      >
        <div className="mx-4 flex flex-row">
          <div className="hidden sm:inline">Assets</div>
          <CurrencyDollarIcon className="ml-2 h-6 w-6" />
        </div>
      </button>

      <button
        onClick={handleTransfersClick}
        className={`${tabColors} ${activeTab === ConfigTab.transfers ? selectedTabClassNames : null}`}
      >
        <div className="mx-4 flex flex-row">
          <div className="hidden sm:inline">Transfers</div>
          <ArrowPathRoundedSquareIcon className="ml-2 h-6 w-6" />
        </div>
      </button>
    </div>
  )
}
