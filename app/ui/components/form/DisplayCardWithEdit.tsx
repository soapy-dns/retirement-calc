import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { Card } from "../Card"
import { Button, ButtonType } from "../common/Button"
import { ReactNode } from "react"

interface DisplayCardWithEditProps {
  heading: string | ReactNode
  handleEdit?: React.MouseEventHandler<HTMLButtonElement>

  children: React.ReactNode
}
export const DisplayCardWithEdit: React.FC<DisplayCardWithEditProps> = ({ heading, handleEdit, children }) => {
  return (
    <Card>
      {typeof heading === "string" ? (
        <h2 className="flex items-center justify-between text-primary">{heading}</h2>
      ) : (
        heading
      )}

      {children}
      {handleEdit && (
        // <div className="grid grid-cols-1 md:grid-cols-4">
        //   <div className="md:col-start-2 md:col-span-2">
        <div className="mx-auto my-6 w-3/4">
          <Button buttonType={ButtonType.primary} onClick={handleEdit}>
            <div className="flex items-center justify-center gap-2">
              <PencilSquareIcon className="h-6 w-6" />
              <div>Edit</div>
            </div>
          </Button>
        </div>
        // </div>
      )}
    </Card>
  )
}
