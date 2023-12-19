import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"

import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleBottomCenterIcon,
  ChevronDoubleDownIcon,
  EllipsisVerticalIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/outline"
import { AppPath } from "./types"
import Link from "next/link"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export const MoreMenu = () => {
  return (
    <Menu as="div" className="relative flex justify-center">
      <Menu.Button className=" border-x hover:bg-primary-darker">
        <div className="mx-4 flex flex-row">
          More
          <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
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
                  href={AppPath.drawdowns}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  <div className="flex gap-2">
                    Drawdowns <ChevronDoubleDownIcon className="h-5 w-5" />
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
                    Import <ArrowLeftOnRectangleIcon className="h-5 w-5" />
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
                    Export <ArrowRightOnRectangleIcon className="h-5 w-5" />
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
                    Tools <WrenchScrewdriverIcon className="h-5 w-5" />
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
                    About <ChatBubbleBottomCenterIcon className="h-5 w-5" />
                  </div>
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
