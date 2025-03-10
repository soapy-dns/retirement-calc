import React, { ReactNode, useEffect, useState } from "react"

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

  useEffect(() => {
    const sessionString = sessionStorage.getItem("SHOW_ALL_ROWS")
    if (sessionString) {
      let typedResult = sessionString === "true" ? true : false
      setShowAllRows(typedResult)
    }
  }, [])

  const toggleShowAllRows = () => {
    setShowAllRows(!showAllRows)
    const sessionString = showAllRows ? "false" : "true"
    sessionStorage.setItem("SHOW_ALL_ROWS", sessionString)
  }

  return (
    <DisplayRowsContext.Provider value={{ showAllRows, toggleShowAllRows }}>{children}</DisplayRowsContext.Provider>
  )
}

export { DisplayRowsContext, DisplayRowsProvider }
