import { InflationDisplay } from "./InflationDisplay"
import { LivingExpensesDisplay } from "./LivingExpensesDisplay"
import { OwnersDisplay } from "./OwnersDisplay"
import { BankAuDisplay } from "./bank/BankAuDisplay"
import { SuperAuDisplay } from "./super/SuperAuDisplay"
import { SharesDisplay } from "./shares/SharesDisplay"
import { PropertyDisplay } from "./property/PropertyDisplay"
import { GeneralContextDisplay } from "./GeneralContextDisplay"
import { GenericModal } from "@/app/ui/components/modals/GenericModal"
import { useState } from "react"
import InflationRateInfo from "@/docs/info/context/InflationRateInfo.mdx"
import LivingExpensesInfo from "@/docs/info/context/LivingExpensesInfo.mdx"
import TaxAndCurrencyInfo from "@/docs/info/context/TaxAndCurrencyInfo.mdx"

enum InfoType {
  "NONE",
  "TAX_AND_CURRENCY",
  "LIVING_EXPENSES",
  "INFLATION"
}
export const ContextTab: React.FC = () => {
  const [infoToggle, setInfoToggle] = useState<InfoType>(InfoType.NONE)

  return (
    <>
      <p className="mx-4">
        The operating environment <span className="text-primary-foreground">(context)</span> for the calculations e.g.
        inflation, living expenses, rates of return etc
      </p>

      <GeneralContextDisplay
        showInfo={() => {
          setInfoToggle(InfoType.TAX_AND_CURRENCY)
        }}
      />

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

      <GenericModal
        showModal={infoToggle === InfoType.INFLATION}
        heading="Inflation"
        handleCancel={() => {
          setInfoToggle(InfoType.NONE)
        }}
      >
        <InflationRateInfo />
      </GenericModal>

      <GenericModal
        showModal={infoToggle === InfoType.LIVING_EXPENSES}
        heading="Living expenses"
        handleCancel={() => {
          setInfoToggle(InfoType.NONE)
        }}
      >
        <LivingExpensesInfo />
      </GenericModal>

      <GenericModal
        showModal={infoToggle === InfoType.TAX_AND_CURRENCY}
        heading="Tax and currency"
        handleCancel={() => {
          setInfoToggle(InfoType.NONE)
        }}
      >
        <TaxAndCurrencyInfo />
      </GenericModal>
    </>
  )
}
