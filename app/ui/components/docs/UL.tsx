import { ReactNode } from "react"

export default function UL({ children }: { children?: ReactNode }) {
  return <ul className="mb-4">{children}</ul>
}
