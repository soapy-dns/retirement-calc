import Link from "next/link"
import { ReactNode } from "react"

export default function Anchor({ href, children }: { href?: string; children?: ReactNode }) {
  if (href?.substring(0, 1) === "/") {
    return (
      <Link href={href} className="text-primary text-base">
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className="text-primary text-base">
      {children}
    </a>
  )
}
