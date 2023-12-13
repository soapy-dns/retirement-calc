import { InflationDisplay } from "./InflationDisplay"
import { LivingExpensesDisplay } from "./LivingExpensesDisplay"
import { OwnersDisplay } from "./OwnersDisplay"
import { BankAuDisplay } from "./bank/BankAuDisplay"
import { SuperAuDisplay } from "./super/SuperAuDisplay"
import { SharesDisplay } from "./shares/SharesDisplay"
import { PropertyDisplay } from "./property/PropertyDisplay"
import { DefinedBenefitsAuDisplay } from "./definedBenefits/DefinedBenefitsAuDisplay"
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
