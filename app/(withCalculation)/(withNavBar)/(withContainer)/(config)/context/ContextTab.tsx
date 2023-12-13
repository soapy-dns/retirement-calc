import { InflationDisplay } from "./InflationDisplay"
import { LivingExpensesDisplay } from "./LivingExpensesDisplay"
import { OwnersDisplay } from "./OwnersDisplay"
import { BankAuDisplay } from "./bankAu/BankAuDisplay"
import { SuperAuDisplay } from "./superAu/SuperAuDisplay"
import { SharesDisplay } from "./shares/SharesDisplay"
import { PropertyDisplay } from "./property/PropertyDisplay"
import { DefinedBenefitsAuDisplay } from "./definedAuBenefits/DefinedBenefitsAuDisplay"
import { GeneralContextDisplay } from "./GeneralContextDisplay"

export const ContextTab: React.FC = () => {
  return (
    <>
      <GeneralContextDisplay />

      <OwnersDisplay />

      <InflationDisplay />

      <LivingExpensesDisplay />

      <BankAuDisplay />

      <SuperAuDisplay />

      <SharesDisplay />

      <PropertyDisplay />

      <DefinedBenefitsAuDisplay />
    </>
  )
}
