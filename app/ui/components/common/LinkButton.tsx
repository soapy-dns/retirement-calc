import Link from "next/link"
import React, { forwardRef, Ref } from "react"

export enum LinkType {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary"
}
interface Props {
  id?: string
  linkType?: LinkType
  href: string
  children: React.ReactNode
}

// TODO: extract common stuff out of this and Button
export const LinkButton = forwardRef<HTMLAnchorElement, Props>((props, ref: Ref<HTMLAnchorElement>) => {
  const { id, linkType, href, children } = props

  const getButtonClassName = () => {
    switch (linkType) {
      case LinkType.primary:
        return "rounded-full bg-primary py-2 px-4 text-white border-2 border-white  flex justify-center items-center focus:outline-hidden focus:ring-1 focus:ring-offset-2 focus:ring-primary/75 shadow-md shadow-primary-darker/50 hover:shadow-primary-darker/25 hover:bg-primary-darker disabled:opacity-40 "

      case LinkType.secondary:
        return "display-block my-4 rounded-full border-2  border-primary  py-1 px-4 text-primary-foreground  disabled:opacity-40 focus:outline-hidden focus:ring-1 focus:ring-offset-2 focus:ring-primary/75 flex flex-row justify-center items-center"
      default:
        return "py-1 text-primary-foreground  disabled:opacity-40 focus:outline focus:outline-2 focus:outline-primary"
    }
  }

  return (
    <Link ref={ref} id={id} href={href} className={getButtonClassName()}>
      {children}
    </Link>
  )
})

LinkButton.displayName = "LinkButton"
