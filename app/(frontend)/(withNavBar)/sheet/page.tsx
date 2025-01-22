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
import IncomeInfo from "@/docs/info/IncomeInfo.mdx"
import DrawdownInfo from "@/docs/info/DrawdownInfo.mdx"
import ExpensesInfo from "@/docs/info/ExpensesInfo.mdx"
import { AssetIncomeRows } from "./AssetIncomeRows"
import { CalculatedValueRows } from "./CalculatedValuesRows"
import { IndividualTaxRows } from "./IndividualTaxRows"
import { IndividualIncomeRows } from "./IndividualIncomeRows"
import { DisplayYearProvider } from "./context/DisplayYearProvider"
import { HeadingRow } from "./HeadingRow"
import { Switch } from "@/app/ui/components/common/switch/Switch"
import { DisplayOptionsMenu } from "@/app/ui/components/menus/DisplayOptionMenu"

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
  const [allRows, setAllRows] = useState<boolean>(false)
  const [allCols, setAllCols] = useState<boolean>(false)
  const [infoModal, setInfoModal] = useState<InfoType>(InfoType.NONE)

  const toggleAllRows = () => {
    setAllRows(!allRows)
  }

  const toggleAllCols = () => {
    setAllCols(!allCols)
  }

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
    surplusRowData,
    incomeTaxesByOwner,
    incomeByOwner,
    totalTaxableAmtDataByOwner,
    accumulatedTaxData,
    accumulatedNpvTaxData
  } = calculationResults

  const { showModal: showHelpModal, onToggle: onHelpModalToggle, modalData: helpModalData = {} } = helpModalContext

  if (!selectedScenario) return <div>Select a scenario</div>

  return (
    <DisplayYearProvider yearRange={yearRange} allCols={allCols}>
      <main className="flex flex-col h-screen pb-20">
        <div className="overflow-auto">
          <table className="relative min-w-full table-fixed divide-y divide-gray-200 py-4">
            <thead className="sticky top-0 z-30 bg-muted ">
              <tr>
                <th
                  scope="col"
                  className="z-30 bg-muted italic text-primary-foreground md:first:sticky md:first:left-0 max-w-48 "
                >
                  <DisplayOptionsMenu toggleAllCols={toggleAllCols} toggleAllRows={toggleAllRows} />
                </th>
                <HeadingRow />
              </tr>
            </thead>

            {/* assets */}
            <tbody className="divide-y divide-gray-200">
              <SectionHeading text="Capital Assets" />
              {assetRowData &&
                Object.entries(assetRowData).map(([rowIdentifier, rowData], index) => {
                  return <Row key={index} rowIdentifier={rowIdentifier} cells={rowData} onToggle={onHelpModalToggle} />
                })}
              <Row rowIdentifier="Total Assets" bold={true} cells={totalAssetsData} onToggle={onHelpModalToggle} />
              <Row rowIdentifier="Present value" bold={true} cells={netPresentValue} onToggle={onHelpModalToggle} />
              <EmptyLine />

              {/* income from assets */}
              <SectionHeading text="Income" onToggle={() => setInfoModal(InfoType.INCOME)} />

              {assetIncomeRowData && allRows && <AssetIncomeRows data={assetIncomeRowData} />}

              {incomeByOwner && <IndividualIncomeRows data={incomeByOwner} />}

              <Row rowIdentifier="Total Income" bold={true} cells={totalAssetIncome} onToggle={onHelpModalToggle} />
              <EmptyLine />

              <SectionHeading text="Drawdowns" onToggle={() => setInfoModal(InfoType.DRAWDOWN)} />
              {drawdownRowData &&
                Object.entries(drawdownRowData).map(([rowIdentifier, rowData], index) => {
                  return <Row key={index} rowIdentifier={rowIdentifier} cells={rowData} onToggle={onHelpModalToggle} />
                })}
              <Row
                rowIdentifier="Total asset drawdowns"
                cells={totalDrawdownData}
                bold={true}
                onToggle={onHelpModalToggle}
              />
              <EmptyLine />

              {/* TAXES */}
              <SectionHeading text="Taxes" />
              {totalTaxableAmtDataByOwner &&
                Object.entries(totalTaxableAmtDataByOwner).map(([owner, data]) => {
                  return (
                    <Row
                      key={owner}
                      rowIdentifier={`Taxable income - ${owner}`}
                      cells={data}
                      onToggle={onHelpModalToggle}
                    />
                  )
                })}

              {incomeTaxesByOwner && <IndividualTaxRows data={incomeTaxesByOwner} />}

              <Row rowIdentifier="Income Taxes" bold={true} cells={incomeTaxesData} onToggle={onHelpModalToggle} />
              <Row rowIdentifier="Total Taxes" bold={true} cells={totalTaxesData} onToggle={onHelpModalToggle} />
              <Row
                rowIdentifier="Accumulated Taxes"
                bold={true}
                cells={accumulatedTaxData}
                onToggle={onHelpModalToggle}
              />

              <Row
                rowIdentifier="Accumulated Taxes NPV"
                bold={true}
                cells={accumulatedNpvTaxData}
                onToggle={onHelpModalToggle}
              />
              <EmptyLine />

              {/* expenses */}
              <SectionHeading text="Expenses" onToggle={() => setInfoModal(InfoType.EXPENSES)} />
              {expensesRowData &&
                Object.entries(expensesRowData).map(([rowIdentifier, expensesData], index) => {
                  return (
                    <Row key={index} rowIdentifier={rowIdentifier} cells={expensesData} onToggle={onHelpModalToggle} />
                  )
                })}
              <Row rowIdentifier="Total Taxes" bold={true} cells={totalTaxesData} onToggle={onHelpModalToggle} />
              <Row rowIdentifier="Total Expenses" bold={true} cells={totalExpensesData} onToggle={onHelpModalToggle} />
              <EmptyLine />

              {allRows && CalculatedValueRows({ data: surplusRowData })}
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
      </main>
    </DisplayYearProvider>
  )
}

export default SheetPage
