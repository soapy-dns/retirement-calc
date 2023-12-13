import React, { ReactNode, useEffect, useState } from "react"
import { ConfigTab } from "./types"

interface IConfigTab {
  activeTab: ConfigTab
  updateActiveTab: (tab: ConfigTab) => void
}

const ConfigTabContext = React.createContext<IConfigTab>({
  activeTab: ConfigTab.context,
  updateActiveTab: () => {}
})

interface IConfigTabProvider {
  children: ReactNode
}
const ConfigTabProvider: React.FC<IConfigTabProvider> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ConfigTab>(ConfigTab.context)

  useEffect(() => {
    const storedTabString = sessionStorage.getItem("CONFIG_TAB")
    if (storedTabString) {
      let typedStoredTabString = storedTabString as keyof typeof ConfigTab
      let storedTab = ConfigTab[typedStoredTabString]
      setActiveTab(storedTab)
    }
  }, [])

  const updateActiveTab = (tab: ConfigTab) => {
    sessionStorage.setItem("CONFIG_TAB", tab)

    setActiveTab(tab)
  }

  return <ConfigTabContext.Provider value={{ activeTab, updateActiveTab }}>{children}</ConfigTabContext.Provider>
}

export { ConfigTabContext, ConfigTabProvider }
