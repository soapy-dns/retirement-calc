import Link from "next/link"

export enum LinkType {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary"
}
interface Props {
  linkType?: LinkType
  href: string
  children: React.ReactNode
}

// TODO: extract common stuff out of this and Button
export const LinkButton: React.FC<Props> = ({ linkType, href, children }) => {
  const getButtonClassName = () => {
    switch (linkType) {
      case LinkType.primary:
        return "rounded-full bg-primary py-2 px-4 text-white  flex justify-center items-center"

        return "my-4 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-opacity-75 focus:ring-primary bg-primary py-1 px-4 shadow-md shadow-primary-darker/50 hover:shadow-primary-darker/25 text-white hover:bg-primary-darker disabled:opacity-40 display-block w-full flex justify-center items-center"

      // return "my-4 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-opacity-75 focus:ring-primary bg-primary py-1 px-4 shadow-md shadow-primary-darker/50 hover:shadow-primary-darker/25 text-white  hover:bg-primary-darker disabled:opacity-40"
      case LinkType.secondary:
        return "display-block my-4 rounded-full border-2  border-primary  py-1 px-4 text-primary-foreground  disabled:opacity-40 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-opacity-75 focus:ring-primary flex flex-row justify-center items-center"
      default:
        return "py-1 text-primary-foreground  disabled:opacity-40 focus:outline focus:outline-2 focus:outline-primary"
    }
  }

  return (
    <Link href={href} className={getButtonClassName()}>
      {children}
    </Link>
  )
}
