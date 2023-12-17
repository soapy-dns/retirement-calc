"use client"
import { ChevronDoubleRightIcon, Cog8ToothIcon } from "@heroicons/react/24/outline"

import { Container } from "@/app/ui/components/Container"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import Link from "next/link"
import { AppPath } from "@/app/ui/types"

export default function About() {
  const navigation = useNavigation()

  return (
    <Container>
      <div className="flex flex-col items-start">
        <h1 className="text-primary">About this calculator</h1>

        <p>
          This calculator is work in progress. It is designed to help <span className="italic font-semibold">me</span>{" "}
          to prepare for retirement, but it might give others some insight into how long their assets (capital and
          income) are likely last.
        </p>

        <p>
          The calculations are based on a starting position and some assumptions as to how the future will look. It will
          currently work only for Australian or Scottish residents. I offer no guarantee that the calculations are
          correct.{" "}
        </p>

        <p>
          What I don&apos;t like about other calculators is the opaqueness of the calculations, their drive to harvest
          your details, and the difficulty in comparing different scenarios.
        </p>

        <p>This app does not collect any details which can identify you, and no data is stored.</p>

        <p>
          The app is already set up with some default configuration. This can be adjusted as required. It is also
          possible to save your scenarios (on your own computer) for further use.
        </p>

        <Link href={AppPath.config}>
          <div className="mx-4 px-4 py-1 flex flex items-center justify-center hover:bg-primary-darker border-primary bg-primary text-white gap-2 rounded-full">
            Get started <ChevronDoubleRightIcon className="ml-2 h-6 w-6" />
          </div>
        </Link>
      </div>
    </Container>
  )
}
