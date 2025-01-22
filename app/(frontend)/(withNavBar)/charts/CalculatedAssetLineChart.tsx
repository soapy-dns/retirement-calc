import React, { useContext } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from "chart.js"
import { Line } from "react-chartjs-2"
import annotationPlugin from "chartjs-plugin-annotation"

import { graphColors } from "./colorConstants"
import { AssetData } from "@/app/lib/calculations/types"
import { htmlLegendPlugin } from "./htmlLegendPlugin"
import { LegendContainer } from "./LegendContainer"
import { getOptions } from "./utils/getOptions"
import { FullOwnerContext } from "@/app/ui/context/LifeExpectancyProvider"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  annotationPlugin
)

const legendContainerId = "legend-container-id"

interface Props {
  yearRange: number[]
  graphData: AssetData
}

export const CalculatedAssetLineChart: React.FC<Props> = ({ yearRange, graphData }) => {
  const labels = yearRange
  const assetData = graphData
  const numColors = graphColors.length
  const { fullOwnerDetails } = useContext(FullOwnerContext)

  const redLines = fullOwnerDetails?.reduce((accum, it) => {
    if (it.yearsLeft && !accum.includes(it.yearsLeft)) {
      accum.push(it.yearsLeft)
    }
    return accum
  }, [] as number[])

  const options = getOptions({ legendContainerId, redLines })

  const lineDatasets = Object.entries(assetData).map(([key, obj], index) => {
    const remainder = index % numColors

    const lineDataset = {
      id: key,
      label: key,
      fill: true,
      backgroundColor: graphColors[remainder],
      data: obj.map((it) => it.value)
    }

    return lineDataset
  })

  const data = {
    labels,
    datasets: lineDatasets
  }

  return (
    <>
      <div className="relative bg-white w-full h-screen max-h-[50vh] px-4">
        {/* @ts-ignore */}
        <Line options={options} data={data} plugins={[htmlLegendPlugin]} />
      </div>

      <LegendContainer legendContainerId={legendContainerId} />
    </>
  )
}
