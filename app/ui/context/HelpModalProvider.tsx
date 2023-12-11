import React, { useState } from "react"
import { createContext } from "react"

interface IHelpModalContext {
  showModal: boolean
  onToggle: (data?: unknown) => void
  modalData?: unknown
}
export const HelpModalContext = createContext<IHelpModalContext>({ showModal: true, onToggle: () => {} })

export const HelpModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState()

  const onToggle = (data) => {
    setShowModal(!showModal)

    setModalData(data)
  }

  return <HelpModalContext.Provider value={{ onToggle, showModal, modalData }}>{children}</HelpModalContext.Provider>
}
