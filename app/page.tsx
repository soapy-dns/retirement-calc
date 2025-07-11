"use client"

import { AppPath } from "@/app//ui/types"
import { LinkButton, LinkType } from "./ui/components/common/LinkButton"
import { AppBanner } from "@/app/ui/AppBanner"
import "./styles.css"
import { Features } from "@/app/ui/components/splash/features/Features"
import { SpreadsheetExamplesCard } from "./ui/components/splash/SpreadsheetExampleCard"
import { ChartsExampleCard } from "./ui/components/splash/ChartsExampleCard"
import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { useDebouncedCallback } from "use-debounce"
import { Container } from "./ui/components/Container"

const mainText = "Worried how you'll manage in retirement?"
const subText = "Work out how long your assets and income will last."

export default function SplashPage() {
  const startNowRef = useRef<HTMLAnchorElement>(null)
  const [offset, setOffset] = useState(0)

  // limit the amount of state updates
  const debounceUpdateOffset = useDebouncedCallback(() => setOffset(window.scrollY), 250)

  useEffect(() => {
    // NOTE: this might not really be a good idea for accessibility
    if (startNowRef?.current !== null) {
      startNowRef.current.focus()
    }

    // when the window is scrolled a certain amount, show the start now button at the bottom.
    // TODO: maybe need to check the original button in off the screen.
    // TODO: this has got to be super inefficient.
    const onScroll = () => {
      debounceUpdateOffset()
    }
    // clean up code
    window.removeEventListener("scroll", onScroll)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // const displayClass = offset > 100 ? "block" : "hidden"
  const offsetCheckAmount = 200

  const displayClass = clsx({
    "transition-all duration-1000 fixed ": true,
    "right-10": offset > offsetCheckAmount,
    "-right-52": offset <= offsetCheckAmount
  })

  return (
    <div>
      {/* <div
      className="relative h-full w-full bg-cover  bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `url(/images/deckchairsLarge.jpg)`
        // backgroundImage: `url(https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80%27)`
      }}
    > */}
      <div className="relative top-0 left-0 z-50 mb-4 inline-block min-w-full">
        <AppBanner />
      </div>

      <div className="bg-primary text-white -skew-y-4 relative -top-36 -mb-8">
        <div className="px-12 pt-44 pb-12 text-center skew-y-4">
          <h1 className="font-semibold text-4xl">{mainText}</h1>
          <p className="text-lg">{subText}</p>
        </div>
      </div>
      <Container>
        <p>
          By adding details of your assets and income, and using some configurable assumptions we can project the values
          forward to give you an idea of how long your assets may last.
        </p>

        <p>The results can be viewed as charts or as a spreadsheet.</p>

        <div className="mx-4">
          <div className="relative z-1 text-gray-700 ">
            <div className="flex justify-center my-8 z-10">
              <div className="w-1/2 md:w-1/4">
                <LinkButton ref={startNowRef} href={AppPath.config} linkType={LinkType.primary}>
                  <div className="text-xl text-center">Start now!</div>
                </LinkButton>
              </div>
            </div>

            <div className={`fixed bottom-4  flex z-10 ${displayClass}`}>
              <div className="w-48">
                <LinkButton href={AppPath.config} linkType={LinkType.primary}>
                  <div className="text-xl text-center">Start now!</div>
                </LinkButton>
              </div>
            </div>

            <Features />

            <SpreadsheetExamplesCard />

            <ChartsExampleCard />
          </div>
        </div>
      </Container>
    </div>
  )
}
