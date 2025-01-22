import { Fragment, FunctionComponent, useContext } from "react"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
import { Menu as MenuIcon } from "lucide-react"

import { ScenarioContext } from "../../context/scenario/ScenarioContext"
import { Switch } from "../common/switch/Switch"

// focus:ring-1 focus:ring-white focus:ring-offset-1 ring-opacity-100

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
interface Props {
  toggleAllCols: () => void
  toggleAllRows: () => void
}

export const DisplayOptionsMenu: FunctionComponent<Props> = ({ toggleAllCols, toggleAllRows }) => {
  return (
    <Menu as="div" className="relative flex justify-center">
      <MenuButton className=" ">
        <div className="mx-4 flex flex-row gap-2">
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
          Options
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
        <MenuItems className="absolute left-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg border-primary border-2  focus:outline focus:outline-white">
          <div className="py-1 flex flex-col">
            <MenuItem>
              <Switch id="allRows" label="Show all rows" onChange={toggleAllRows} />
            </MenuItem>
            <MenuItem>
              <Switch id="allcols" label="Show all years" onChange={toggleAllCols} />
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
