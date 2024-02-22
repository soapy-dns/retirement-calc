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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const
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
        text: "Value"
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
    <div className="relative bg-white">
      <div className="w-full h-full">
        <Line options={options} data={data} />
      </div>
    </div>
  )
}
