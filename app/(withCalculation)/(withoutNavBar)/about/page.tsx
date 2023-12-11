"use client"
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline"

import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { Container } from "@/app/ui/components/Container"
import { useNavigation } from "@/app/ui/hooks/useNavigation"

export default function About() {
  const navigation = useNavigation()

  const handleBack = () => navigation.goBack()
  return (
    <Container>
      <div className="flex flex-col items-center">
        <Button onClick={handleBack} buttonType={ButtonType.secondary}>
          <div className="flex items-center gap-2">
            <ChevronDoubleLeftIcon className="h-4 w-4" />
            <div>Back</div>
          </div>
        </Button>
        <h1 className="mt-4 text-primary">About this calculator</h1>
        <p>To be completed...</p>
        <p> An asset is a resource used to hold or create economic value.</p>
      </div>
    </Container>
  )
}
