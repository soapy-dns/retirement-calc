import React from "react"
import { GenericModal } from "./GenericModal"
// import { ButtonGroup } from "../common/ButtonGroup"
import { IScenario } from "@/app/lib/data/schema/config"

import { Button, ButtonSize, ButtonType } from "@/app/ui/components/common/Button"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"

import { Label } from "@/app/ui/components/common/Label"
import { ChangeEvent, useContext, useState, useEffect } from "react"

enum ButtonStatus {
  disabled,
  busy,
  active
}

export interface Props {
  showModal: boolean
  handleCancel: () => void
}

export const FileImportModal: React.FC<Props> = ({ showModal, handleCancel }) => {
  const [selectedFile, setSelectedFile] = useState<File>()
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.disabled)
  const { importScenarios } = useContext(ScenarioContext)

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0])
    }

    setButtonStatus(ButtonStatus.active)
  }

  const handleOnClick = async (): Promise<void> => {
    console.log(">>>handleOnClick")
    setButtonStatus(ButtonStatus.busy)

    if (selectedFile) {
      const data = await selectedFile.text()
      console.log(">>>importScenarios data", data)
      try {
        const scenarios: IScenario[] = JSON.parse(data)

        // this updates the context which will trigger a re-render.
        await importScenarios(scenarios)

        handleCancel()

        setButtonStatus(ButtonStatus.disabled)
      } catch (e) {
        console.log(">>>error importing file", e)
        setButtonStatus(ButtonStatus.disabled)

        throw new Error("Error importing file")
      }
    } else {
      console.log(">>>no file selected")
    }
  }

  return (
    <GenericModal showModal={showModal} heading="Import a scenario." handleCancel={handleCancel}>
      <div className="flex flex-col items-center">
        <form>
          <div className="flex flex-col justify-center mb-8">
            <Label className="mb-2" htmlFor="file">
              Select a local file to import
            </Label>
            <input
              id="file"
              accept="application/json"
              // className="border-2 file:bg-primary file:border-0 file:text-white ml-4"
              className={`ml-4 border-2 focus:outline focus:outline-primary-foreground file:bg-primary  file:py-2 file:px-4 file:text-white `}
              name="scenarioFile"
              type="file"
              onChange={changeHandler}
            />
          </div>
          <Button
            onClick={handleOnClick}
            buttonType={ButtonType.primary}
            size={ButtonSize.full}
            disabled={buttonStatus === ButtonStatus.busy || buttonStatus === ButtonStatus.disabled}
          >
            <div className=" flex items-center justify-center gap-2">
              {buttonStatus === ButtonStatus.busy ? <div>Loading...</div> : <div>Upload</div>}
            </div>
          </Button>
        </form>
      </div>
    </GenericModal>
  )
}
