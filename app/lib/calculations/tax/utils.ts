import { AssetIncome, EarningsTax, Tax } from "../assets/types"
import { BandedTaxCalc } from "./taxCalcs/BandedTaxCalc"
import { Transfer, Country } from "../../data/schema/config"
import { Asset } from "../assets/Asset"
import { AssetGroup, BasicYearData, InflationContext, YearsTaxData } from "../types"
import { removeUnusedHistoryFromTaxes } from "./removeUnusedHistoryFromTaxes"

export const getOwnersTaxableIncomeAmt = (incomeFromAssets: AssetIncome[], owner: string, year: number) => {
  const ownersTaxableIncomeFromAssets = incomeFromAssets.filter(
    (assetIncome) => assetIncome.owner === owner && assetIncome.percOfIncomeTaxable > 0
  )

  const ownersTaxableIncomeFromAssetsAmt = ownersTaxableIncomeFromAssets.reduce((accum, assetIncome) => {
    const yearData = assetIncome.history.find((it) => it.year === year)

    return yearData ? accum + (yearData.value * assetIncome.percOfIncomeTaxable) / 100 : 0
  }, 0)

  return ownersTaxableIncomeFromAssetsAmt
}

/**
 * Note drawdowns are really just transfers
 * transfers for year can be drawdowns
 *
 * TODO, rather than passing the scenario for the asset config, maybe add relevant info to the asset object?
 */
export const getTaxableDrawdownAmt = (
  // scenario: IScenario,
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
        taxableIncomeAmt: 0,
        taxableDrawdownsAmt: 0,
        taxableAutomatedDrawdownAmt: 0
      })
    })
  })

  return taxes
}

export const getTaxesRows = (
  taxes: Tax[] | EarningsTax[],
  finalYear: number,
  taxName: string
): Record<string, BasicYearData[] | YearsTaxData[]> => {
  const cleanedTaxes = removeUnusedHistoryFromTaxes(taxes, finalYear)
  return cleanedTaxes.reduce(
    (accum, tax: Tax | EarningsTax) => {
      const key: string = `${taxName} (${tax.owner})`
      accum[key] = tax.history
      return accum
    },
    {} as Record<string, BasicYearData[] | YearsTaxData[]>
  )
}

export const initEarningsTaxes = (yearRange: number[], owners: string[]): EarningsTax[] => {
  const earningsTaxes = owners.map((owner) => ({
    owner,
    history: []
  }))

  earningsTaxes.forEach((tax: EarningsTax) => {
    yearRange.forEach((year: number) => {
      tax.history.push({
        year,
        value: 0
      })
    })
  })

  return earningsTaxes
}

export const calculateTaxes = (
  taxes: Tax[], // TODO: maybe we create and return?
  year: number,
  assets: Asset[],
  owners: string[],
  incomeTaxCalculator: BandedTaxCalc,
  incomeFromAssets: AssetIncome[],
  manualTransfersForYear: Transfer[]
) => {
  owners.forEach((owner: string) => {
    const tax = taxes.find((it) => it.owner === owner)
    if (!tax) throw new Error(`tax object not foound for ${owner}`)
    const manualTaxableDrawdownAmt = getTaxableDrawdownAmt(manualTransfersForYear, owner, assets)

    const ownersTaxableIncomeAmt = getOwnersTaxableIncomeAmt(incomeFromAssets, owner, year)

    const ownersTotalTaxableAmt = ownersTaxableIncomeAmt + manualTaxableDrawdownAmt
    console.log(
      "--ownersTotalTaxableAmt, ownersTaxableIncomeAmt, manualTaxableDrawdownAmt--",
      ownersTotalTaxableAmt,
      ownersTaxableIncomeAmt,
      manualTaxableDrawdownAmt
    )

    const ownersTaxAmt = incomeTaxCalculator.getTax(ownersTotalTaxableAmt, year)

    const taxHistory = tax.history.find((it) => it.year === year)
    if (!taxHistory) throw new Error(`No history found for ${owner} in ${year}`)

    taxHistory.totalTaxableAmt = Math.round(ownersTotalTaxableAmt)
    taxHistory.taxableIncomeAmt = Math.round(ownersTaxableIncomeAmt)
    taxHistory.taxableDrawdownsAmt = Math.round(manualTaxableDrawdownAmt)

    taxHistory.value = ownersTaxAmt
  }) // END OF TAX CALCS
}

// TODO: this function to Asset?
export const getPercDrawdownTaxable = (taxResident: Country, assetCountry: Country = "AU", assetClass: AssetGroup) => {
  if (taxResident === "SC" && assetCountry === "SC" && assetClass === AssetGroup.super) {
    return 75
  } else if (taxResident === assetCountry || assetClass !== AssetGroup.super) {
    return 0
  }
  return 100
}

export const isIndexedDefinedBenefit = (
  taxResident: Country,
  assetCountry: Country = "AU",
  isStatePension: boolean
): boolean => {
  if (taxResident === "AU" && assetCountry === "SC" && isStatePension) {
    return false
  } else {
    return true
  }
}

// TODO: this function to Asset?
export const getPercIncomeTaxable = (taxResident: Country, assetCountry: Country = "AU", assetClass: AssetGroup) => {
  // maybe for things like ISAs?
  if (taxResident === assetCountry && assetClass === AssetGroup.income_defined_benefit) {
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
