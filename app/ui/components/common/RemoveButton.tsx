import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Button, ButtonType } from "./Button"

interface Props {
  onClick: () => void
  disabled: boolean
}
export const RemoveButton: React.FC<Props> = ({ onClick, disabled }) => {
  return (
    <Button buttonType={ButtonType.tertiary} onClick={onClick} disabled={disabled}>
      <div className="flex gap-2">
        <TrashIcon className="h-6 w-6" />
        <div className="text-base">Remove</div>
      </div>
    </Button>
  )
}
