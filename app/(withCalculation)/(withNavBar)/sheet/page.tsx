"use client"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import Image from "next/image"
import { useContext } from "react"

export default function Sheet() {
  const { selectedScenario, calculationResults } = useContext(ScenarioContext)
  return (
    <div className="flex flex-col">
      <div className="">Sheet page</div>
      <div>{selectedScenario.name}</div>
      <pre>{JSON.stringify(calculationResults, null, 4)}</pre>
    </div>
  )
}

// export const Sheet = React.forwardRef<HTMLDivElement>((props, ref) => {
//   const helpModalContext = useContext(HelpModalContext)
//   const scenarioContext = useContext(ScenarioContext)
