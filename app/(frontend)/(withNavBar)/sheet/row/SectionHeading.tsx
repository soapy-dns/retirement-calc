import { InfoButton } from "@/app/ui/components/common/accordian/InfoButton"

interface IRow {
  text: string
  onToggle?: () => void
}

/*
This is the heading for a section.
*/
export const SectionHeading = ({ text, onToggle }: IRow) => {
  return (
    <tr className="hover:bg-muted bg-white">
      <td className="flex items-center gap-2 py-2 px-4 font-bold text-lg text-primary-foreground  md:first:sticky md:first:left-0 max-w-48 ">
        {text}
        {onToggle && <InfoButton showInfo={onToggle} />}
      </td>
    </tr>
  )
}
