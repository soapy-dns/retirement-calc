import React from "react"

export const RowIdentifier = ({ value, bold = false }: { value: string; bold: boolean }) => {
  return (
    <th
      scope="row"
      className={`text-left whitespace-nowrap py-2 px-6  first:sticky first:left-0 first:bg-white text-primary`}
    >
      <p className={bold ? "font-semibold " : "font-medium"}>{value}</p>
    </th>
  )
}
