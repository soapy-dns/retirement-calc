"use client"

import { useSearchParams } from "next/navigation"
import React, { useContext, useEffect, useState } from "react"

import { Row } from "./row/Row"
import { SectionHeading } from "./row/SectionHeading"
import { NoActionModal } from "@/app/ui/components/NoActionModal"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { HelpModalContext } from "@/app/ui/context/HelpModalProvider"
import { ErrorDetails } from "@/app/ui/components/ErrorDetails"
import { Container } from "@/app/ui/components/Container"
import { Spinner } from "@/app/ui/components/common/Spinner"
import { GenericModal } from "@/app/ui/components/modals/GenericModal"
import DrawdownInfo from "@/docs/info/DrawdownInfo.mdx"
import ExpensesInfo from "@/docs/info/ExpensesInfo.mdx"

import { DisplayYearProvider } from "./context/DisplayYearProvider"

import { DisplayRowsProvider } from "./context/DisplayRowsProvider"
import Sheet from "./Sheet"

enum InfoType {
  "NONE",
  "INCOME",
  "DRAWDOWN",
  "EXPENSES"
}

const HelpContent = ({ modalData }: { modalData: unknown }) => (
  <pre>{modalData ? JSON.stringify(modalData, null, 4) : "N/A"}</pre>
)

const SheetPage: React.FC = () => {
  // const helpModalContext = useContext(HelpModalContext)
  const scenarioContext = useContext(ScenarioContext)
  const [infoModal, setInfoModal] = useState<InfoType>(InfoType.NONE)

  const searchParams = useSearchParams()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const debug = searchParams.get("debug")

  const { selectedScenario, calculationResults } = scenarioContext

  if (!calculationResults) {
    return <Spinner text="calculating" />
  }

  if (!calculationResults?.success) {
    return (
      <div className="pt-8 ">
        <Container>
          <ErrorDetails />
        </Container>
      </div>
    )
  }

  const { yearRange } = calculationResults

  // const { showModal: showHelpModal, onToggle: onHelpModalToggle, modalData: helpModalData = {} } = helpModalContext

  if (!selectedScenario) return <div>Select a scenario</div>

  return (
    <DisplayYearProvider yearRange={yearRange}>
      <DisplayRowsProvider>
        <Sheet calculationResultsSuccess={calculationResults} />

        <GenericModal
          heading="Drawdown"
          showModal={infoModal === InfoType.DRAWDOWN}
          handleCancel={() => setInfoModal(InfoType.NONE)}
        >
          <DrawdownInfo />
        </GenericModal>

        <GenericModal
          heading="Expenses"
          showModal={infoModal === InfoType.EXPENSES}
          handleCancel={() => setInfoModal(InfoType.NONE)}
        >
          <ExpensesInfo />
        </GenericModal>
      </DisplayRowsProvider>
    </DisplayYearProvider>
  )
}

export default SheetPage
