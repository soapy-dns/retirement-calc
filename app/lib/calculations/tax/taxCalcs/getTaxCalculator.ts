import { Country } from "@/app/lib/data/schema/config"
import { InflationContext } from "../../types"
import { BandedTaxCalc } from "./BandedTaxCalc"
import config from "@/app/lib/config.json"

export interface IGetTaxCalculator {
  taxResident: Country
  asAtYear: number
  currency: Country
  inflationContext?: InflationContext
  au2ukExchangeRate?: number
}

interface TaxRate {
  rate: number
  bandTop: number
}

interface TaxCountryDetails {
  name: string
  fromYear: number
  rates: TaxRate[]
}

type IncomeTaxDetails = Record<Country, TaxCountryDetails[]>
type EarningsTaxDetails = Partial<Record<Country, TaxCountryDetails[]>>

const { incomeTax }: { incomeTax: IncomeTaxDetails } = config
const { earningsTax }: { earningsTax: EarningsTaxDetails } = config

// TODO: change name of currency
export const getIncomeTaxCalculator = ({
  taxResident,
  asAtYear,
  currency,
  inflationContext,
  au2ukExchangeRate = 1
}: IGetTaxCalculator): BandedTaxCalc => {
  const currencyConversionFactor = taxResident !== currency ? au2ukExchangeRate ?? 1 : 1

  if (incomeTax[taxResident]) {
    const relevantTaxYearDetails = incomeTax[taxResident].findLast((taxDetails) => {
      return taxDetails.fromYear <= asAtYear
    })
    if (relevantTaxYearDetails) {
      return new BandedTaxCalc(currencyConversionFactor, relevantTaxYearDetails.rates, inflationContext)
    }
  }
  throw new Error(`No income tax config for country ${taxResident}, year ${asAtYear}`) // this shouldn't happen
}

// eg National insurance in the uk
export const getEarningsTaxCalculator = ({
  taxResident,
  asAtYear,
  currency,
  inflationContext,
  au2ukExchangeRate = 1
}: IGetTaxCalculator): BandedTaxCalc | undefined => {
  const currencyConversionFactor = taxResident !== currency ? au2ukExchangeRate ?? 1 : 1

  if (earningsTax[taxResident]) {
    const relevantTaxYearDetails = earningsTax[taxResident]?.findLast((taxDetails) => {
      return taxDetails.fromYear <= asAtYear
    })
    if (relevantTaxYearDetails) {
      return new BandedTaxCalc(currencyConversionFactor, relevantTaxYearDetails.rates, inflationContext)
    }
  }

  return
}

export const getEarningsTaxName = (taxResidentCountry: Country, asAtYear: number) => {
  if (earningsTax[taxResidentCountry]) {
    const relevantTaxYearDetails = earningsTax[taxResidentCountry]?.findLast((taxDetails) => {
      return taxDetails.fromYear < asAtYear
    })

    return relevantTaxYearDetails?.name || "Earnings Tax"
  }
}
