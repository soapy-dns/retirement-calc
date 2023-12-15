import React from "react"
import { CellData } from "./types"

export const RowIdentifier = ({ value, bold = false }: { value: string; bold: boolean }) => {
  return (
    <td className={`whitespace-nowrap py-2 px-6 text-sm font-medium first:sticky first:left-0 first:bg-white`}>
      <p className={bold ? "font-semibold " : "font-normal"}>{value}</p>
    </td>
  )
}
