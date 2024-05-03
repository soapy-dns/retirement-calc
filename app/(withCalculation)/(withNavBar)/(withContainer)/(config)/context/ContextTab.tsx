import { InflationDisplay } from "./InflationDisplay"
import { LivingExpensesDisplay } from "./LivingExpensesDisplay"
import { OwnersDisplay } from "./OwnersDisplay"
import { BankAuDisplay } from "./bank/BankAuDisplay"
import { SuperAuDisplay } from "./super/SuperAuDisplay"
import { SharesDisplay } from "./shares/SharesDisplay"
import { PropertyDisplay } from "./property/PropertyDisplay"
import { DefinedBenefitsAuDisplay } from "./definedBenefits/DefinedBenefitsAuDisplay"
import { GeneralContextDisplay } from "./GeneralContextDisplay"
import { GenericModal } from "@/app/ui/components/GenericModal"
import { NodeNextRequest } from "next/dist/server/base-http/node"
import { useState } from "react"

enum InfoType {
  "NONE",
  "LIVING_EXPENSES",
  "INFLATION"
}
export const ContextTab: React.FC = () => {
  const [infoToggle, setInfoToggle] = useState<InfoType>(InfoType.NONE)

  return (
    <>
      <p className="mx-4">
        The operating environment <span className="text-primary">(context)</span> for the calculations e.g. inflation,
        living expenses, rates of return etc
      </p>

      <GeneralContextDisplay />

      <OwnersDisplay />

      <InflationDisplay
        showInfo={() => {
          setInfoToggle(InfoType.INFLATION)
        }}
      />

      <LivingExpensesDisplay
        showInfo={() => {
          setInfoToggle(InfoType.LIVING_EXPENSES)
        }}
      />

      <BankAuDisplay />

      <SuperAuDisplay />

      <SharesDisplay />

      <PropertyDisplay />

      <DefinedBenefitsAuDisplay />

      <GenericModal
        showModal={infoToggle === InfoType.INFLATION}
        heading="Inflation"
        handleCancel={() => {
          setInfoToggle(InfoType.NONE)
        }}
      >
        <p>This is an estimate of the on going inflation rate.</p>
        <p>A reasonable long term estimate could be about 2.5%. However, there are often fluctuations.</p>

        <p>
          In order to &apos;future proof&apos; yourself, you may want to have a higher inflation at the beginning of
          your retirement, slowly moving towards the mean. This is because a higher inflation rate at the beginning of
          the term could have a long term negative impact. It&apos;s up to you! You can play about with different rates
          to see the affect of each.
        </p>
      </GenericModal>

      <GenericModal
        showModal={infoToggle === InfoType.LIVING_EXPENSES}
        heading="Living expenses"
        handleCancel={() => {
          setInfoToggle(InfoType.NONE)
        }}
      >
        <p>This is an estimate of your future living expenses in today&apos;s money.</p>
        <p>
          To estimate this, a good place to start is to use your expenses over the previous year, and assume that
          you&apos;ll spend the same going forward. Living expenses are always assumed to increase with inflation -
          because they will.
        </p>

        <p>
          Many retirees spend more money at the beginning of retirement, and less in later years when they may be less
          active. The &apos;standard&apos; seems to be to lower your expenses at age 75, but you can configure your
          future expenses as and how you wish.
        </p>
      </GenericModal>
    </>
  )
}
