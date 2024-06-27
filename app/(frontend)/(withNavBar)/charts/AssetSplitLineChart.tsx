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
import { graphColors } from "./colorConstants"
import { CapitalAssetGroup } from "@/app/lib/calculations/types"
import { htmlLegendPlugin } from "./htmlLegendPlugin"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { LegendContainer } from "./LegendContainer"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

const legendContainerId = "legend-container-id"

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    htmlLegend: {
      // ID of the container to put the legend in
      containerID: legendContainerId
    },
    legend: {
      display: false
    },

    title: {
      display: false
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Year"
      }
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: "Percent"
      }
      //   ticks: {
      //     callback: function (value: number) {
      //       const thousandth = value / 1000
      //       return numberFormatter.format(thousandth)
      //     }
      //   }
    }
  }
}

export const AssetSplitLineChart: React.FC = () => {
  const { calculationResults } = useContext(ScenarioContext)

  if (!calculationResults?.success) return null
  const { assetSplitYearly } = calculationResults

  if (!assetSplitYearly) return null

  const yearRange = Object.keys(assetSplitYearly)

  const labels = yearRange
  const numColors = graphColors.length

  // take {year1: {a: 20, b: 30, c:50}} -> label = a, or b, or c, and data = 20, 30, 50
  const graphKeys = Object.keys(CapitalAssetGroup)

  const lineDatasets = graphKeys.map((assetGroup, index) => {
    const lineData = Object.values(assetSplitYearly).map((assetSplitForYear) => {
      const valueForAssetClass = assetSplitForYear.find((it) => it.assetClass === assetGroup)
      return valueForAssetClass?.fraction || 0
    })

    lineData.pop() // FIXME: the last causes the graph to go haywire cose of nexatives

    const remainder = index % numColors
    const lineDataset = {
      id: assetGroup,
      label: assetGroup,
      fill: true,
      backgroundColor: graphColors[remainder],
      data: lineData
    }
    return lineDataset
  })

  const data = {
    labels,
    datasets: lineDatasets
  }

  return (
    <>
      <div className="relative bg-white w-full h-screen max-h-[50vh] mx-auto">
        {/* @ts-ignore */}
        <Line options={options} data={data} plugins={[htmlLegendPlugin]} />
      </div>

      <LegendContainer legendContainerId={legendContainerId} />
    </>
  )
  // return (
  //   <>
  //     <div className="relative bg-white">
  //       <div className="w-full h-full">
  //         {/* @ts-ignore */}
  //         <Line options={options} data={data} plugins={[htmlLegendPlugin]} />
  //       </div>
  //     </div>
  //     <div className="border-0" id="legend-container"></div>
  //   </>
  // )
}
