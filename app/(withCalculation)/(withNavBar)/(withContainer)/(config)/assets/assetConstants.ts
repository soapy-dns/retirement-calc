export const assetConstants = {
  NAME: {
    LABEL: "Name",
    HELP_TEXT: "A short name for the asset to help you identify it throughout the application."
  },
  COUNTRY: {
    LABEL: "Country of asset",
    HELP_TEXT: "The country the asset is in (defaults to Australia)."
  },
  EARNINGS_BUCKET: {
    LABEL: "Earnings to be accumulated in this asset?",
    HELP_TEXT:
      "Earnings from other assets are accumulated here - perhaps this should be outside individual assets as only 1 can be active."
  },
  PREFERRED_MIN_AMT: {
    LABEL: "Maintain minimum (optional)",
    HELP_TEXT:
      "The minimum amount to maintain in an asset if possible.  Defaults to 0. If there aren't enough total assets this value will be ignored.  This is useful for banks where you might want to keep some cash handy for rainy days."
  },
  CAN_DRAWDOWN: {
    LABEL: "Can drawdown.",
    HELP_TEXT:
      "This defines whether or not we can drawdown the value of an asset. By drawing down on an asset we mean removing value from it to pay expenses. This allows the system automatically transfer to the 'Earning bucket' asset."
  },
  OWNERS: {
    LABEL: "Owners.",
    HELP_TEXT: "List of owners for this asset.  All owners are assumed to own equal proportions."
  },
  CLASS: {
    LABEL: "Asset class.",
    HELP_TEXT: "Defines the type of asset."
  },

  VALUE: {
    LABEL: "Initial value.",
    HELP_TEXT: "The value of the asset at the start of the term."
  },
  INCOME: {
    LABEL: "Income",
    HELP_TEXT: "The gross (prior to tax) income amount per year.  This is assumed to increase in line with inflation."
  },
  DESCRIPTION: {
    LABEL: "Description",
    HELP_TEXT: "A meaningful description of the asset."
  },
  PROPERTY_IS_RENTED: {
    LABEL: "Property is rented out?",
    HELP_TEXT: "If the property is rented out, then expected rental details should be added."
  },
  PROPERTY_RENTAL_INCOME: {
    LABEL: "Rental income (monthly)",
    HELP_TEXT:
      "The gross monthly rental for the property.  This will be in today's money and will increase in line with inflation."
  },
  PROPERTY_RENTAL_EXPENSES: {
    LABEL: "Property expenses (monthly)",
    HELP_TEXT:
      "All the expenses associated with the property on a monthly basis.  This will be in today's money and will increase in line with inflation."
  },
  RATE_VARIATION: {
    LABEL: "Rate variation % (optional)",
    HELP_TEXT:
      "Rate variation from that defined in the config section.  Eg if the rate of return for super is 5%, and the variation here is 2%, then this asset will have a rate of return of 7%.  For income assets, the income will increase by the inflation rate plus this value. Defaults to 0%"
  },
  DRAWDOWN_ORDER: {
    LABEL: "Drawdown order",
    HELP_TEXT:
      "Specifies the order to automatically drawdown on if required.  For example if some assets need to be sold (drawndown) to cover expenses.  If there are multiple assets with the same order the drawdown will be split equally amoungst them.  Note: 'drawdown order' does not have any effect unless the 'can drawdown' flag is set."
  },

  DRAWDOWN_FROM: {
    LABEL: "Drawdown start year if not immediately (optional)",
    HELP_TEXT:
      "This value is optional and will default to the current year.  The year we can start drawing down on this asset.  For example we might not want to start drawing down on super until age 60 when the tax benefits kick in.  If this is not entered, it will be assumed that drawing down on the asset is fine from the start."
  },
  INCOME_START_YEAR: {
    LABEL: "Year the income starts if not immediately (optional)",
    HELP_TEXT:
      "The year the income stream begins.  If there is no value, the income will be taken as being available immediately.  It is currently only possible to have 1 income period."
  },
  INCOME_END_YEAR: {
    LABEL: "Year income ends if it doesn't continue indefinitely (optional)",
    HELP_TEXT:
      "The year the income will end.  eg on retirement.  If there is no value, the income is assumed to continue indefinitely - eg a defined benefits pension."
  },
  RENTAL_START_YEAR: {
    LABEL: "Rental start year (optional)",
    HELP_TEXT:
      "The year the rental begins.  If there is no value, it is assumed to start immediately.  It is currently only possible to have 1 rental period."
  },
  RENTAL_END_YEAR: {
    LABEL: "Rental end year (optional)",
    HELP_TEXT:
      "The year the rental will end.  No value means the rental will continue indefinitely, or until the property ceases to exist in your portfolio e.g. it is sold."
  }
}
