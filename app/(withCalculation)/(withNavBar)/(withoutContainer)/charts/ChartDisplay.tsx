"use client"

import React, { useContext } from "react"

import { CalculatedAssetLineChart } from "./CalculatedAssetLineChart"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
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

  const { yearRange, calculatedAssetNpvData, calculatedAssetData, graphIncomeNpvData, drawdownRowData } =
    calculationResults

  switch (chartType) {
    case ChartType.rechart:
      console.log("stacked line chart")
      return <StackedLineChart yearRange={yearRange} graphData={calculatedAssetData} />

    case ChartType.capitalAssets:
      return <CalculatedAssetLineChart yearRange={yearRange} graphData={calculatedAssetData} />
    case ChartType.capitalAssetsNpv:
      return <CalculatedAssetLineChart yearRange={yearRange} graphData={calculatedAssetNpvData} />
    case ChartType.income:
      return <CalculatedAssetLineChart yearRange={yearRange} graphData={graphIncomeNpvData} />
    case ChartType.assetSplit:
      return <AssetSplitLineChart />
    case ChartType.drawdown:
      return <CalculatedAssetLineChart yearRange={yearRange} graphData={drawdownRowData} />

    default:
      return <div>Chart does not exist</div>
  }
}

export default ChartDisplay
