import React from "react"

export const RowIdentifier = ({ cellData, bold = false }) => {
  return (
    <td className={`whitespace-nowrap py-2 px-6 text-sm font-medium first:sticky first:left-0 first:bg-white`}>
      <p className={bold ? "font-semibold " : "font-normal"}>{cellData}</p>
    </td>
  )
}
