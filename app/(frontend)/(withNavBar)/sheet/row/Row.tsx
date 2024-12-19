import { useContext } from "react"
import { DisplayYearContext } from "../context/DisplayYearProvider"
import { Cell } from "./Cell"
import { CellData } from "./types"

interface IRow {
  rowIdentifier: string
  cells: CellData[]
  bold?: boolean
  onToggle?: (data?: object) => void
}

// check for row is a hack
export const Row = ({ rowIdentifier, cells, bold = false }: IRow) => {
  const { shouldDisplayYear } = useContext(DisplayYearContext)
  const filteredCells = cells.filter((cell) => shouldDisplayYear(cell.year))

  return (
    <tr className="hover:bg-muted bg-white group">
      <th
        scope="row"
        className={`text-left py-2 px-4 group-hover:bg-muted md:sticky left-0 bg-white text-primary-foreground max-w-48`}
      >
        <p className="font-semibold">{rowIdentifier}</p>
      </th>

      {filteredCells &&
        filteredCells.map((cellData: CellData, index) => {
          return <Cell key={index} cellData={cellData} bold={bold} />
        })}
    </tr>
  )
}
