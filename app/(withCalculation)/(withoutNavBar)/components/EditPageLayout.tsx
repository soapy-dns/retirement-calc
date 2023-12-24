import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { Container } from "@/app/ui/components/Container"
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline"

interface EditPageLayoutProps {
  heading: string
  backText: string
  cancelText: string
  saveText: string
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>
  handleBack: React.MouseEventHandler<HTMLButtonElement>
  handleCancel: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
}

export const EditPageLayout: React.FC<EditPageLayoutProps> = ({
  heading,
  backText,
  cancelText,
  saveText,
  handleSubmit,
  handleBack,
  handleCancel,
  children
}) => {
  return (
    <Container>
      <div className="flex flex-col items-center text-primary">
        <Button onClick={handleBack} buttonType={ButtonType.secondary}>
          <div className="flex items-center gap-2">
            <ChevronDoubleLeftIcon className="h-6 w-6" />
            <div>{backText}</div>
          </div>
        </Button>
        <h1 className="mt-4">{heading}</h1>
      </div>

      {children}

      <div className="grid grid-cols-1 md:grid-cols-2">
        <Button onClick={handleCancel} buttonType={ButtonType.secondary}>
          {cancelText}
        </Button>
        <Button onClick={handleSubmit} buttonType={ButtonType.primary}>
          {saveText}
        </Button>
      </div>
    </Container>
  )
}

export default EditPageLayout
