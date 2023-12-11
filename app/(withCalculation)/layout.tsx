"use client"

// this is just to include context
import { useEffect } from "react"
import { HelpModalProvider } from "../ui/context/HelpModalProvider"
import { ScenarioProvider } from "../ui/context/ScenarioProvider"
export default function WithCalculationLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log("--onload")
  }, [])

  return (
    <div>
      <HelpModalProvider>
        <ScenarioProvider>{children}</ScenarioProvider>
      </HelpModalProvider>
    </div>
  )
}
