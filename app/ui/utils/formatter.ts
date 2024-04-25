import { Country } from "@/app/lib/data/schema/config"

const currencyFormatterAu = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
})

const currencyFormatterUk = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",

  maximumFractionDigits: 0
})

export const getCurrencyFormatter = (country: Country) => {
  switch (country) {
    case "AU":
      return currencyFormatterAu

    case "SC":
      return currencyFormatterUk

    default:
      return currencyFormatterAu
  }
}

export const numberFormatter = new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 })

// export const numberFormatter = new Intl.NumberFormat("en-AU", {
//   style: "number",
//   maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
// })
