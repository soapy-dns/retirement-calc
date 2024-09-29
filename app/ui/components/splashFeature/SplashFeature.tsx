import React from "react"
import { Text } from "./Text"

interface Props {
  children: React.ReactNode
}

export const SFRoot: React.FC<Props> = ({ children }) => {
  // return <div>sf</div>
  return <div className="flex flex-col items-center">{children}</div>
}

export const SplashFeature = {
  Root: SFRoot,
  Text: Text
}
