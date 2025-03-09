import React, { ReactNode, useState } from "react"

interface ContextProps {
  showAllRows: boolean
  toggleShowAllRows: () => void
}

const DisplayRowsContext = React.createContext<ContextProps>({
  showAllRows: true,
  toggleShowAllRows: () => {}
})

interface ProviderProps {
  children: ReactNode
}
const DisplayRowsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [showAllRows, setShowAllRows] = useState<boolean>(false)

  // TODO: store in session storage

  const toggleShowAllRows = () => {
    setShowAllRows(!showAllRows)
  }

  return (
    <DisplayRowsContext.Provider value={{ showAllRows, toggleShowAllRows }}>{children}</DisplayRowsContext.Provider>
  )
}

export { DisplayRowsContext, DisplayRowsProvider }
