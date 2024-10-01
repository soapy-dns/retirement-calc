import React from "react"

interface Props {
  children: string
}

export const Text: React.FC<Props> = ({ children: text }) => {
  return <div className="text-center">{text}</div>
}
