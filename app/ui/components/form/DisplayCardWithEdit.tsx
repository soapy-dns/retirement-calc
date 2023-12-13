import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { Card } from "../Card"
import { Button, ButtonType } from "../common/Button"

interface DisplayCardWithEditProps {
  heading: string
  handleEdit: React.MouseEventHandler<HTMLButtonElement>

  children: React.ReactNode
}
export const DisplayCardWithEdit: React.FC<DisplayCardWithEditProps> = ({ heading, handleEdit, children }) => {
  return (
    <Card>
      <h2 className="flex items-center justify-between text-primary">
        {heading}
        <Button buttonType={ButtonType.tertiary} onClick={handleEdit}>
          <div className="flex items-center gap-2">
            <PencilSquareIcon className="mx-2 h-4 w-4" /> <div className="text-base">Edit</div>
          </div>
        </Button>
      </h2>
      {children}
    </Card>
  )
}
