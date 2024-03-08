import { InformationCircleIcon } from "@heroicons/react/24/outline"

interface IRow {
  text: string
  onToggle?: () => void
}

export const HeadingRow = ({ text, onToggle }: IRow) => {
  return (
    <tr className="hover:bg-gray-100 bg-white">
      <td className="flex items-center gap-2 py-2 px-4 font-bold  text-primary md:first:sticky md:first:left-0">
        {text}
        {onToggle && (
          <button onClick={onToggle}>
            <InformationCircleIcon className=" h-5 w-5" />
          </button>
        )}
      </td>
    </tr>
  )
}
