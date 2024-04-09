import { ReactNode } from "react"

export default function LI({ children }: { children?: ReactNode }) {
  console.log("list inside")
  return <li className="list-disc list-inside">{children}</li>
}
