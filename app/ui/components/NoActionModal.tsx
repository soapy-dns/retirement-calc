import { XMarkIcon } from "@heroicons/react/24/outline"
import React from "react"
import { Button, ButtonType } from "./common/Button"
import { GenericModal } from "./GenericModal"

interface Props {
  heading: string
  content: React.ReactNode
  showModal: boolean
  onToggle: Function
  // children: React.ReactNode
}
export const NoActionModal = (props: Props) => {
  const { heading, showModal, content, onToggle } = props

  return (
    <GenericModal heading={heading} showModal={showModal} handleCancel={onToggle}>
      {content}
    </GenericModal>
  )
}
