"use client"
import { Cog8ToothIcon, PresentationChartLineIcon, TableCellsIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { AppPath } from "./types"
import { usePathname } from "next/navigation"
import { MoreMenu } from "./MoreMenu"
import { ScenarioMenu } from "./components/SelectMenu"

export const AppNavBar = () => {
  const pathname = usePathname()

  const selectedTabClassNames = "border-b-4"

  return (
    <div className=" flex h-10 flex-row justify-center border-0 bg-primary py-1 pl-3 text-white">
      <ScenarioMenu />
      <Link
        href={AppPath.config}
        className={`flex items-center justify-center border-x hover:bg-primary-darker ${
          pathname === AppPath.config ? selectedTabClassNames : null
        }`}
      >
        <div className="mx-4 flex">
          Config <Cog8ToothIcon className="ml-2 h-6 w-6" />
        </div>
      </Link>

      <Link
        href={AppPath.charts}
        className={`flex items-center justify-center border-x hover:bg-primary-darker ${
          pathname === AppPath.charts ? selectedTabClassNames : null
        }`}
      >
        <div className="mx-4 flex">
          Charts <PresentationChartLineIcon className="ml-2 h-6 w-6  " aria-label="Asset charts" />
        </div>
      </Link>

      <Link
        href={AppPath.sheet}
        className={`flex items-center justify-center border-x hover:bg-primary-darker ${
          pathname === AppPath.sheet ? selectedTabClassNames : null
        }`}
      >
        <div className="mx-4 flex">
          Spreadsheet <TableCellsIcon className="ml-2 h-6 w-6" aria-label="Table" />
        </div>
      </Link>

      <MoreMenu />
    </div>
  )
}
