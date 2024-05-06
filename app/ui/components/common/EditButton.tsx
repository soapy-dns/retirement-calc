import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { Button, ButtonType } from "./Button"

interface Props {
  onClick: () => void
}
export const EditButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button buttonType={ButtonType.tertiary} onClick={onClick}>
      <div className="flex items-center gap-2">
        <PencilSquareIcon className="mx-2 h-6 w-6" /> <div className="text-base">Edit</div>
      </div>
    </Button>
  )
}
