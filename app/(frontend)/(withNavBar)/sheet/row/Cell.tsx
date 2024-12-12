import { Constants } from "@/app/lib/calculations/constants"
import { CellData } from "./types"

interface ICell {
  key: number
  bold: boolean
  cellData: CellData
}

export const Cell = ({ cellData, bold = false }: ICell) => {
  const { value, income } = cellData

  const textColor = value < -Constants.ALLOWABLE_VARIATION ? "text-red-500" : "text-grey-300"
  const fontWeight = bold ? "font-semibold" : "font-normal"

  let displayValue = ""
  if (value ?? income) {
    displayValue = (value ?? income ?? 0).toLocaleString("au-En") // income for defined benefits
  } else {
    displayValue = "-"
  }

  return (
    <td
      className={`px-4 text-sm font-medium ${textColor} ${fontWeight} group-hover:bg-muted  whitespace-nowrap first:sticky first:left-0`}
    >
      {displayValue}
    </td>
  )
}
