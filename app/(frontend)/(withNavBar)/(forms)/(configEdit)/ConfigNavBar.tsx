import { CurrencyDollarIcon, GlobeAltIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid"
import { ConfigTabContext } from "@/app/ui/context/ConfigTabProvider"
import { ConfigTab } from "@/app/ui/context/types"
import { scrollFieldIntoView } from "@/app/ui/utils/scrollUtils"

const id = "config-nav-bar"

export const ConfigNavBar = () => {
  const { activeTab, updateActiveTab } = useContext(ConfigTabContext)

  const handleContextClick = () => {
    updateActiveTab(ConfigTab.context)
    scrollFieldIntoView(id, 10)
    // scrollBy({ top: 10 })
  }

  const handleAssetsClick = () => {
    updateActiveTab(ConfigTab.assets)
    scrollFieldIntoView(id, 10)
  }

  const handleTransfersClick = () => {
    updateActiveTab(ConfigTab.transfers)
    scrollFieldIntoView(id, 10)
  }

  const tabColors = "hover:bg-secondary"
  const selectedTabClassNames = "border-b-4  bg-secondary border-b-primary-foreground "

  return (
    <div id={id} className=" mb-4 grid grid-cols-3 bg-gray-50  divide-x-2">
      <button
        onClick={handleContextClick}
        className={`${tabColors} flex justify-center gap-2 p-2 ${
          activeTab === ConfigTab.context ? selectedTabClassNames : null
        }`}
      >
        <div className="">Context</div>
        <GlobeAltIcon className="h-6 w-6 hidden sm:inline" />
      </button>

      <button
        onClick={handleAssetsClick}
        className={`${tabColors} flex justify-center gap-2 p-2 ${
          activeTab === ConfigTab.assets ? selectedTabClassNames : null
        }`}
      >
        <div className="">Assets</div>
        <CurrencyDollarIcon className="h-6 w-6 hidden sm:inline" />
      </button>

      <button
        onClick={handleTransfersClick}
        className={`${tabColors} flex justify-center gap-2 p-2 ${
          activeTab === ConfigTab.transfers ? selectedTabClassNames : null
        }`}
      >
        {/* <div className="mx-4 flex gap-2"> */}
        <div className="">Transfers</div>
        <ArrowPathRoundedSquareIcon className="h-6 w-6 hidden sm:inline" />
        {/* </div> */}
      </button>
    </div>
  )
}
