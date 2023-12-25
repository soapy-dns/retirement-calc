"use client"
import { ChevronDoubleRightIcon, Cog8ToothIcon } from "@heroicons/react/24/outline"

import { Container } from "@/app/ui/components/Container"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import Link from "next/link"
import { AppPath } from "@/app/ui/types"

export default function About() {
  const navigation = useNavigation()

  return (
    <div className="mt-10 py-8 ">
      <Container>
        <div className="flex flex-col items-start">
          <h1 className="text-primary">About this calculator</h1>
          <p>
            This calculator is work in progress. It is designed to help <span className="italic font-semibold">me</span>{" "}
            to prepare financially for retirement.
          </p>
          <p>The calculations are based on:-</p>
          <ul className="list-disc mx-4 mb-4">
            <li>The value of capital assets</li>
            <li>Any income expected from defined benefit pensions / salaries etc</li>
            <li>Some assumptions on future returns, rates of inflation etc</li>
          </ul>

          <p>They will currently work only for Australian or Scottish residents since it takes taxes into account.</p>
          <p className="italic">No guarantee is given that the calculations are correct.</p>
          {/* <p>
            What I don&apos;t like about other calculators is the opaqueness of the calculations, their drive to harvest
            your details, and the difficulty in comparing different scenarios.
          </p>
          <p>This app does not collect any details which can identify you, and no data is stored.</p>
          <p>
            The app is already set up with some default configuration. This can be adjusted as required. It is also
            possible to save your scenarios (on your own computer) for further use.
          </p> */}
          <Link href={AppPath.config}>
            <div className="mx-4 px-4 py-1 flex flex items-center justify-center hover:bg-primary-darker border-primary bg-primary text-white gap-2 rounded-full">
              Get started <ChevronDoubleRightIcon className="ml-2 h-6 w-6" />
            </div>
          </Link>
        </div>
      </Container>
    </div>
  )
}
