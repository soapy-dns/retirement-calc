import { ReactNode } from "react"

export default function H1({ children }: { children?: ReactNode }) {
  return <h1 className="text-primary mb-4 text-2xl">{children}</h1>
}
