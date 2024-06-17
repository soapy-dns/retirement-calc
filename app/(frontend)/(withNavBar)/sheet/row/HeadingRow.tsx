import { InfoButton } from "@/app/ui/components/common/accordian/InfoButton"

interface IRow {
  text: string
  onToggle?: () => void
}

export const HeadingRow = ({ text, onToggle }: IRow) => {
  return (
    <tr className="hover:bg-secondary-lightest bg-white">
      <td className="flex items-center gap-2 py-2 px-4 font-bold  text-primary md:first:sticky md:first:left-0">
        {text}
        {onToggle && <InfoButton showInfo={onToggle} />}
      </td>
    </tr>
  )
}
