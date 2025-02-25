"use client"

import { Toaster } from "react-hot-toast"

import { HelpModalProvider } from "../ui/context/HelpModalProvider"
import { ScenarioProvider } from "../ui/context/scenario/ScenarioProvider"
import { FullOwnerProvider } from "../ui/context/LifeExpectancyProvider"
import { AppBanner } from "../ui/AppBanner"
import { GenericModal } from "../ui/components/modals/GenericModal"
import { useState } from "react"
export default function WithCalculationLayout({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <div>
      <div className="fixed top-0 left-0 z-50 mb-4 inline-block min-w-full">
        <AppBanner />
      </div>
      <Toaster />

      <HelpModalProvider>
        <ScenarioProvider showCalculationInfo={() => setShowModal(true)}>
          <FullOwnerProvider>{children}</FullOwnerProvider>

          <GenericModal
            showModal={showModal}
            heading="Warning"
            handleCancel={() => {
              setShowModal(false)
            }}
          >
            <p>We have projected your assets, income and expenses forward as far as we can.</p>
            <p>
              If there are some assets left, then they either need to be set up as drawdownable in the configuration, or
              else manually transfered (Transfers tab with the Configuration page)
            </p>
            <p>
              If there are no assets left, then you&apos;ve run out of money. Depending on your likely date of death,
              this may or may not be a problem.
            </p>
          </GenericModal>
        </ScenarioProvider>
      </HelpModalProvider>
    </div>
  )
}
