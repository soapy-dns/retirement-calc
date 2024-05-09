import React from "react"
import { GenericModal, IGenericModalProps } from "./GenericModal"
import { ButtonGroup } from "../common/ButtonGroup"
import { Button, ButtonType } from "../common/Button"

interface Props extends Omit<IGenericModalProps, "children" | "heading"> {
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>
}

// FIXME:
export const ChangesNotSavedModal: React.FC<Props> = ({ showModal, handleCancel, handleSubmit }) => {
  const onCancel = () => {
    handleCancel()
  }

  return (
    <GenericModal
      showModal={showModal}
      heading="Changes not saved!"
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
    >
      You&apos;re changes will not be saved.
      <ButtonGroup>
        <Button onClick={handleSubmit} buttonType={ButtonType.primary}>
          Continue anyway
        </Button>
        <Button onClick={onCancel} buttonType={ButtonType.secondary}>
          Back to changes
        </Button>
      </ButtonGroup>
    </GenericModal>
  )
}
