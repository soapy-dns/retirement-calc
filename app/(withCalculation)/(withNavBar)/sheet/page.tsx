"use client"
import { useSearchParams } from "next/navigation"
import React, { useContext, useState } from "react"
import { Cell as HeadingCell } from "./heading/Cell"
import { Row } from "./row/Row"
import { HeadingRow } from "./row/HeadingRow"
import { NoActionModal } from "@/app/ui/components/NoActionModal"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { HelpModalContext } from "@/app/ui/context/HelpModalProvider"

const EmptyLine = () => {
  return (
    <tr>
      <td>&nbsp;</td>
    </tr>
  )
}
const getHelpContent = (modalData: unknown): React.ReactElement => (
  <pre>{modalData ? JSON.stringify(modalData, null, 4) : "N/A"}</pre>
)

const SheetPage: React.FC = () => {
  const helpModalContext = useContext(HelpModalContext)
  const scenarioContext = useContext(ScenarioContext)
  const [showEarningInfo, setShowEarningInfo] = useState<boolean>(false)
  const searchParams = useSearchParams()

  const debug = searchParams.get("debug")

  const earningInfo =
    "Income from a capital asset or an income stream.  This all ends up in the capital asset which is marked as the 'Earnings Bucket' in the asset configuration."

  const toggleEarningInfo = () => {
    setShowEarningInfo(!showEarningInfo)
  }
  const { selectedScenario, calculationResults } = scenarioContext
  if (!calculationResults) return null

  const {
    yearRange,
    assetRowData,
    totalAssetsData,
    netPresentValue,
    earningsRowData,
    totalEarningsData,
    totalExpensesData,
    // inflationContext,
    drawdownRowData,
    totalDrawdownData,
    expensesRowData,
    surplusRowData
  } = calculationResults

  // @ts-ignore
  const headingRow = [""].concat(yearRange)

  const { showModal: showHelpModal, onToggle: onHelpModalToggle, modalData: helpModalData = {} } = helpModalContext
  const HelpModalContent = getHelpContent(helpModalData)

  if (!selectedScenario) return <div>Select a scenario</div>

  return (
    <div className="mt-20 flex flex-col">
      <div className="">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full table-fixed divide-y divide-gray-200 py-4 ">
            <thead className="sticky top-20 z-30 bg-gray-50 ">
              <tr>
                {headingRow.map((value, index) => {
                  if (index === 0)
                    return (
                      <th key={index} className="z-30 w-1/6 bg-gray-50 italic text-primary first:sticky first:left-0">
                        {selectedScenario.name}
                      </th>
                    )
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
              {/* earnings */}
              <HeadingRow text="Income" onToggle={toggleEarningInfo} />
              {earningsRowData &&
                Object.entries(earningsRowData).map(([rowIdentifier, earningsData], index) => {
                  return (
                    <Row key={index} rowIdentifier={rowIdentifier} row={earningsData} onToggle={onHelpModalToggle} />
                  )
                })}
              <Row rowIdentifier="Total Income" bold={true} row={totalEarningsData} onToggle={onHelpModalToggle} />
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
              {/* expenses */}
              <HeadingRow text="Expenses" />
              {expensesRowData &&
                Object.entries(expensesRowData).map(([rowIdentifier, expensesData], index) => {
                  return (
                    <Row key={index} rowIdentifier={rowIdentifier} row={expensesData} onToggle={onHelpModalToggle} />
                  )
                })}
              <Row rowIdentifier="Total Expenses" bold={true} row={totalExpensesData} onToggle={onHelpModalToggle} />
              <EmptyLine />
              {/* calculated values */}
              <HeadingRow text="Calculated values" />
              {/* surplus */}
              {surplusRowData &&
                Object.entries(surplusRowData).map(([rowIdentifier, surplusData], index) => {
                  return (
                    <Row key={index} rowIdentifier={rowIdentifier} row={surplusData} onToggle={onHelpModalToggle} />
                  )
                })}
              {/* drawdowns */}

              {/* <Row rowIdentifier="Inflation percentage" row={inflationRateData} onToggle={onHelpModalToggle} />
              <Row rowIdentifier="Inflation factor" row={inflationFactorData} onToggle={onHelpModalToggle} /> */}
            </tbody>
          </table>
        </div>
      </div>
      {debug && (
        <NoActionModal
          showModal={showHelpModal}
          heading="Cell Data"
          content={HelpModalContent}
          onToggle={onHelpModalToggle}
        />
      )}
      {showEarningInfo && (
        <NoActionModal
          showModal={showEarningInfo}
          heading="Income"
          content={earningInfo}
          onToggle={toggleEarningInfo}
        />
      )}
    </div>
  )
}

export default SheetPage
