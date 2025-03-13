import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { Button, ButtonSize, ButtonType } from "./Button"
import { ButtonGroup } from "./ButtonGroup"
import { TrashIcon } from "lucide-react"

interface Props {
  handleEdit?: () => void
  handleRemove?: () => void
  disableRemove?: boolean
}

export const ButtonGroupEditRemove: React.FC<Props> = ({ handleEdit, handleRemove, disableRemove }) => {
  return (
    <ButtonGroup>
      {handleEdit && (
        <Button buttonType={ButtonType.primary} onClick={handleEdit}>
          <div className="flex items-center gap-2">
            <PencilSquareIcon className="h-6 w-6" />
            <div>Edit</div>
          </div>
        </Button>
      )}

      {handleRemove && (
        <Button buttonType={ButtonType.secondary} onClick={handleRemove} disabled={disableRemove || false}>
          <div className="flex items-center gap-2">
            <TrashIcon className="h-6 w-6" />
            <div>Remove</div>
          </div>
        </Button>
      )}
    </ButtonGroup>
  )
}
