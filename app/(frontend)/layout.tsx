"use client"

import { Toaster } from "react-hot-toast"

import { HelpModalProvider } from "../ui/context/HelpModalProvider"
import { ScenarioProvider } from "../ui/context/scenario/ScenarioProvider"
import { FullOwnerProvider } from "../ui/context/LifeExpectancyProvider"
export default function WithCalculationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Toaster />

      <HelpModalProvider>
        <ScenarioProvider>
          <FullOwnerProvider>{children}</FullOwnerProvider>
        </ScenarioProvider>
      </HelpModalProvider>
    </div>
  )
}
