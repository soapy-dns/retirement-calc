"use client"
import React, { useContext, useState } from "react"

import { CalculatedAssetLineChart } from "./CalculatedAssetLineChart"
import { AssetSplit } from "./AssetSplit"
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline"
import { ArrowsPointingInIcon } from "@heroicons/react/24/solid"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { redirect } from "next/navigation"
import { AppPath } from "@/app/ui/types"
import { Container } from "@/app/ui/components/Container"
import { ErrorDetails } from "@/app/ui/components/ErrorDetails"
import { Spinner } from "@/app/ui/components/common/Spinner"

const ChartPage = () => {
  const { selectedScenario, calculationResults } = useContext(ScenarioContext)
  const [showIt, setShowIt] = useState<boolean>(false)

  // if (!calculationResults?.success) redirect(AppPath.config)
  //localhost:3000/sheet

  // const [animationClass, setAnimationClass] = useState<string>("")

  const toggleShowIt = () => {
    // if (animationClass === "") setAnimationClass("animate-fade-in")
    // if (animationClass === "animate-fade-out") setAnimationClass("animate-fade-in")
    // if (animationClass === "animate-fade-in") setAnimationClass("animate-fade-out")

    // console.log("--animationClass--", animationClass)
    setShowIt(!showIt)
  }

  // if (!selectedScenario || !calculationResults) return <div>select a scenario</div>
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

  const { yearRange, calculatedAssetNpvData, calculatedAssetData, graphIncomeNpvData } = calculationResults

  return (
    <>
      {/* <Container> */}
      <div className="mb-8">
        <div className="flex justify-center text-primary">
          <h2>
            Capital Assets
            <button onClick={toggleShowIt}>
              <ArrowsPointingOutIcon className="ml-2 h-5 w-5" />
            </button>
          </h2>
        </div>

        <CalculatedAssetLineChart yearRange={yearRange} graphData={calculatedAssetData} />
      </div>

      <div className="mb-8">
        <h2 className="text-center text-primary">
          Capital Assets(in today&apos;s money){" "}
          <button onClick={() => alert("To be implemented")}>
            <ArrowsPointingOutIcon className="ml-2 h-5 w-5" />
          </button>
        </h2>
        <CalculatedAssetLineChart yearRange={yearRange} graphData={calculatedAssetNpvData} />
      </div>

      <div className="mb-8">
        <h2 className="text-center text-primary">Income</h2>
        <CalculatedAssetLineChart yearRange={yearRange} graphData={graphIncomeNpvData} />
      </div>

      <div className="mb-8">
        <h2 className="text-center text-primary">Asset split at start of term</h2>
        <div className="flex max-h-80 justify-center">
          <AssetSplit />
        </div>
      </div>
      {/* </Container> */}
      {showIt && (
        <div
          className={`fixed inset-0 z-50 h-full w-full  overflow-hidden bg-white bg-opacity-100 `}
          id="expanded-chart"
        >
          <div className="mb-8">
            <div className="flex justify-center text-primary">
              <h2>
                Asset values over time{" "}
                <button onClick={toggleShowIt}>
                  <ArrowsPointingInIcon className="ml-2 h-5 w-5" />
                </button>
              </h2>
            </div>

            <div className="mx-auto w-[80%]">
              <CalculatedAssetLineChart yearRange={yearRange} graphData={calculatedAssetData} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChartPage
