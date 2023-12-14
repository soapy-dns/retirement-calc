import { Fragment, useContext } from "react"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { ScenarioContext } from "../context/ScenarioContext"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export const ScenarioMenu = () => {
  const { scenarioOptions, selectedScenarioOption, onSelectScenario } = useContext(ScenarioContext)

  const handleSelect = (selectedOption: string) => {
    onSelectScenario(selectedOption)
  }

  return (
    <Menu as="div" className="relative flex justify-center">
      <Menu.Button className=" border-x hover:bg-primary-darker">
        <div className="mx-4 flex flex-row">
          Select Scenario
          <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {scenarioOptions?.map((option) => {
              return (
                <Menu.Item key={option.value}>
                  {({ active }) => (
                    <button
                      onClick={() => handleSelect(option.value)}
                      className={classNames(
                        selectedScenarioOption?.value === option.value ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm"
                      )}
                    >
                      {option.label}
                    </button>
                  )}
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
