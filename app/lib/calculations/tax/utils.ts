import { AssetIncome, EarningsTax, Tax, YearsTaxData } from "../assets/types"
import { BandedTaxCalc } from "./taxCalcs/BandedTaxCalc"
import { Transfer, Country, OwnerType, OwnersType } from "../../data/schema/config"
import { Asset } from "../assets/Asset"
import { AssetGroup, BasicYearData, InflationContext } from "../types"
import { removeUnusedHistoryFromTaxes } from "./removeUnusedHistoryFromTaxes"
import { getTaxableDrawdownAmt } from "./getTaxableDrawdownAmt"

export const getOwnersTaxableIncomeAmt = (incomeFromAssets: AssetIncome[], ownerId: string, year: number) => {
  const ownersTaxableIncomeFromAssets = incomeFromAssets.filter(
    (assetIncome) => assetIncome.ownerId === ownerId && assetIncome.percOfIncomeTaxable > 0
  )

  const ownersTaxableIncomeFromAssetsAmt = ownersTaxableIncomeFromAssets.reduce((accum, assetIncome) => {
    const yearData = assetIncome.history.find((it) => it.year === year)

    return yearData ? accum + (yearData.value * assetIncome.percOfIncomeTaxable) / 100 : 0
  }, 0)

  return ownersTaxableIncomeFromAssetsAmt
}

export const initTaxes = (yearRange: number[], owners: OwnersType): Tax[] => {
  const taxes = owners.map((owner) => ({
    ownerId: owner.identifier,
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
      const key: string = `${taxName} - ${tax.ownerId}`
      accum[key] = tax.history
      return accum
    },
    {} as Record<string, BasicYearData[] | YearsTaxData[]>
  )
}

export const initEarningsTaxes = (yearRange: number[], owners: OwnersType): EarningsTax[] => {
  const earningsTaxes = owners.map((owner) => ({
    ownerId: owner.identifier,
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
  owners: OwnersType,
  incomeTaxCalculator: BandedTaxCalc,
  incomeFromAssets: AssetIncome[],
  manualTransfersForYear: Transfer[]
) => {
  owners.forEach((owner: OwnerType) => {
    const tax = taxes.find((it) => it.ownerId === owner.identifier)
    if (!tax) throw new Error(`tax object not foound for ${owner.identifier}`)
    const taxHistory = tax.history.find((it) => it.year === year)
    if (!taxHistory) throw new Error(`No history found for ${owner.identifier} in ${year}`)

    const manualTaxableDrawdownAmt = getTaxableDrawdownAmt(manualTransfersForYear, owner.identifier, assets)

    const ownersTaxableIncomeAmt = getOwnersTaxableIncomeAmt(incomeFromAssets, owner.identifier, year)

    const ownersTotalTaxableAmt = ownersTaxableIncomeAmt + manualTaxableDrawdownAmt

    const { taxAmt: ownersTaxAmt } = incomeTaxCalculator.getTax(ownersTotalTaxableAmt, year)

    // if (year === 2024 && owner.ownerName === "Neil") {
    //   const taxDetails = { ownersTotalTaxableAmt, ownersTaxableIncomeAmt, manualTaxableDrawdownAmt, ownersTaxAmt }
    //   console.log("--taxDetails - Neil 2024--", taxDetails)
    // }
    taxHistory.totalTaxableAmt = Math.round(ownersTotalTaxableAmt)
    taxHistory.taxableIncomeAmt = Math.round(ownersTaxableIncomeAmt)
    taxHistory.taxableDrawdownsAmt = Math.round(manualTaxableDrawdownAmt)

    taxHistory.value = ownersTaxAmt
  }) // END OF TAX CALCS
}

// // TODO: this function to Asset?
// // TODO: I think this isn't quite right.  It should also be based on config if possible.
// export const getPercentageOfDrawdownTaxable = (taxResident: Country, assetCountry: Country = "AU", assetClass: AssetGroup) => {
//   if (taxResident === "SC" && assetCountry === "SC" && assetClass === AssetGroup.super) {
//     return 75
//   } else if (taxResident === assetCountry || assetClass !== AssetGroup.super) {
//     return 0
//   }
//   return 100
// }

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

  // const inflationFactor = inflationContext && inflationContext[year] ? inflationContext[year].factor : 1

  const inflationFactor = inflationContext && inflationContext[year - 1] ? inflationContext[year - 1].factor : 1

  return { incomeInTodaysMoney: incomeCorrectedByCurrencyConversion / inflationFactor, inflationFactor }
}
