"use client"

import { Toaster } from "react-hot-toast"
import { Toaster as ToasterShad } from "@/components/ui/toaster"

import { HelpModalProvider } from "../ui/context/HelpModalProvider"
import { ScenarioProvider } from "../ui/context/scenario/ScenarioProvider"
export default function WithCalculationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Toaster />

      <HelpModalProvider>
        <ScenarioProvider>{children}</ScenarioProvider>
      </HelpModalProvider>
      <ToasterShad />
    </div>
  )
}
