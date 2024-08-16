import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

interface IAccordianItem {
  //   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  heading: string
  content: React.ReactNode
  defaultOpen?: boolean
}

export const AccordionItem: React.FC<IAccordianItem> = (props: IAccordianItem) => {
  const { heading, content, defaultOpen } = props

  const [open, setOpen] = useState<boolean>(defaultOpen || false)

  const toggleItem = () => setOpen(!open)

  return (
    <div className="rounded-t-lg border-b border-neutral-200 bg-white">
      <button
        className="flex w-full flex-row justify-between text-primary-foreground"
        type="button"
        onClick={toggleItem}
      >
        <h2>{heading}</h2>
        {open ? <ChevronUpIcon className="h-6 w-6" /> : <ChevronDownIcon className="h-6 w-6" />}
      </button>
      {open ? <div className="px-5">{content}</div> : null}
    </div>
  )
}
