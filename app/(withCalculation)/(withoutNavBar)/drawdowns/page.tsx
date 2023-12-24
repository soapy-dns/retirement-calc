"use client"

import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { Container } from "@/app/ui/components/Container"
import { GenericModal } from "@/app/ui/components/GenericModal"
import { HelpModalContext } from "@/app/ui/context/HelpModalProvider"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { currencyFormatter } from "@/app/ui/utils/formatter"
import { ArrowLongRightIcon, ChevronDoubleLeftIcon, InformationCircleIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

const heading = "Calculated drawdowns"

const HelpModalContent: React.FC = () => {
  return (
    <>
      <p>
        These are the drawdowns from capital assets which have been calculated using the supplied configurations of
        drawdown order and drawdown start date etc.
      </p>
      <p>There is no guarantee that this is the best strategy for investment.</p>
    </>
  )
}

export default function Drawdowns() {
  const { calculationResults } = useContext(ScenarioContext)
  const { onToggle: onHelpModalToggle, showModal } = useContext(HelpModalContext)
  const { drawDownRowData } = calculationResults || {}
  const navigation = useNavigation()

  const toggleHelpText = () => {
    onHelpModalToggle()
  }

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <>
      <Container>
        <div className="flex flex-col items-center text-primary">
          <Button onClick={handleBack} buttonType={ButtonType.secondary}>
            <div className="flex items-center gap-2">
              <ChevronDoubleLeftIcon className="h-6 w-6" />
              <div>Back</div>
            </div>
          </Button>

          <h1 className="flex gap-2">
            {heading}
            <button onClick={toggleHelpText}>
              <InformationCircleIcon className="h-6 w-6 " />
            </button>
          </h1>
        </div>

        {drawDownRowData &&
          drawDownRowData.map((byYear, index) => {
            return (
              <div key={index} className="mb-4">
                <h2 className="text-primary">{byYear.year}</h2>
                {byYear.automatedDrawdowns.map((it, index) => {
                  return (
                    <div key={index} className="grid grid-cols-3">
                      <div className="">{it.from}</div>
                      <ArrowLongRightIcon className="w-6 h-6 justify-self-center" />
                      <div className="justify-self-end">{currencyFormatter.format(it.value)}</div>
                    </div>
                  )
                })}
                <div className="flex justify-end">Total drawdown:- {currencyFormatter.format(byYear.value)}</div>
              </div>
            )
          })}
      </Container>

      <GenericModal
        showModal={showModal}
        heading={heading}
        content={<HelpModalContent />}
        onToggle={onHelpModalToggle}
      />
    </>
  )
}
