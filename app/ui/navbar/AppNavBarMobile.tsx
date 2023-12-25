"use client"
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ChevronDoubleDownIcon,
  EllipsisVerticalIcon,
  WrenchScrewdriverIcon,
  ChatBubbleBottomCenterIcon,
  Cog8ToothIcon,
  PresentationChartLineIcon,
  TableCellsIcon,
  Bars3Icon
} from "@heroicons/react/24/outline"

import Link from "next/link"
import { AppPath } from "../types"
import { usePathname } from "next/navigation"
import { ScenarioMenu } from "../components/SelectMenu"
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { Chart } from "chart.js/dist"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export const AppNavBarMobile = () => {
  const pathname = usePathname()

  const selectedTabClassNames = "border-b-4"

  return (
    <div className=" flex h-10 flex-row justify-center border-0 bg-primary py-1 pl-3 text-white">
      <ScenarioMenu />
      <Menu as="div" className="relative flex justify-center">
        <Menu.Button className=" border-x hover:bg-primary-darker">
          <div className="mx-4 flex flex-row">
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </div>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={AppPath.config}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    <div className="flex gap-2">
                      <Cog8ToothIcon className="h-5 w-5" />
                      Config
                    </div>
                  </Link>
                )}
              </Menu.Item>{" "}
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={AppPath.charts}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    <div className="flex gap-2">
                      <PresentationChartLineIcon className="h-5 w-5" />
                      Charts
                    </div>
                  </Link>
                )}
              </Menu.Item>{" "}
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={AppPath.sheet}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    <div className="flex gap-2">
                      <TableCellsIcon className="h-5 w-5" />
                      Spreadsheet
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={AppPath.drawdowns}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    <div className="flex gap-2">
                      <ChevronDoubleDownIcon className="h-5 w-5" />
                      Drawdowns
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={AppPath.fileImport}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    <div className="flex gap-2">
                      <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                      Import
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={AppPath.fileExport}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    <div className="flex gap-2">
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      Export
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={AppPath.tools}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    <div className="flex gap-2">
                      <WrenchScrewdriverIcon className="h-5 w-5" />
                      Tools
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={AppPath.about}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    <div className="flex gap-2">
                      <ChatBubbleBottomCenterIcon className="h-5 w-5" />
                      About
                    </div>
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>{" "}
    </div>
  )
}
