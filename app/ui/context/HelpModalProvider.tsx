import React, { ReactNode, useState, createContext } from "react"

interface IHelpModalContext {
  showModal: boolean
  onToggle: (data?: object) => void
  modalData?: unknown
}
export const HelpModalContext = createContext<IHelpModalContext>({ showModal: true, onToggle: () => {} })

export const HelpModalProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalData, setModalData] = useState<object>()

  const onToggle = (data?: object) => {
    setShowModal(!showModal)

    setModalData(data)
  }

  return <HelpModalContext.Provider value={{ onToggle, showModal, modalData }}>{children}</HelpModalContext.Provider>
}
