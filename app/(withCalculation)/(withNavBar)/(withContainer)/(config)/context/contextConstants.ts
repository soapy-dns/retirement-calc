type ItemProps = {
  LABEL: string
  HELP_TEXT?: string
}
export const contextConstants: Record<string, ItemProps> = {
  TAX_RESIDENCY: {
    LABEL: "Tax Residency",
    HELP_TEXT: "The country you live in for tax (there are no partial years)"
  },
  AU_2_UK_EXCHANGE_RATE: {
    LABEL: "Australian to UK exchange rate",
    HELP_TEXT:
      "The rate for converting AUD to GBP.  This value is required for tax calculations if necessary (to adjust the tax bands). This will become more generic at some future date."
  },
  CURRENCY: {
    LABEL: "Currency being used",
    HELP_TEXT:
      "The currency being used.  Note: this is across all assets irrespective of the country the asset is from.  This is important when the currency is different from the currency of the tax residence."
  },
  STARTING_YEAR: {
    LABEL: "Starting year",
    HELP_TEXT: "The starting year.  This is just for display use."
  },
  LIVING_EXPENSES: {
    LABEL: "Living expenses",
    HELP_TEXT: "x"
  },
  MAX_YEARS: {
    LABEL: "Max years",
    HELP_TEXT:
      "The maximum number of years to do calculations for.  This is probably only of use for debugging.  Without there is a maximum number of years enforced (for the unlikely event that your investments make more income than you spend)"
  },
  INFLATION: {
    LABEL: "Inflation",
    HELP_TEXT:
      "Specified inflation.  The inflation for subsequent years will be the same unless there is a new value configured."
  },
  ASSET_OWNERS: {
    LABEL: "Asset owners",
    HELP_TEXT: "All the owners that own assets"
  },
  CASH_INTEREST_RATE: {
    LABEL: "Interest percentage",
    HELP_TEXT:
      "The interest percentage applied to all 'CASH' type assets.  At the moment it is not possible to override this on a per asset basis"
  },
  SUPER_INVESTMENT_RETURN: {
    LABEL: "Investment return",
    HELP_TEXT: "The average forecast return on investment"
  },
  SUPER_TAXATION_RATE: {
    LABEL: "Taxation rate",
    HELP_TEXT: "This is the rate at which income to super (including investment income *Check*) is taxed."
  },
  PROPERTY_GROWTH_RATE: {
    LABEL: "Property growth rate",
    HELP_TEXT: "The average rate that property is expected to increase by per year"
  },
  RENTAL_INCOME_PER_MONTH: {
    LABEL: "Rental income per month",
    HELP_TEXT: "The expected gross income per month. (eg no taxes, management fees etc)"
  },
  RENTAL_EXPENSES_PER_MONTH: {
    LABEL: "Rental expenses per month",
    HELP_TEXT: "The expected expenses per month. (management fees, maintenance, but not taxes)"
  },
  DEFINED_BENEFITS_INDEXATION: {
    LABEL: "Indexation",
    HELP_TEXT: "The indexation percentage that the income increases by per year"
  },
  SHARES_GROWTH: {
    LABEL: "Growth",
    HELP_TEXT: "The percentage that shares grow by per year"
  },
  SHARES_INCOME: {
    LABEL: "Income",
    HELP_TEXT: "The income per year as a percentage of the share value"
  },
  USE_INFLATION_RATE: {
    LABEL: "Indexed in line with inflation",
    HELP_TEXT:
      "If 'Yes', then the inflation rate (for the year) will be used, otherwise an indexation rate will need to be defined and that value will be applied to all years"
  },
  FROM_YEAR: {
    LABEL: "From year",
    HELP_TEXT: "Year the rate will take affect from. This rate will continue until the next (if any) year entered."
  },
  RATE: {
    LABEL: "Rate",
    HELP_TEXT: "The rate (not the %)"
  }
}
