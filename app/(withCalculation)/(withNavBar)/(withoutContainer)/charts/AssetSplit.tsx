import React, { useContext, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import { useEffect } from "react"
import { graphColors } from "./colorConstants"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { AssetSplitItem } from "@/app/lib/calculations/types"

ChartJS.register(ArcElement, Tooltip, Legend)

export function AssetSplit() {
  const { selectedScenario, calculationResults } = useContext(ScenarioContext)
  const [filteredAssetSplit, setFilteredAssetSplit] = useState<AssetSplitItem[]>()

  useEffect(() => {
    if (selectedScenario) {
      const filtered = calculatedAssetSplit.filter((it) => it.fraction !== 0)
      setFilteredAssetSplit(filtered)
    }
  }, [])
  if (!calculationResults?.success) return null

  const { assetSplit: calculatedAssetSplit } = calculationResults

  if (!filteredAssetSplit) return <div>select a scenario</div>

  const labels = filteredAssetSplit.map((it) => it.assetClass)
  const data = filteredAssetSplit.map((it) => it.fraction)
  const backgroundColor = graphColors
  const borderColor = graphColors

  const graphData = {
    labels,
    datasets: [{ data, label: "Asset split", backgroundColor, borderColor, borderWidth: 1 }]
  }

  return (
    <div className="flex justify-center w-full h-full">
      <div className="relative bg-white">
        <div className="w-full h-full">
          <Pie data={graphData} />
        </div>
      </div>
    </div>
  )
}
