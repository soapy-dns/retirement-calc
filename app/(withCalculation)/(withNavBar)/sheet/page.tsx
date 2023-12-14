"use client"

import React, { useContext, useState } from "react"
import { Cell as HeadingCell } from "./heading/Cell"
import { Row } from "./row/Row"
import { CellData } from "./row/types"
import { HeadingRow } from "./row/HeadingRow"
import { GenericModal } from "@/app/ui/components/GenericModal"
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

const Sheet = React.forwardRef<HTMLDivElement>((props, ref) => {
  const helpModalContext = useContext(HelpModalContext)
  const scenarioContext = useContext(ScenarioContext)
  const [showEarningInfo, setShowEarningInfo] = useState<boolean>(false)
  const earningInfo = "Income from a capital asset or an income stream."

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
    inflationContext,
    drawDownRowData,
    expensesRowData,
    surplusRowData
  } = calculationResults

  //@ts-ignore
  const inflationRateData: CellData[] = Object.entries(inflationContext).map(([key, value]) => {
    return { year: key.toString(), value: value.inflation * 100 }
  })
  //@ts-ignore
  const inflationFactorData: CellData[] = Object.entries(inflationContext).map(([key, value]) => {
    return { year: key.toString(), value: value.factor.toFixed(2) }
  })

  // @ts-ignore
  const headingRow = [""].concat(yearRange)

  const { showModal: showHelpModal, onToggle: onHelpModalToggle, modalData: helpModalData = {} } = helpModalContext
  const HelpModalContent = getHelpContent(helpModalData)

  if (!selectedScenario) return <div>Select a scenario</div>

  return (
    <div className="mt-20 flex flex-col">
      <div ref={ref} className="shadow-md sm:rounded-lg">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full table-fixed divide-y divide-gray-200 py-4 ">
            <thead className=" sticky top-20 z-30 bg-gray-50 ">
              <tr>
                {headingRow.map((value, index) => {
                  if (index === 0)
                    return (
                      <th className="z-30 w-1/6 bg-gray-50 italic text-primary first:sticky first:left-0">
                        {selectedScenario.name}
                      </th>
                    )
                  return <HeadingCell key={index} value={value} index={index} />
                })}
              </tr>
            </thead>
            {/* assets */}
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              <HeadingRow text="Capital" />
              {Object.entries(assetRowData).map(([rowIdentifier, rowData], index) => {
                return <Row key={index} rowIdentifier={rowIdentifier} row={rowData} onToggle={onHelpModalToggle} />
              })}

              <Row rowIdentifier="Total Assets" bold={true} row={totalAssetsData} onToggle={onHelpModalToggle} />
              <Row rowIdentifier="Present value" bold={true} row={netPresentValue} onToggle={onHelpModalToggle} />

              <EmptyLine />
              {/* earnings */}
              <HeadingRow text="Income" onToggle={toggleEarningInfo} />
              {Object.entries(earningsRowData).map(([rowIdentifier, earningsData], index) => {
                return <Row key={index} rowIdentifier={rowIdentifier} row={earningsData} onToggle={onHelpModalToggle} />
              })}
              <Row rowIdentifier="Total Income" bold={true} row={totalEarningsData} onToggle={onHelpModalToggle} />

              <EmptyLine />
              {/* expenses */}
              <HeadingRow text="Expenses" />
              {Object.entries(expensesRowData).map(([rowIdentifier, expensesData], index) => {
                return <Row key={index} rowIdentifier={rowIdentifier} row={expensesData} onToggle={onHelpModalToggle} />
              })}
              <Row rowIdentifier="Total Expenses" bold={true} row={totalExpensesData} onToggle={onHelpModalToggle} />

              <EmptyLine />
              {/* calculated values */}
              <HeadingRow text="Calculated values" />
              {/* surplus */}
              {Object.entries(surplusRowData).map(([rowIdentifier, surplusData], index) => {
                return <Row key={index} rowIdentifier={rowIdentifier} row={surplusData} onToggle={onHelpModalToggle} />
              })}
              {/* drawdowns */}
              {Object.entries(drawDownRowData).map(([rowIdentifier, incomeData], index) => {
                return <Row key={index} rowIdentifier={rowIdentifier} row={incomeData} onToggle={onHelpModalToggle} />
              })}
              <Row rowIdentifier="Inflation percentage" row={inflationRateData} onToggle={onHelpModalToggle} />
              <Row rowIdentifier="Inflation factor" row={inflationFactorData} onToggle={onHelpModalToggle} />
            </tbody>
          </table>
        </div>
      </div>
      <GenericModal
        showModal={showHelpModal}
        heading="Cell Data"
        content={HelpModalContent}
        onToggle={onHelpModalToggle}
      />
      {showEarningInfo && (
        <GenericModal showModal={showEarningInfo} heading="Income" content={earningInfo} onToggle={toggleEarningInfo} />
      )}
      {/* <GenericModal
        showModal={showScenarioModal}
        heading="Select your Scenarios"
        content={<ScenarioDetails />}
        onToggle={onToggleScenarioModal}
      /> */}
    </div>
  )
})

// import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
// import Image from "next/image"
// import { useContext } from "react"

// export default function Sheet() {
//   const { selectedScenario, calculationResults } = useContext(ScenarioContext)
//   return (
//     <div className="flex flex-col">
//       <div className="">Sheet page</div>
//       <div>{selectedScenario.name}</div>
//       {calculationResults ? <pre>{JSON.stringify(calculationResults, null, 4)}</pre> : <div>Loading...</div>}
//     </div>
//   )
// }

// export const Sheet = React.forwardRef<HTMLDivElement>((props, ref) => {
//   const helpModalContext = useContext(HelpModalContext)
//   const scenarioContext = useContext(ScenarioContext)

Sheet.displayName = "Sheet"

export default Sheet
