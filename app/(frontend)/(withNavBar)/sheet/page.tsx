"use client"

import { useSearchParams } from "next/navigation"
import React, { useContext, useEffect, useState } from "react"

import { Cell as HeadingCell } from "./heading/Cell"
import { Row } from "./row/Row"
import { HeadingRow } from "./row/HeadingRow"
import { NoActionModal } from "@/app/ui/components/NoActionModal"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { HelpModalContext } from "@/app/ui/context/HelpModalProvider"
import { ErrorDetails } from "@/app/ui/components/ErrorDetails"
import { Container } from "@/app/ui/components/Container"
import { Spinner } from "@/app/ui/components/common/Spinner"
import { GenericModal } from "@/app/ui/components/modals/GenericModal"
import IncomeInfo from "@/docs/info/IncomeInfo.mdx"
import DrawdownInfo from "@/docs/info/DrawdownInfo.mdx"
import ExpensesInfo from "@/docs/info/ExpensesInfo.mdx"

const EmptyLine = () => {
  return (
    <tr>
      <td>&nbsp;</td>
    </tr>
  )
}

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
  const helpModalContext = useContext(HelpModalContext)
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

  const {
    yearRange,
    assetRowData,
    totalAssetsData,
    netPresentValue,
    assetIncomeRowData,
    totalAssetIncome,
    totalExpensesData,
    drawdownRowData,
    totalDrawdownData,
    expensesRowData,
    incomeTaxesData,
    totalTaxesData,
    surplusRowData
  } = calculationResults

  // @ts-ignore
  const headingRow = yearRange

  const { showModal: showHelpModal, onToggle: onHelpModalToggle, modalData: helpModalData = {} } = helpModalContext

  if (!selectedScenario) return <div>Select a scenario</div>

  return (
    <div className="flex flex-col h-screen pb-20">
      <div className="overflow-auto">
        <table className="relative min-w-full table-fixed divide-y divide-gray-200 py-4">
          <thead className="sticky top-0 z-30 bg-muted ">
            <tr>
              <th
                key="name"
                className="z-30 bg-muted italic text-primary-foreground md:first:sticky md:first:left-0 max-w-48 "
              >
                {selectedScenario.name}
              </th>
              {headingRow.map((year, index) => {
                return <HeadingCell key={index} year={year} yearIndex={index} />
              })}
            </tr>
          </thead>

          {/* assets */}
          <tbody className="divide-y divide-gray-200">
            <HeadingRow text="Capital Assets" />
            {assetRowData &&
              Object.entries(assetRowData).map(([rowIdentifier, rowData], index) => {
                return <Row key={index} rowIdentifier={rowIdentifier} row={rowData} onToggle={onHelpModalToggle} />
              })}
            <Row rowIdentifier="Total Assets" bold={true} row={totalAssetsData} onToggle={onHelpModalToggle} />
            <Row rowIdentifier="Present value" bold={true} row={netPresentValue} onToggle={onHelpModalToggle} />

            <EmptyLine />

            {/* income from assets */}
            <HeadingRow text="Income" onToggle={() => setInfoModal(InfoType.INCOME)} />
            {assetIncomeRowData &&
              Object.entries(assetIncomeRowData).map(([rowIdentifier, incomeData], index) => {
                return <Row key={index} rowIdentifier={rowIdentifier} row={incomeData} onToggle={onHelpModalToggle} />
              })}
            <Row rowIdentifier="Total Income" bold={true} row={totalAssetIncome} onToggle={onHelpModalToggle} />

            <EmptyLine />

            {/* expenses */}
            <HeadingRow text="Expenses" onToggle={() => setInfoModal(InfoType.EXPENSES)} />
            {expensesRowData &&
              Object.entries(expensesRowData).map(([rowIdentifier, expensesData], index) => {
                return <Row key={index} rowIdentifier={rowIdentifier} row={expensesData} onToggle={onHelpModalToggle} />
              })}
            <Row rowIdentifier="Income Taxes" bold={true} row={incomeTaxesData} onToggle={onHelpModalToggle} />

            <Row rowIdentifier="Total Taxes" bold={true} row={totalTaxesData} onToggle={onHelpModalToggle} />

            <Row rowIdentifier="Total Expenses" bold={true} row={totalExpensesData} onToggle={onHelpModalToggle} />

            <EmptyLine />

            <HeadingRow text="Drawdowns" onToggle={() => setInfoModal(InfoType.DRAWDOWN)} />
            {drawdownRowData &&
              Object.entries(drawdownRowData).map(([rowIdentifier, rowData], index) => {
                return <Row key={index} rowIdentifier={rowIdentifier} row={rowData} onToggle={onHelpModalToggle} />
              })}
            <Row
              rowIdentifier="Total asset drawdowns"
              row={totalDrawdownData}
              bold={true}
              onToggle={onHelpModalToggle}
            />

            <EmptyLine />

            {/* calculated values */}
            <HeadingRow text="Calculated values" />
            {/* surplus */}
            {surplusRowData &&
              Object.entries(surplusRowData).map(([rowIdentifier, surplusData], index) => {
                return <Row key={index} rowIdentifier={rowIdentifier} row={surplusData} onToggle={onHelpModalToggle} />
              })}
            {/* drawdowns */}

            {/* <Row rowIdentifier="Inflation percentage" row={inflationRateData} onToggle={onHelpModalToggle} />
              <Row rowIdentifier="Inflation factor" row={inflationFactorData} onToggle={onHelpModalToggle} /> */}
          </tbody>
        </table>
      </div>
      {debug && (
        <NoActionModal
          showModal={showHelpModal}
          heading="Cell Data"
          // content={HelpModalContent}
          onToggle={onHelpModalToggle}
        >
          <HelpContent modalData={helpModalData} />
        </NoActionModal>
      )}

      {infoModal === InfoType.INCOME && (
        <GenericModal
          heading="Income"
          showModal={infoModal === InfoType.INCOME}
          handleCancel={() => setInfoModal(InfoType.NONE)}
        >
          <IncomeInfo />
        </GenericModal>
      )}

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
    </div>
  )
}

export default SheetPage
