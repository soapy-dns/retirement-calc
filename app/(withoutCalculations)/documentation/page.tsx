"use client"
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, Cog8ToothIcon } from "@heroicons/react/24/outline"

import { Container } from "@/app/ui/components/Container"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import Link from "next/link"
import { AppPath } from "@/app/ui/types"
import { Button, ButtonType } from "@/app/ui/components/common/Button"

export default function Documentation() {
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <div className="mt-10 py-8 ">
      <Container>
        <div className="flex flex-col items-center text-primary">
          <Button onClick={handleBack} buttonType={ButtonType.tertiary}>
            <div className="flex items-center gap-2">
              <ChevronDoubleLeftIcon className="h-6 w-6" />
              <div>Back</div>
            </div>
          </Button>
          <h1 className="text-primary">Documentation</h1>

          <p>Coming soon...</p>
          <Link href={AppPath.config}>
            <div className="mx-4 px-4 py-1 flex  gap-2 items-center justify-center hover:bg-primary-darker border-primary bg-primary text-white rounded-full">
              Go to configuration <Cog8ToothIcon className=" h-6 w-6" />
            </div>
          </Link>
        </div>
      </Container>
    </div>
  )
}
