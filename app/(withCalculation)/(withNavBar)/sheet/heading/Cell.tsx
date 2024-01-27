interface IHeaderCell {
  value: string
  index: number
}
export const Cell = ({ value, index }: IHeaderCell) => {
  return (
    <th scope="row" className="py-4 px-6 text-left text-xs font-extrabold  tracking-wider text-gray-900 ">
      {value}
      <div className="font-normal ">Year {index - 1}</div>
    </th>
  )
}
