import { Earning, Tax } from "../assets/types"
import { getAssetWithMatchingName } from "../assets/assetUtils"
import { IncomeTaxCalc } from "./taxCalcs/incomeTaxCalc"
import { getScenarioTransfersForYear } from "../transfers/transferUtils"
import { IScenario } from "../../data/types"
import { Transfer } from "../transfers/types"

export const getOwnersTaxableEarningsAmt = (earningsFromAssets: Earning[], owner: string, year: number) => {
  // total income from the owner's assets
  // FIXME: The problem is the total joint income === 0
  const ownersTaxableEarningsFromAssets = earningsFromAssets.filter(
    (earning) => earning.owner === owner && earning.percOfEarningsTaxable > 0
  )

  // console.log("--ownersTaxableEarningsFromAssets--", ownersTaxableEarningsFromAssets)
  const ownersTaxableEarningsFromAssetsAmt = ownersTaxableEarningsFromAssets.reduce((accum, earning) => {
    const yearData = earning.history.find((it) => it.year === year)

    return yearData ? accum + (yearData.value * earning.percOfEarningsTaxable) / 100 : 0
  }, 0)

  return ownersTaxableEarningsFromAssetsAmt
}

/**
 * Note drawdowns are really just transfers
 * transfers for year can be drawdowns
 *
 * TODO, rather than passing the scenario for the asset config, maybe add relevant info to the asset object?
 */
export const getTaxableDrawdownAmt = (scenario: IScenario, transfersForYear: Transfer[], owner: string): number => {
  if (!transfersForYear) return 0

  const taxableDrawdownAmt = transfersForYear?.reduce((accum, transfer) => {
    const { from, value = 0 } = transfer

    const matchingAssetData = getAssetWithMatchingName(scenario, from)

    if (!matchingAssetData) return accum

    // TODO: defaulting percOfEarningsTaxable here seems messy
    const { assetOwners, percOfEarningsTaxable = 100 } = matchingAssetData || {}
    if (assetOwners.includes(owner)) {
      return (((accum + value) / assetOwners.length) * percOfEarningsTaxable) / 100
    }
    return accum
  }, 0)

  return Math.round(taxableDrawdownAmt)
}

export const initTaxes = (yearRange: number[], owners: string[]): Tax[] => {
  const taxes = owners.map((owner) => ({
    owner,
    history: []
  }))

  taxes.forEach((tax: Tax) => {
    yearRange.forEach((year: number) => {
      tax.history.push({
        year,
        value: 0,
        totalTaxableAmt: 0,
        taxableEarningsAmt: 0,
        taxableDrawdownsAmt: 0,
        taxableAutomatedDrawdownAmt: 0
      })
    })
  })

  return taxes
}

export const calculateTaxes = (
  scenario: IScenario,
  year: number,
  owners: string[],
  incomeTaxCalculator: IncomeTaxCalc,
  earningsFromAssets: Earning[],
  taxes: Tax[] // TODO: maybe we create and return?
) => {
  const manualTransfersForYear = getScenarioTransfersForYear(scenario, year)

  owners.forEach((owner: string) => {
    const tax = taxes.find((it) => it.owner === owner)
    if (!tax) throw new Error(`tax object not foound for ${owner}`)
    const manualTaxableDrawdownAmt = getTaxableDrawdownAmt(scenario, manualTransfersForYear, owner)

    const ownersTaxableEarningsAmt = getOwnersTaxableEarningsAmt(earningsFromAssets, owner, year)

    const ownersTotalTaxableAmt = ownersTaxableEarningsAmt + manualTaxableDrawdownAmt

    const ownersTaxAmt = incomeTaxCalculator.getTax(ownersTotalTaxableAmt)

    const taxHistory = tax.history.find((it) => it.year === year)
    if (!taxHistory) throw new Error(`No history found for ${owner} in ${year}`)

    taxHistory.totalTaxableAmt = Math.round(ownersTotalTaxableAmt)
    taxHistory.taxableEarningsAmt = Math.round(ownersTaxableEarningsAmt)
    taxHistory.taxableDrawdownsAmt = Math.round(manualTaxableDrawdownAmt)

    taxHistory.value = ownersTaxAmt
  }) // END OF TAX CALCS
}
