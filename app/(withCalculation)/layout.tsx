"use client"
// this is just to include context
import { useEffect } from "react"
import { ScenarioProvider } from "../ui/context/ScenarioProvider"
export default function WithCalculationLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log("--onload")
  }, [])

  return (
    <div>
      <ScenarioProvider>{children}</ScenarioProvider>
    </div>
  )
}
