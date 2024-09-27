import React from "react"

interface Props {
  children: React.ReactNode
}

export const SplashFeature: React.FC<Props> = ({ children }) => {
  return <div className="flex flex-col items-center">{children}</div>
}
