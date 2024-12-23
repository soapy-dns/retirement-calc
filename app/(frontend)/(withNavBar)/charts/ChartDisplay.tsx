"use client"

import React, { useContext } from "react"

import { CalculatedAssetLineChart } from "./CalculatedAssetLineChart"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { Spinner } from "@/app/ui/components/common/Spinner"
import { ErrorDetails } from "@/app/ui/components/ErrorDetails"
import { Container } from "@/app/ui/components/Container"
import { ChartType } from "./types"
import { AssetSplitLineChart } from "./AssetSplitLineChart"
import { StackedLineChart } from "./StackedLineChart"

interface ChartDisplayProps {
  chartType: ChartType
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ chartType }) => {
  const { calculationResults } = useContext(ScenarioContext)

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
    calculatedAssetNpvData,
    calculatedAssetData,
    graphIncomeNpvData,
    drawdownRowData,
    totalTaxesData,
    accumulatedNpvTaxData
  } = calculationResults

  switch (chartType) {
    case ChartType.rechart:
      // this option was a test of rechart - a lot of work for not much benefit
      return <StackedLineChart yearRange={yearRange} graphData={calculatedAssetData} />

    case ChartType.capitalAssets:
      console.log("calculatedAssetData", calculatedAssetData)
      return <CalculatedAssetLineChart yearRange={yearRange} graphData={calculatedAssetData} />
    case ChartType.capitalAssetsNpv:
      return <CalculatedAssetLineChart yearRange={yearRange} graphData={calculatedAssetNpvData} />
    case ChartType.income:
      return <CalculatedAssetLineChart yearRange={yearRange} graphData={graphIncomeNpvData} />
    case ChartType.assetSplit:
      return <AssetSplitLineChart />
    case ChartType.drawdown:
      return <CalculatedAssetLineChart yearRange={yearRange} graphData={drawdownRowData} />
    case ChartType.tax:
      const graphData = { "Total Taxes": totalTaxesData }
      return <CalculatedAssetLineChart yearRange={yearRange} graphData={graphData} />

    case ChartType.accumTaxNPV:
      const accumulatedNpvTaxDataAndLabel = { "Accum Tax NPV": accumulatedNpvTaxData }
      return <CalculatedAssetLineChart yearRange={yearRange} graphData={accumulatedNpvTaxDataAndLabel} />
    default:
      return <div>Chart does not exist</div>
  }
}

export default ChartDisplay
