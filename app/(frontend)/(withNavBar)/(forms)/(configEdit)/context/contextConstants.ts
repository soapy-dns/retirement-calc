type ItemProps = {
  LABEL: string
  HELP_TEXT?: string
}
export const contextConstants: Record<string, ItemProps> = {
  TAX_RESIDENCY: {
    LABEL: "Tax Residency.",
    HELP_TEXT: "The country you live in for tax purposes.  There are no partial years."
  },
  AU_2_UK_EXCHANGE_RATE: {
    LABEL: "Exchange rate.",
    HELP_TEXT:
      "The exchange rate of the currency country to the tax residency country.  For example, if one British pound equals 2 dollar, then if the tax residency was Scotland and the currency AUD, the exchange rate would be 0.5.  This value is required for tax calculations."
  },
  CURRENCY: {
    LABEL: "Country of currency being used.",
    HELP_TEXT:
      "The country of the currency being used across the application.  Note: this is across all assets irrespective of the country the asset is from.  This is important when the currency is different from the currency of the tax residence."
  },
  STARTING_YEAR: {
    LABEL: "Starting year.",
    HELP_TEXT: "The starting year.  This is just for display use."
  },
  LIVING_EXPENSES: {
    LABEL: "Living expenses",
    HELP_TEXT: "Estimated living expenses in today's money."
  },
  MAX_YEARS: {
    LABEL: "Max years",
    HELP_TEXT:
      "The maximum number of years to do calculations for.  This is probably only of use for debugging.  Without there is a maximum number of years enforced (for the unlikely event that your investments make more income than you spend)"
  },
  // INFLATION: {
  //   LABEL: "Inflation",
  //   HELP_TEXT:
  //     "Specified inflation.  The inflation for subsequent years will be the same unless there is a new value configured."
  // },
  // ASSET_OWNERS: {
  //   LABEL: "Asset owners",
  //   HELP_TEXT: "All the owners that own assets"
  // },
  CASH_INTEREST_RATE: {
    LABEL: "Interest (%)",
    HELP_TEXT:
      "The interest percentage applied to all 'CASH' type assets.  When defining an asset it is possible to allow for a variation in this amount."
  },
  SUPER_INVESTMENT_RETURN: {
    LABEL: "Investment return (%)",
    HELP_TEXT: "The average forecast return on investment."
  },
  PROPERTY_GROWTH_RATE: {
    LABEL: "Property growth (%)",
    HELP_TEXT: "The average percentage that property is expected to increase by per year."
  },
  RENTAL_INCOME_PER_MONTH: {
    LABEL: "Rental income per month",
    HELP_TEXT: "The expected gross income per month. (eg no taxes, management fees etc)."
  },
  RENTAL_EXPENSES_PER_MONTH: {
    LABEL: "Rental expenses per month",
    HELP_TEXT: "The expected expenses per month. (management fees, maintenance, but not taxes)."
  },
  DEFINED_BENEFITS_INDEXATION: {
    LABEL: "Indexation",
    HELP_TEXT: "The indexation percentage that the income increases by per year."
  },
  SHARES_GROWTH: {
    LABEL: "Growth",
    HELP_TEXT: "The percentage that shares grow by per year."
  },
  SHARES_INCOME: {
    LABEL: "Income",
    HELP_TEXT: "The income per year as a percentage of the share value."
  },
  USE_INFLATION_RATE: {
    LABEL: "Indexed in line with inflation",
    HELP_TEXT: "If 'Yes', then the inflation rate will be used to determine the income."
  },
  FROM_YEAR: {
    LABEL: "From year",
    HELP_TEXT:
      "Year the value will take affect from. This value will continue until the next row by year (if any) is entered."
  },
  RATE: {
    LABEL: "Percentage",
    HELP_TEXT: "The percentage, eg 3 rather than 0.03."
  },
  OWNER_BIRTH_YEAR: {
    LABEL: "Year of birth",
    HELP_TEXT:
      "Used to improve tax calculations and help compare calculation results against a possible life expectancy."
  },
  OWNER_GENDER: {
    LABEL: "Gender",
    HELP_TEXT:
      "Used to improve tax calculations and help compare calculation results against a possible life expectancy."
  },
  OWNER_IDENTIFIER: {
    LABEL: "Name",
    HELP_TEXT:
      "Helps identify income etc on the spreadsheet.  Can be a name, nickname or anything which uniquely identifies the owner."
  }
}
