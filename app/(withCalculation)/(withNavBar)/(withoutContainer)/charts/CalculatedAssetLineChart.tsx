import React from "react"
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
import { AssetData } from "@/app/lib/calculations/types"
import { htmlLegendPlugin } from "./htmlLegendPlugin"
import { numberFormatter } from "@/app/ui/utils/formatter"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

export const options = {
  responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    htmlLegend: {
      // ID of the container to put the legend in
      containerID: "legend-container"
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
        text: "Value (thousands)"
      },
      ticks: {
        callback: function (value: number) {
          const thousandth = value / 1000
          return numberFormatter.format(thousandth)
        }
      }
    }
  }
}

interface Props {
  yearRange: number[]
  graphData: AssetData
}

export const CalculatedAssetLineChart: React.FC<Props> = ({ yearRange, graphData }) => {
  const labels = yearRange
  const assetData = graphData

  const datasets = Object.entries(assetData).map(([key, obj], index) => {
    return {
      id: key,
      label: key,
      fill: true,
      backgroundColor: graphColors[index],
      data: obj.map((it) => it.value)
    }
  })

  const data = {
    labels,
    datasets
  }

  return (
    <>
      <div className="relative bg-white">
        <div className="w-full h-full">
          {/* @ts-ignore */}
          <Line options={options} data={data} plugins={[htmlLegendPlugin]} />
        </div>
      </div>
      <div className="border" id="legend-container"></div>
    </>
  )
}
