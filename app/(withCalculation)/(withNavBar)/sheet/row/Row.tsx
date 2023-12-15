import { Cell } from "./Cell"
import { RowIdentifier } from "./RowIdentifier"
import { CellData } from "./types"

interface IRow {
  rowIdentifier: string
  row?: CellData[]
  bold?: boolean
  onToggle?: (data?: object) => void
}

export const Row = ({ rowIdentifier, row, bold = false }: IRow) => {
  return (
    <tr className="hover:bg-gray-100">
      {row ? (
        <RowIdentifier value={rowIdentifier} bold={bold} />
      ) : (
        <div className="ml-4 py-2 font-bold text-primary first:sticky first:left-0 first:bg-white">{rowIdentifier}</div>
      )}

      {row &&
        row.map((cellData: CellData, index) => {
          return <Cell key={index} cellData={cellData} bold={bold} />
        })}
    </tr>
  )
}
