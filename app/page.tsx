"use client"

import { AppPath } from "./ui/types"
import { LinkButton, LinkType } from "./ui/components/common/LinkButton"
import { AppBanner } from "./ui/AppBanner"
import { Calculator, ChartLine, CloudOff, Flag, FlagIcon, Footprints, Save, ScrollText, Sheet } from "lucide-react"
import { SplashFeature } from "./ui/components/SplashFeature"

export default function SplashPage() {
  // min-height: 500px,

  return (
    <div>
      {/* <div
      className="relative h-full w-full bg-cover  bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `url(/images/deckchairsLarge.jpg)`
        // backgroundImage: `url(https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80%27)`
      }}
    > */}
      <div className="fixed top-0 left-0 z-50 mb-4 inline-block min-w-full">
        <AppBanner />
      </div>
      <div className="relative z-1 text-gray-700">
        <div className="px-12 pt-20 text-center">
          <h1 className="font-semibold text-4xl">Worried how you&apos;ll manage in retirement?</h1>
          <p>Work out how long your assets and income will last.</p>
        </div>
        <div className="div flex justify-center my-8">
          <div className="w-1/2 md:w-1/4">
            <LinkButton href={AppPath.config} linkType={LinkType.primary}>
              <div className="text-xl text-center">Start now!</div>
            </LinkButton>
          </div>
        </div>
        <div className={`mb-8 border-2 border-gray-300 rounded-md bg-gray-50 p-6 shadow-lg z-1 mx-12`}>
          <h2 className="text-center text-3xl font-semibold mb-8">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <SplashFeature>
              <>
                <h3 className="font-semibold text-primary-foreground">$0</h3>
                Free forever
              </>
            </SplashFeature>

            <SplashFeature>
              <>
                <Footprints className="text-primary-foreground w-6 h-6 mb-4" />
                No tracking or ads
              </>
            </SplashFeature>

            <SplashFeature>
              <>
                <ScrollText className="text-primary-foreground w-6 h-6 mb-4" />
                Compare different scenarios.
              </>
            </SplashFeature>

            <SplashFeature>
              <>
                <Flag className="text-primary-foreground w-6 h-6 mb-4" />
                Works for AU / UK.
              </>
            </SplashFeature>

            <SplashFeature>
              <>
                <CloudOff className="text-primary-foreground w-6 h-6 mb-4" />
                No data is stored.
              </>
            </SplashFeature>

            <SplashFeature>
              <>
                <ChartLine className="text-primary-foreground w-6 h-6 mb-4" />
                Charts for easier visualisation.
              </>
            </SplashFeature>
            <SplashFeature>
              <>
                <Calculator className="text-primary-foreground w-6 h-6 mb-4" />
                <div className="text-center">Calculates taxes and asset drawdowns.</div>
              </>
            </SplashFeature>

            <SplashFeature>
              <>
                <Sheet className="text-primary-foreground w-6 h-6 mb-4" />
                Spreadsheet for in-depth analysis.
              </>
            </SplashFeature>

            <SplashFeature>
              <>
                <Save className="text-primary-foreground w-6 h-6 mb-4" />
                Save re-import scenarios locally.
              </>
            </SplashFeature>
          </div>
        </div>
      </div>
    </div>
  )
}

// return (
//   <div className="fixed top-10  h-full w-full -z-1">
// <Image
//   fill={true}
//   className="object-center object-cover pointer-events-none"
//   src="/images/deckchairsLarge.jpg"
//   alt=""
// />
//     <div className="relative z-1 text-primary-foreground">
//       <div className="m-8 font-semibold text-2xl text-gray-50">
//         <p>Ever wondered if, or when, you can afford to retire.</p>
//         <p>Wonder no more!</p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-4 justify-items-center">
//         <SplashCard>
//           Works for residents of Australia and the UK with assets / income in either or both countries.
//         </SplashCard>
//         <SplashCard>Allows different scenarios to be created and compared.</SplashCard>

//         <SplashCard>Shows results in graph or spreadsheet form.</SplashCard>
//         <SplashCard>Automatically calculates taxes.</SplashCard>
//         <SplashCard>Automatically calculates asset drawdown.</SplashCard>
//         <SplashCard>Scenarios can be exported and re-imported</SplashCard>
//         <SplashCard>No tracking and no adds</SplashCard>

//         <SplashCard>No identifiable data is captured, and no data is stored remotely.</SplashCard>
//       </div>
//     </div>
//   </div>
// )
