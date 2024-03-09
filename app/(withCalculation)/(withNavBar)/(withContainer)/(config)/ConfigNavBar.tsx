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
    <div className=" mb-4 grid grid-cols-3 bg-primary-lightest pt-2 pb-1">
      <button
        onClick={handleContextClick}
        className={`${tabColors} flex justify-center gap-2 mx-2 ${
          activeTab === ConfigTab.context ? selectedTabClassNames : null
        }`}
      >
        {/* <div className="mx-4 flex gap-2"> */}
        <div className="hidden sm:inline">Context</div>
        <GlobeAltIcon className="h-6 w-6" />
        {/* </div> */}
      </button>

      <button
        onClick={handleAssetsClick}
        className={`${tabColors} flex justify-center gap-2 mx-2 ${
          activeTab === ConfigTab.assets ? selectedTabClassNames : null
        }`}
      >
        {/* <div className="mx-4 flex gap-2"> */}
        <div className="hidden sm:inline">Assets</div>
        <CurrencyDollarIcon className="h-6 w-6" />
        {/* </div> */}
      </button>

      <button
        onClick={handleTransfersClick}
        className={`${tabColors} flex justify-center gap-2 mx-2 ${
          activeTab === ConfigTab.transfers ? selectedTabClassNames : null
        }`}
      >
        {/* <div className="mx-4 flex gap-2"> */}
        <div className="hidden sm:inline">Transfers</div>
        <ArrowPathRoundedSquareIcon className="h-6 w-6" />
        {/* </div> */}
      </button>
    </div>
  )
}
