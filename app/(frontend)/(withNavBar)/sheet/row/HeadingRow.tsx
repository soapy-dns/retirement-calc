import { InfoButton } from "@/app/ui/components/common/accordian/InfoButton"

interface IRow {
  text: string
  onToggle?: () => void
}

/*
TODO: change name of this.  This is the left hand 'heading' row.
*/
export const HeadingRow = ({ text, onToggle }: IRow) => {
  return (
    <tr className="hover:bg-accent bg-white">
      <td className="flex items-center gap-2 py-2 px-4 font-bold text-lg text-primary-foreground md:first:sticky md:first:left-0 max-w-48 ">
        {text}
        {onToggle && <InfoButton showInfo={onToggle} />}
      </td>
    </tr>
  )
}
