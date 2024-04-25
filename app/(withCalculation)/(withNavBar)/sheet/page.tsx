"use client"
import { useSearchParams } from "next/navigation"
import React, { useContext, useState } from "react"

import { Cell as HeadingCell } from "./heading/Cell"
import { Row } from "./row/Row"
import { HeadingRow } from "./row/HeadingRow"
import { NoActionModal } from "@/app/ui/components/NoActionModal"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { HelpModalContext } from "@/app/ui/context/HelpModalProvider"
import { ErrorDetails } from "@/app/ui/components/ErrorDetails"
import { Container } from "@/app/ui/components/Container"
import { Spinner } from "@/app/ui/components/common/Spinner"

const EmptyLine = () => {
  return (
    <tr>
      <td>&nbsp;</td>
    </tr>
  )
}

const HelpContent = ({ modalData }: { modalData: unknown }) => (
  <pre>{modalData ? JSON.stringify(modalData, null, 4) : "N/A"}</pre>
)

const SheetPage: React.FC = () => {
  const helpModalContext = useContext(HelpModalContext)
  const scenarioContext = useContext(ScenarioContext)
  const [showEarningInfo, setShowEarningInfo] = useState<boolean>(false)
  const searchParams = useSearchParams()

  const debug = searchParams.get("debug")

  const toggleEarningInfo = () => {
    setShowEarningInfo(!showEarningInfo)
  }
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
    // inflationContext,
    drawdownRowData,
    totalDrawdownData,
    expensesRowData,
    surplusRowData
  } = calculationResults

  // @ts-ignore
  const headingRow = yearRange

  const { showModal: showHelpModal, onToggle: onHelpModalToggle, modalData: helpModalData = {} } = helpModalContext
  // const HelpModalContent = getHelpContent(helpModalData)

  if (!selectedScenario) return <div>Select a scenario</div>

  return (
    <div className="flex flex-col h-screen pb-20">
      <div className="overflow-auto">
        <table className="relative min-w-full table-fixed divide-y divide-gray-200 py-4">
          <thead className="sticky top-0 z-30 bg-gray-50 ">
            <tr>
              <th key="name" className="z-30 bg-gray-50 italic text-primary md:first:sticky md:first:left-0">
                {selectedScenario.name}
              </th>
              {headingRow.map((value, index) => {
                return <HeadingCell key={index} value={value} index={index} />
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
            <HeadingRow text="Income" onToggle={toggleEarningInfo} />
            {assetIncomeRowData &&
              Object.entries(assetIncomeRowData).map(([rowIdentifier, incomeData], index) => {
                return <Row key={index} rowIdentifier={rowIdentifier} row={incomeData} onToggle={onHelpModalToggle} />
              })}
            <Row rowIdentifier="Total Income" bold={true} row={totalAssetIncome} onToggle={onHelpModalToggle} />

            <EmptyLine />

            {/* expenses */}
            <HeadingRow text="Expenses" />
            {expensesRowData &&
              Object.entries(expensesRowData).map(([rowIdentifier, expensesData], index) => {
                return <Row key={index} rowIdentifier={rowIdentifier} row={expensesData} onToggle={onHelpModalToggle} />
              })}
            <Row rowIdentifier="Total Expenses" bold={true} row={totalExpensesData} onToggle={onHelpModalToggle} />

            <EmptyLine />

            <HeadingRow text="Drawdowns" />
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
      {showEarningInfo && (
        <NoActionModal showModal={showEarningInfo} heading="Income" onToggle={toggleEarningInfo}>
          <div>
            Income from a capital asset or an income stream. This all ends up in the capital asset which is marked as
            the &apos;Income Bucket&apos; in the asset configuration.
          </div>
        </NoActionModal>
      )}
    </div>
  )
}

export default SheetPage
