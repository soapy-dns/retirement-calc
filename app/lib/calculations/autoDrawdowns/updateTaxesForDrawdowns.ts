import { OwnerType } from "../../data/schema/config"
import { Asset } from "../assets/Asset"
import { Tax } from "../assets/types"
import { getTaxableDrawdownAmt } from "../tax/getTaxableDrawdownAmt"
import { BandedTaxCalc } from "../tax/taxCalcs/BandedTaxCalc"
import { AutomatedDrawdown } from "./types"

interface Props {
  owners: OwnerType[]
  taxes: Tax[]
  year: number
  incomeTaxCalculator: BandedTaxCalc
  assets: Asset[]
  automatedDrawdownsForYear: AutomatedDrawdown[]
}

const getTaxHistory = (taxes: Tax[], ownerId: string, year: number) => {
  const taxForOwner = taxes.find((it) => it.ownerId === ownerId)
  if (!taxForOwner) throw new Error("No tax for owner")
  const taxHistory = taxForOwner.history.find((it) => it.year === year)
  if (!taxHistory) throw new Error("No tax history")
  return taxHistory
}

export const updateTaxesForAutoDrawdowns = ({
  owners,
  taxes,
  year,
  assets,
  automatedDrawdownsForYear,
  incomeTaxCalculator
}: Props) => {
  owners.forEach((owner) => {
    const taxHistory = getTaxHistory(taxes, owner.identifier, year)

    const taxableAutomatedDrawdownAmt = getTaxableDrawdownAmt(automatedDrawdownsForYear, owner.identifier, assets)

    // This isn't right.  We are doubling. TODO:
    // const newTotalTaxableAmt =
    //   taxHistory.taxableIncomeAmt + taxHistory.taxableDrawdownsAmt + taxableAutomatedDrawdownAmt
    const newTotalTaxableAmt = taxHistory.taxableIncomeAmt + taxableAutomatedDrawdownAmt

    const { taxAmt: ownersTaxAmt } = incomeTaxCalculator.getTax(newTotalTaxableAmt, year)

    // UPDATE TAX DETAILS
    taxHistory.totalTaxableAmt = Math.round(newTotalTaxableAmt)
    taxHistory.taxableAutomatedDrawdownAmt = Math.round(taxableAutomatedDrawdownAmt)
    taxHistory.value = Math.round(ownersTaxAmt)
  })
}
