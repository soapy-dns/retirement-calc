import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { MouseEventHandler } from "react"

interface Props {
  showInfo: MouseEventHandler<HTMLButtonElement>
}

export const InfoButton: React.FC<Props> = ({ showInfo }) => {
  return (
    <button onClick={showInfo} className="focus:outline focus:outline-2 focus:outline-primary">
      <InformationCircleIcon className="w-6 h-6 " />
    </button>
  )
}
