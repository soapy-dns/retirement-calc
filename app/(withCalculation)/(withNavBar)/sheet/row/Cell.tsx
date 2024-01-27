import { Constants } from "@/app/lib/calculations/constants"
import { HelpModalContext } from "@/app/ui/context/HelpModalProvider"
import { useContext } from "react"
// import { Constants } from "../../../../calculations/constants"
// import { HelpModalContext } from "../../../context/HelpModalProvider"
import { CellData } from "./types"

interface ICell {
  key: number
  bold: boolean
  cellData: CellData
}

export const Cell = ({ cellData, bold = false }: ICell) => {
  const { value, transferAmt = 0, income } = cellData

  const colour = value < -Constants.ALLOWABLE_VARIATION ? "text-red-500" : "text-grey-300"

  // const getBackgroundColour = (transferAmt: number) => (transferAmt > 0 ? "bg-green-50" : "bg-red-50")
  // const bgColour = transferAmt ? getBackgroundColour(transferAmt) : null

  const helpModalContext = useContext(HelpModalContext)

  const { onToggle } = helpModalContext

  const handleButtonClick = () => {
    onToggle(cellData)
  }

  let displayValue = ""
  if (value ?? income) {
    displayValue = (value ?? income ?? 0).toLocaleString("au-En") // income for defined benefits
  } else {
    displayValue = "-"
  }

  return (
    <td
      className={`px-6 text-sm font-medium ${colour} group-hover:bg-gray-100  whitespace-nowrap first:sticky first:left-0`}
    >
      <button onClick={handleButtonClick}>
        <p className={bold ? "font-semibold " : "font-normal"}>{displayValue}</p>
      </button>
    </td>
  )
}
