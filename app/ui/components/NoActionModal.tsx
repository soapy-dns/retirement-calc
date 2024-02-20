import React from "react"
import { GenericModal } from "./GenericModal"

interface Props {
  heading: string
  showModal: boolean
  onToggle: Function
  children: React.ReactNode
}
export const NoActionModal = (props: Props) => {
  const { heading, showModal, children, onToggle } = props

  return (
    <GenericModal heading={heading} showModal={showModal} handleCancel={onToggle}>
      {children}
    </GenericModal>
  )
}
