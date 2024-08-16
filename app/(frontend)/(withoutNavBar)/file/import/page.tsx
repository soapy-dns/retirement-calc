"use client"
import { IScenario } from "@/app/lib/data/schema/config"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useContext } from "react"

import { useState } from "react"

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

enum ButtonStatus {
  disabled,
  busy,
  active
}

export default function ImportPage() {
  const [selectedFile, setSelectedFile] = useState<File>()
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.disabled)
  const { importScenarios } = useContext(ScenarioContext)
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0])
    }

    setButtonStatus(ButtonStatus.active)
  }

  const handleOnClick = async (): Promise<void> => {
    setButtonStatus(ButtonStatus.busy)

    // await sleep(1)

    if (selectedFile) {
      const data = await selectedFile.text()
      try {
        const scenarios: IScenario[] = JSON.parse(data)

        await importScenarios(scenarios)
      } catch (e) {
        throw new Error("Error importing file")
      }
    }
    setButtonStatus(ButtonStatus.disabled)
    // navigation.goTo(AppPath.config)
    navigation.goBack()
  }

  return (
    <div className="flex flex-col items-center">
      <Button onClick={handleBack} buttonType={ButtonType.tertiary}>
        <div className="flex items-center gap-2 text-primary-foreground">
          <ChevronDoubleLeftIcon className="h-6 w-6" />
          <div>Back</div>
        </div>
      </Button>
      <h1 className="text-primary-foreground">Import a scenario file</h1>
      <form>
        <div className="flex flex-col justify-center">
          <input
            id="file"
            accept="application/json"
            className="border-2 file:bg-primary file:border-0 file:text-white"
            name="scenarioFile"
            type="file"
            onChange={changeHandler}
          />

          <Button
            onClick={handleOnClick}
            buttonType={ButtonType.primary}
            disabled={buttonStatus === ButtonStatus.busy || buttonStatus === ButtonStatus.disabled}
          >
            <div className=" flex items-center justify-center gap-2">
              {buttonStatus === ButtonStatus.busy ? <div>Loading...</div> : <div>Upload</div>}
            </div>
          </Button>
        </div>
      </form>
    </div>
  )
}
