"use client"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { Container } from "@/app/ui/components/Container"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

export default function Drawdowns() {
  const { calculationResults } = useContext(ScenarioContext)
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <Container>
      <div className="flex flex-col items-center text-primary">
        <Button onClick={handleBack} buttonType={ButtonType.secondary}>
          <div className="flex items-center gap-2">
            <ChevronDoubleLeftIcon className="h-4 w-4" />
            <div>Back</div>
          </div>
        </Button>
      </div>
      <pre>{JSON.stringify(calculationResults?.drawDownRowData, null, 4)}</pre>
    </Container>
  )
}
