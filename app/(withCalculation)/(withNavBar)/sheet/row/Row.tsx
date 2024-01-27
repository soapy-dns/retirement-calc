import { Cell } from "./Cell"
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
    <tr className="hover:bg-gray-100 bg-white group">
      <th
        scope="row"
        className={`text-left whitespace-nowrap py-2 px-6 group-hover:bg-gray-100 sticky left-0 bg-white text-primary`}
      >
        <p className="font-semibold">{rowIdentifier}</p>
      </th>

      {row &&
        row.map((cellData: CellData, index) => {
          return <Cell key={index} cellData={cellData} bold={bold} />
        })}
    </tr>
  )
}
