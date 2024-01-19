import React, { useContext, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
// import { ScenarioContext } from "../../context/ScenarioContext"
import { useEffect } from "react"
import { graphColors } from "./colorConstants"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { AssetSplitItem } from "@/app/lib/calculations/types"
import { redirect } from "next/navigation"
import { AppPath } from "@/app/ui/types"
// import { AssetSplitItem } from "calculations/assets/getAssetClasses"

ChartJS.register(ArcElement, Tooltip, Legend)

const defaultBackGroundColours = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)"
]

const defaultBorderColours = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)"
]

// export interface AssetSplitItem {
//   assetClass: string
//   fraction: number
// }

export function AssetSplit() {
  const { selectedScenario, calculationResults } = useContext(ScenarioContext)
  // if (!calculationResults) throw new Error("no calculated results")
  if (!calculationResults?.success) redirect(AppPath.config)

  const { assetSplit: calculatedAssetSplit } = calculationResults
  const [filteredAssetSplit, setFilteredAssetSplit] = useState<AssetSplitItem[]>()

  useEffect(() => {
    if (selectedScenario) {
      const filtered = calculatedAssetSplit.filter((it) => it.fraction !== 0)
      setFilteredAssetSplit(filtered)
    }
  }, [])

  if (!filteredAssetSplit) return <div>select a scenario</div>

  const labels = filteredAssetSplit.map((it) => it.assetClass)
  const data = filteredAssetSplit.map((it) => it.fraction)
  const backgroundColor = graphColors
  const borderColor = graphColors

  const graphData = {
    labels,
    datasets: [{ data, label: "Asset split", backgroundColor, borderColor, borderWidth: 1 }]
  }

  return <Pie data={graphData} />
}
