import React from "react"
import { GenericModal } from "./GenericModal"
import { ButtonGroup } from "../common/ButtonGroup"
import { Button, ButtonType } from "../common/Button"

export interface Props {
  showModal: boolean
  handleCancel: () => void
  continueAnyway: () => void
}

export const ChangesNotSavedModal: React.FC<Props> = ({ showModal, handleCancel, continueAnyway }) => {
  const onCancel = () => {
    handleCancel()
  }

  return (
    <GenericModal
      showModal={showModal}
      heading="Changes not saved!"
      handleCancel={handleCancel}
      handleSubmit={continueAnyway}
    >
      <span className="font-semibold">Warning:&nbsp;</span>Any changes will not be saved.
      <ButtonGroup>
        <Button onClick={continueAnyway} buttonType={ButtonType.primary}>
          Discard changes
        </Button>
        <Button onClick={onCancel} buttonType={ButtonType.secondary}>
          Back to changes
        </Button>
      </ButtonGroup>
    </GenericModal>
  )
}
