import { ReactNode } from "react"

export default function H2({ children }: { children?: ReactNode }) {
  return <h2 className="text-primary mb-4 text-xl">{children}</h2>
}
