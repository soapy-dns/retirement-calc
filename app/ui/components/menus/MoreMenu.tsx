import { Fragment } from "react"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"

import {
  ArrowLeftOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  DocumentIcon,
  EllipsisVerticalIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/outline"
import { AppPath } from "../../types"
import Link from "next/link"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export const MoreMenu = () => {
  return (
    <Menu as="div" className="relative flex justify-center">
      <MenuButton className=" border-x hover:bg-primary-darker transition-colors ease-in-out duration-150 delay-150 ">
        <div className="mx-4 flex flex-row">
          More
          <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
        </div>
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg  focus:outline  focus:outline-white border-2 border-primary-foreground">
          <div className="py-1">
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
                  href={AppPath.tools}
                  className={classNames(
                    focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  <div className="flex gap-2">
                    <WrenchScrewdriverIcon className="h-5 w-5" />
                    Tools
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
      </Transition>
    </Menu>
  )
}
