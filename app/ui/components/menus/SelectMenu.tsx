import { Fragment, useContext } from "react"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { ScenarioContext } from "../../context/scenario/ScenarioContext"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export const ScenarioMenu = () => {
  const { scenarioOptions, onSelectScenario } = useContext(ScenarioContext)

  const handleSelect = (selectedOption: string) => {
    onSelectScenario(selectedOption)
  }

  return (
    <Menu as="div" className="relative flex justify-center">
      <MenuButton className=" border-x hover:bg-primary-darker transition-colors duration-150 delay-150 ease-in-out cursor-pointer">
        <div className="mx-4 flex flex-row">
          Scenarios
          <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
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
          <div className="py-1">
            {scenarioOptions?.map((option) => {
              return (
                <MenuItem key={option.value}>
                  {({ focus }) => (
                    <button
                      onClick={() => handleSelect(option.value)}
                      className={classNames(
                        focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm"
                      )}
                    >
                      {option.label}
                    </button>
                  )}
                </MenuItem>
              )
            })}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
