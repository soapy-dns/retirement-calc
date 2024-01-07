import { InformationCircleIcon } from "@heroicons/react/24/outline"

interface IRow {
  text: string
  onToggle?: () => void
}

export const HeadingRow = ({ text, onToggle }: IRow) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="flex items-center gap-2 py-2 px-4 font-bold bg-white text-primary first:sticky first:left-0">
        <div>{text}</div>
        {onToggle && (
          <button onClick={onToggle}>
            <InformationCircleIcon className=" h-5 w-5" />
          </button>
        )}
      </td>
    </tr>
  )
}
