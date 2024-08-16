import Link from "next/link"
import { ReactNode } from "react"

export default function Anchor({
  href,
  children,
  className
}: {
  href?: string
  children?: ReactNode
  className?: string
}) {
  if (href?.substring(0, 1) === "/") {
    return (
      <Link
        href={href}
        scroll={true}
        className={` text-primary-foreground text-base focus:outline focus:outline-2 focus:outline-primary ${className}`}
      >
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={` text-primary-foreground text-base ${className}`}>
      {children}
    </a>
  )
}
