import { ReactNode } from "react"

export default function LI({ children }: { children?: ReactNode }) {
  return <li className="list-disc list-inside">{children}</li>
}
