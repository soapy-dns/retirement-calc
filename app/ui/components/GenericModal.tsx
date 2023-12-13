import React from "react"
import { Button, ButtonType } from "./common/Button"

interface IGenericModalProps {
  heading: string
  content: React.ReactNode
  showModal: boolean
  onToggle: Function
}
export const GenericModal = (props: IGenericModalProps) => {
  const { heading, showModal, content, onToggle } = props

  const modalHiddenClass = showModal ? "" : "hidden"

  const closeModal = () => onToggle()

  const dontCloseModal = (e: React.SyntheticEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      id="genericModal"
      onClick={closeModal}
      aria-hidden="true"
      className={`${modalHiddenClass} h-modal fixed right-0 left-4 top-8 z-50 items-center justify-center overflow-y-auto overflow-x-hidden bg-blue-100 bg-opacity-75 md:inset-0 md:h-full`}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
        <div className="flex items-center justify-center">
          <div
            onClick={dontCloseModal}
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <h1 className="mx-2 p-2">{heading}</h1>
            <div className="mx-2">{content}</div>
            <div className="flex justify-center">
              <Button
                onClick={closeModal}
                buttonType={ButtonType.primary}
                // className="my-4 mx-4 rounded-md bg-blue-600 py-1 px-4 text-white hover:bg-blue-700"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
