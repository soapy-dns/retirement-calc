"use client"

import {
  Cog8ToothIcon,
  PresentationChartLineIcon,
  TableCellsIcon,
  Bars3Icon,
  DocumentIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon
} from "@heroicons/react/24/outline"

import Link from "next/link"
import { AppPath } from "../types"
import { usePathname } from "next/navigation"
import { ScenarioMenu } from "../components/menus/SelectMenu"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export const AppNavBarMobile = () => {
  // const pathname = usePathname()

  // const selectedTabClassNames = "border-b-4"

  return (
    <nav className=" flex h-10 flex-row justify-center border-0 bg-primary py-1 pl-3 text-white" aria-label="menu">
      <ScenarioMenu />
      <Menu as="div" className="relative flex justify-center">
        <MenuButton className=" border-x hover:bg-primary-darker" aria-label="More options">
          <div className="mx-4 flex flex-row">
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </div>
        </MenuButton>

        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg  focus:outline-2 focus:outline-primary">
          <div className="py-1">
            <MenuItem>
              {({ focus }) => (
                <Link
                  href={AppPath.config}
                  className={classNames(
                    focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  <div className="flex gap-2">
                    <Cog8ToothIcon className="h-5 w-5" />
                    Configuration
                  </div>
                </Link>
              )}
            </MenuItem>{" "}
            <MenuItem>
              {({ focus }) => (
                <Link
                  href={AppPath.charts}
                  className={classNames(
                    focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  <div className="flex gap-2">
                    <PresentationChartLineIcon className="h-5 w-5" />
                    Charts
                  </div>
                </Link>
              )}
            </MenuItem>{" "}
            <MenuItem>
              {({ focus }) => (
                <Link
                  href={AppPath.sheet}
                  className={classNames(
                    focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  <div className="flex gap-2">
                    <TableCellsIcon className="h-5 w-5" />
                    Spreadsheet
                  </div>
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <Link
                  href={AppPath.fileImport}
                  className={classNames(
                    focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  <div className="flex gap-2">
                    <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
                    Import configuration
                  </div>
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <Link
                  href={AppPath.fileExport}
                  className={classNames(
                    focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  <div className="flex gap-2">
                    <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                    Export configuration
                  </div>
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <Link
                  href={AppPath.documentation}
                  className={classNames(
                    focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  <div className="flex gap-2">
                    <DocumentIcon className="h-5 w-5" />
                    Documentation
                  </div>
                </Link>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>{" "}
    </nav>
  )
}
