"use client"

import React, { useEffect, useState } from "react"

import { Select } from "@/app/ui/components/common/Select"
import ChartDisplay from "./ChartDisplay"
import { ChartType } from "./types"

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
      label: "Income"
    },
    {
      value: "assetSplit",
      label: "Asset Split at start of term"
    },
    {
      value: "drawdown",
      label: "Drawdown"
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
    <div className="my-24">
      <div className="mx-auto h-1/2 w-3/4">
        <div className="border border-gray=500 my-8">
          <div className="flex justify-center text-primary">
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
          <ChartDisplay chartType={selectedChart} />
        </div>
      </div>
    </div>
  )
}

export default ChartPage
