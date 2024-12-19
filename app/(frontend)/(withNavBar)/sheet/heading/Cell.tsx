interface IHeaderCell {
  year: number
  // yearIndex: number
}
export const HeadingCell = ({ year }: IHeaderCell) => {
  return (
    <th scope="col" className="py-4 px-6 text-left text-xs font-extrabold  tracking-wider text-gray-900 max-w-48">
      {year}
    </th>
  )
}
