import React, { FunctionComponent } from "react"

export const Table: FunctionComponent<{
  caption: string
  headingData: Array<string>
  rowData: Array<Array<string>>
  border?: boolean
  className?: string
}> = ({ caption, headingData = [], rowData = [], border = true, className = "" }) => {
  return (
    <table className={className}>
      <caption className="sr-only text-left">{caption}</caption>
      <thead>
        <tr className={border ? "border-neutral-light border-b border-solid" : ""}>
          {headingData &&
            headingData.length &&
            headingData.map((columnHeader) => (
              <th key={columnHeader} scope="col" className="pt-2 pr-8 pb-2 pl-0">
                <p className="mb-0 font-bold">{columnHeader}</p>
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {rowData.map((row) => {
          const [rowHeader, ...rowsData] = row
          return (
            <tr key={rowHeader} className={border ? "border-neutral-light border-b border-solid" : ""}>
              <th scope="row" className={`pr-8 pl-0 ${border ? "py-2" : ""}`}>
                <p className="mb-0">{rowHeader}</p>
              </th>
              {rowsData &&
                rowsData.length &&
                rowsData.map((cellData) => (
                  <td key={cellData} className={`pr-8 pl-0 ${border ? "py-2" : ""}`}>
                    <p className="mb-0">{cellData}</p>
                  </td>
                ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
