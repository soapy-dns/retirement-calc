import { XMarkIcon } from "@heroicons/react/24/outline"
import React from "react"

export interface IGenericModalProps {
  heading: string
  showModal: boolean
  // onToggle: Function
  // cancelText?: string
  // submitText?: string
  // handleCancel: React.MouseEventHandler<HTMLButtonElement>
  handleCancel: Function
  handleSubmit?: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
}
export const GenericModal = (props: IGenericModalProps) => {
  const { heading, showModal, handleCancel, handleSubmit, children } = props

  const modalHiddenClass = showModal ? "" : "hidden"

  const onCancel = () => {
    handleCancel()
  }

  return (
    <div
      id="genericModal"
      // onClick={closeModal}
      aria-hidden="true"
      className={`${modalHiddenClass} h-modal fixed right-0 left-4 top-8 z-50 items-center justify-center overflow-y-auto overflow-x-hidden bg-blue-100 bg-opacity-75 md:inset-0 md:h-full`}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
        <div className="flex items-center justify-center">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-4">
            <h1 className="mx-2 text-primary-foreground flex justify-between items-center">
              {heading}
              <button onClick={onCancel} className="hover:bg-gray-100 rounded-full p-1">
                <XMarkIcon className="h-6 w-6 font-bold text-primary-foreground" />
              </button>
            </h1>
            <div className="mx-2">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
