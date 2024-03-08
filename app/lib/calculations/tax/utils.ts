import { Earning, Tax } from "../assets/types"
import { IncomeTaxCalc } from "./taxCalcs/incomeTaxCalc"
import { getScenarioTransfersForYear } from "../transfers/transferUtils"
import { IScenario, Transfer, Country } from "../../data/schema/config"
import { Asset } from "../assets/Asset"
import { AssetClass, InflationContext } from "../types"

export const getOwnersTaxableEarningsAmt = (earningsFromAssets: Earning[], owner: string, year: number) => {
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
export const getTaxableDrawdownAmt = (
  scenario: IScenario,
  transfersForYear: Transfer[],
  owner: string,
  assets: Asset[]
): number => {
  if (!transfersForYear) return 0

  const taxableDrawdownAmt = transfersForYear?.reduce((accum, transfer) => {
    const { from, value = 0 } = transfer

    const matchingAsset = assets.find((asset) => {
      return asset.id === from
    })

    if (!matchingAsset) return accum

    //  drawdowns are not taxed unless in a different country
    const { assetOwners } = matchingAsset || {}

    if (assetOwners.includes(owner)) {
      const increment = (value * matchingAsset.percOfDrawdownTaxable) / 100 / assetOwners.length
      return accum + increment
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
  taxes: Tax[], // TODO: maybe we create and return?
  assets: Asset[]
) => {
  const manualTransfersForYear = getScenarioTransfersForYear(scenario, year)

  owners.forEach((owner: string) => {
    const tax = taxes.find((it) => it.owner === owner)
    if (!tax) throw new Error(`tax object not foound for ${owner}`)
    const manualTaxableDrawdownAmt = getTaxableDrawdownAmt(scenario, manualTransfersForYear, owner, assets)

    const ownersTaxableEarningsAmt = getOwnersTaxableEarningsAmt(earningsFromAssets, owner, year)

    const ownersTotalTaxableAmt = ownersTaxableEarningsAmt + manualTaxableDrawdownAmt
    // console.log(
    //   "--ownersTotalTaxableAmt, ownersTaxableEarningsAmt, manualTaxableDrawdownAmt--",
    //   ownersTotalTaxableAmt,
    //   ownersTaxableEarningsAmt,
    //   manualTaxableDrawdownAmt
    // )

    const ownersTaxAmt = incomeTaxCalculator.getTax(ownersTotalTaxableAmt, year)

    const taxHistory = tax.history.find((it) => it.year === year)
    if (!taxHistory) throw new Error(`No history found for ${owner} in ${year}`)

    taxHistory.totalTaxableAmt = Math.round(ownersTotalTaxableAmt)
    taxHistory.taxableEarningsAmt = Math.round(ownersTaxableEarningsAmt)
    taxHistory.taxableDrawdownsAmt = Math.round(manualTaxableDrawdownAmt)

    taxHistory.value = ownersTaxAmt
  }) // END OF TAX CALCS
}

// TODO: this function to Asset?
export const getPercDrawdownTaxable = (taxResident: Country, assetCountry: Country = "AU", assetClass: AssetClass) => {
  if (taxResident === "SC" && assetCountry === "SC" && assetClass === AssetClass.super) {
    return 75
  } else if (taxResident === assetCountry || assetClass !== AssetClass.super) {
    return 0
  }
  return 100
}

// TODO: this function to Asset?
export const getPercIncomeTaxable = (taxResident: Country, assetCountry: Country = "AU", assetClass: AssetClass) => {
  // maybe for things like ISAs?
  if (taxResident === assetCountry && assetClass === AssetClass.income_defined_benefit) {
    return 0
  }
  return 100
}

export const getIncomeInTodaysMoney = (
  income: number,
  year: number,
  currencyConversionFactor: number,
  inflationContext?: InflationContext
) => {
  const incomeCorrectedByCurrencyConversion = income * currencyConversionFactor

  const inflationFactor = inflationContext && inflationContext[year] ? inflationContext[year].factor : 1

  return { incomeInTodaysMoney: incomeCorrectedByCurrencyConversion / inflationFactor, inflationFactor }
}
