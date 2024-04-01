import { ValidationIssue } from "@/app/lib/calculations/types"
import { IAsset, Transfer } from "@/app/lib/data/schema/config"
import Link from "next/link"

interface ComponentProps {
  error: ValidationIssue
  assets: IAsset[]
  transfers: Transfer[]
}

export const FormattedErrorLine: React.FC<ComponentProps> = ({ error, assets, transfers }) => {
  let path, linkText

  if (error.path[0] === "context") {
    path = `/context/${error.path[1]}`

    switch (error.path[1]) {
      case "inflation":
        linkText = "Inflation"
        break
      case "livingExpenses":
        linkText = "Living Expenses"
        break
      case "auBank":
        linkText = "Cash"
        path = `/context/bank`

        break
      default:
        linkText = "Context"
    }
  } else if (error.path[0] === "assets" && typeof error.path[1] === "number") {
    const asset = assets[error.path[1]]
    path = `/assets/${asset.id}`
    linkText = asset.name
  } else if (error.path[0] === "transfers" && typeof error.path[1] === "number") {
    if (!transfers) {
      return " Error with transfers"
    }
    const transfer = transfers[error.path[1]]
    path = `/transfers/${transfer.id}`
    linkText = "transfer"
  } else {
    linkText = `${error.path[0]} ${error.path[1]}`
  }
  return (
    <li>
      {path && linkText && (
        <>
          Error in{" "}
          <Link className="text-primary underline" href={path}>
            {linkText}
          </Link>
          {" - "}
          {error.message}
        </>
      )}
      {!path && <div>{error.message}</div>}
    </li>
  )
}
