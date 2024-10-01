interface IHeaderCell {
  year: number
  yearIndex: number
}
export const Cell = ({ year, yearIndex }: IHeaderCell) => {
  return (
    <th scope="row" className="py-4 px-6 text-left text-xs font-extrabold  tracking-wider text-gray-900 max-w-48">
      {year}
      <div className="font-normal ">Year {yearIndex}</div>
    </th>
  )
}
