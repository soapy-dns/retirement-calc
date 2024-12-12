import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { ButtonGroup } from "@/app/ui/components/common/ButtonGroup"
import { Container } from "@/app/ui/components/Container"
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

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
  // TODO: can this be refactored to include the ChangesNotSavedModal
  return (
    <main>
      <Container>
        <div className="flex flex-col items-center text-primary-foreground ">
          <Button onClick={handleBack} buttonType={ButtonType.tertiary}>
            <div className="flex items-center gap-2">
              <ChevronDoubleLeftIcon className="h-6 w-6" />
              <div>{backText}</div>
            </div>
          </Button>
          <h1 className="mt-4">{heading}</h1>
        </div>

        <div className="mb-8">{children}</div>

        <ButtonGroup>
          <Button onClick={handleSubmit} buttonType={ButtonType.primary}>
            {saveText}
          </Button>
          <Button onClick={handleCancel} buttonType={ButtonType.secondary}>
            {cancelText}
          </Button>
        </ButtonGroup>
      </Container>
    </main>
  )
}

export default EditPageLayout
