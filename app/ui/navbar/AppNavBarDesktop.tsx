"use client"
import { Cog8ToothIcon, PresentationChartLineIcon, TableCellsIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { AppPath } from "../types"
import { usePathname } from "next/navigation"
import { MoreMenu } from "../components/menus/MoreMenu"
import { ScenarioMenu } from "../components/menus/SelectMenu"

export const AppNavBarDesktop = () => {
  const pathname = usePathname()

  const selectedTabClassNames = "border-b-4 bg-primary-darker"

  return (
    <nav className=" flex h-10 flex-row justify-center border-0 bg-primary py-1 pl-3 text-white" aria-label="menu">
      <ScenarioMenu />

      <Link
        href={AppPath.config}
        // scroll={true} // this doesn't seem to do anything
        className={`flex items-center justify-center border-x hover:bg-primary-darker ${
          pathname === AppPath.config ? selectedTabClassNames : null
        }`}
      >
        <div className="mx-4 flex">
          Configuration <Cog8ToothIcon className="ml-2 h-6 w-6" />
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
        // scroll={true} // this doesn't seem to do anything
        className={`flex items-center justify-center border-x hover:bg-primary-darker ${
          pathname === AppPath.sheet ? selectedTabClassNames : null
        }`}
      >
        <div className="mx-4 flex">
          Spreadsheet <TableCellsIcon className="ml-2 h-6 w-6" aria-label="Table" />
        </div>
      </Link>

      <MoreMenu />
    </nav>
  )
}
