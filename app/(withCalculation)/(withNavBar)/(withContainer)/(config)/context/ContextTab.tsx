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
      <p className="mx-4">
        The operating environment for the calculations e.g. inflation, living expenses, rates of return etc
      </p>

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
