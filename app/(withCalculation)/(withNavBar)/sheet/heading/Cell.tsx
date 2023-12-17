interface IHeaderCell {
  value: string
  index: number
}
export const Cell = ({ value, index }: IHeaderCell) => {
  return (
    <th
      scope="col"
      className="py-4 px-6 w-1/12 text-left text-xs font-extrabold  tracking-wider text-gray-900 dark:text-gray-400"
    >
      {value}
      <div className="font-normal ">Year {index - 1}</div>
    </th>
  )
}
