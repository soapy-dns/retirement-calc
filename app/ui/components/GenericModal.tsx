import { XMarkIcon } from "@heroicons/react/24/outline"
import React from "react"

interface IGenericModalProps {
  heading: string
  content: React.ReactNode
  showModal: boolean
  // onToggle: Function
  // cancelText?: string
  // submitText?: string
  // handleCancel: React.MouseEventHandler<HTMLButtonElement>
  handleCancel: Function
  handleSubmit?: React.MouseEventHandler<HTMLButtonElement>
}
export const GenericModal = (props: IGenericModalProps) => {
  const { heading, showModal, content, handleCancel, handleSubmit } = props

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
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <h1 className="mx-2 p-2 text-primary flex justify-between items-center">
              {heading}
              <button onClick={onCancel} className="hover:bg-gray-100 rounded-full p-1">
                <XMarkIcon className="h-6 w-6 font-bold text-primary" />
              </button>
            </h1>
            <div className="mx-2">{content}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
