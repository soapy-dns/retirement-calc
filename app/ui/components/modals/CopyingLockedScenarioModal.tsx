import React from "react"
import { GenericModal } from "./GenericModal"
import { ButtonGroup } from "../common/ButtonGroup"
import { Button, ButtonType } from "../common/Button"

export interface Props {
  showModal: boolean
  handleCancel: () => void
  continueAnyway: () => void
}

export const CopyingLockedScenarioModal: React.FC<Props> = ({ showModal, handleCancel, continueAnyway }) => {
  const onCancel = () => {
    handleCancel()
  }

  return (
    <GenericModal
      showModal={showModal}
      heading="You are copying a historical scenario"
      handleCancel={handleCancel}
      handleSubmit={continueAnyway}
    >
      You are trying to copy a historical scenario. Any dates in the past will be updated to this year. Any historical
      transfers will be removed. No context or assets will be updated. You will need to do this manually.
      <ButtonGroup>
        <Button onClick={continueAnyway} buttonType={ButtonType.primary}>
          Continue copying
        </Button>
        <Button onClick={onCancel} buttonType={ButtonType.secondary}>
          Cancel
        </Button>
      </ButtonGroup>
    </GenericModal>
  )
}
