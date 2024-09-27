"use client"

import { Toaster } from "react-hot-toast"

import { HelpModalProvider } from "../ui/context/HelpModalProvider"
import { ScenarioProvider } from "../ui/context/scenario/ScenarioProvider"
import { FullOwnerProvider } from "../ui/context/LifeExpectancyProvider"
import { AppBanner } from "../ui/AppBanner"
export default function WithCalculationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="fixed top-0 left-0 z-50 mb-4 inline-block min-w-full">
        <AppBanner />
      </div>
      <Toaster />

      <HelpModalProvider>
        <ScenarioProvider>
          <FullOwnerProvider>{children}</FullOwnerProvider>
        </ScenarioProvider>
      </HelpModalProvider>
    </div>
  )
}
