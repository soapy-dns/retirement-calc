import { Cell } from "./Cell"
import { RowIdentifier } from "./RowIdentifier"
import { CellData } from "./types"

interface IRow {
  rowIdentifier: string
  row: CellData[]
  bold?: boolean
  onToggle?: (data?: object) => void
}

// check for row is a hack
export const Row = ({ rowIdentifier, row, bold = false }: IRow) => {
  return (
    <tr className="hover:bg-gray-100">
      <RowIdentifier value={rowIdentifier} bold={bold} />

      {row &&
        row.map((cellData: CellData, index) => {
          return <Cell key={index} cellData={cellData} bold={bold} />
        })}
    </tr>
  )
}
