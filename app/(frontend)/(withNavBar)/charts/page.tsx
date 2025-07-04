"use client"

import React, { useEffect, useState } from "react"

import { Select } from "@/app/ui/components/common/Select"
import ChartDisplay from "./ChartDisplay"
import { ChartType } from "./types"
import { Label } from "@/app/ui/components/common/Label"

const ChartPage = () => {
  const [selectedChart, setSelectedChart] = useState<ChartType>(ChartType.capitalAssets)

  const options = [
    {
      value: "capitalAssets",
      label: "Capital Assets"
    },
    {
      value: "capitalAssetsNpv",
      label: "Capital Assets (today's money)"
    },
    {
      value: "income",
      label: "Income (today's money)"
    },
    {
      value: "assetSplit",
      label: "Asset Split (%)"
    },
    {
      value: "drawdown",
      label: "Drawdown"
    },
    {
      value: "tax",
      label: "Total Taxes"
    },
    {
      value: "accumTaxNPV",
      label: "Accumulated Tax (today's money)"
    }
  ]

  useEffect(() => {
    // check session storage and use that if found, else use 'capital assets'
    const chartType = sessionStorage.getItem("chartType")
    if (chartType) setSelectedChart(ChartType[chartType as keyof typeof ChartType])
  }, [])

  const onChange = (val?: string) => {
    if (val) {
      if (val in ChartType) {
        setSelectedChart(ChartType[val as keyof typeof ChartType])
        sessionStorage.setItem("chartType", val)
      }
    }
  }

  return (
    <main className="my-24">
      <div className="mx-auto h-1/2 w-3/4">
        <div className="flex justify-center items-center text-primary-foreground ">
          <div>
            <Label className="mr-4" htmlFor="selectChart">
              Select a chart
            </Label>
            <Select
              id="selectChart"
              name="selectChart"
              onChange={onChange}
              isError={false}
              value={selectedChart}
              options={options}
              allowsNull={false}
            />
          </div>
        </div>
      </div>

      <ChartDisplay chartType={selectedChart} />
    </main>
  )
}

export default ChartPage
