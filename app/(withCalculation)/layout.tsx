"use client"

import { Toaster } from "react-hot-toast"
// this is just to include context

import { HelpModalProvider } from "../ui/context/HelpModalProvider"
import { ScenarioProvider } from "../ui/context/ScenarioProvider"
export default function WithCalculationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Toaster />

      <HelpModalProvider>
        <ScenarioProvider>{children}</ScenarioProvider>
      </HelpModalProvider>
    </div>
  )
}
