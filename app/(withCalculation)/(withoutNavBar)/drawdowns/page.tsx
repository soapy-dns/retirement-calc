"use client"
import { Accordion } from "@/app/ui/components/common/accordian/Accordian"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { Container } from "@/app/ui/components/Container"
import { GenericModal } from "@/app/ui/components/GenericModal"
import { HelpModalContext } from "@/app/ui/context/HelpModalProvider"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { currencyFormatter } from "@/app/ui/utils/formatter"
import { ChevronDoubleLeftIcon, ChevronRightIcon, InformationCircleIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

const HelpModalContent: React.FC = () => {
  return (
    <>
      <p>These are the drawdowns automated by the calculation, based on your configurations.</p>
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
              <ChevronDoubleLeftIcon className="h-4 w-4" />
              <div>Back</div>
            </div>
          </Button>

          <h1 className="flex gap-2">
            Drawdowns
            <button onClick={toggleHelpText}>
              <InformationCircleIcon className="h-6 w-6 " />
            </button>
          </h1>
        </div>

        <div className="flex flex-col items-center">
          {drawDownRowData &&
            drawDownRowData.map((byYear, index) => {
              return (
                <div key={index} className="mb-4">
                  <div>
                    {byYear.year} - Total drawdown: {currencyFormatter.format(byYear.value)}
                  </div>
                  {byYear.automatedDrawdowns.map((it, index) => {
                    return (
                      <div key={index} className="flex items-center">
                        {it.from}
                        <ChevronRightIcon className="w-4 h-4" />
                        {currencyFormatter.format(it.value)}
                      </div>
                    )
                  })}
                </div>
              )
            })}
        </div>
      </Container>
      <GenericModal
        showModal={showModal}
        heading="Automated drawdowns"
        content={<HelpModalContent />}
        onToggle={onHelpModalToggle}
      />
    </>
  )
}
