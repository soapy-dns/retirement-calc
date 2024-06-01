import React from "react"

interface Props {
  legendContainerId: string
}

export const LegendContainer: React.FC<Props> = ({ legendContainerId }) => {
  return (
    <div className="mx-auto w-3/4">
      <div id={legendContainerId}></div>
    </div>
  )
}
