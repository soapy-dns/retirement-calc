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
    LABEL: "Earnings bucket",
    HELP_TEXT:
      "Earnings from other assets are accumulated here - perhaps this should be outside individual assets as only 1 can be active."
  },
  PREFERRED_MIN_AMT: {
    LABEL: "Maintain minimum ",
    HELP_TEXT:
      "The minimum amount to maintain in an asset if possible.  Obviously it isn't always possible as there might not be enough total assets.  This is useful for banks where you might want to keep some cash handy for rainy days."
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
    LABEL: "Value.",
    HELP_TEXT: "The value of the asset at the start of the term."
  },
  INCOME: {
    LABEL: "Income",
    HELP_TEXT: "The income amount per year."
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
    LABEL: "Property rental income (monthly)",
    HELP_TEXT:
      "The gross monthly rental for the property.  This will be in today's money and will increase in line with inflation."
  },
  PROPERTY_RENTAL_EXPENSES: {
    LABEL: "Property expenses (monthly)",
    HELP_TEXT:
      "All the expenses associated with the property on a monthly basis.  This will be in today's money and will increase in line with inflation."
  },
  DRAWDOWN_ORDER: {
    LABEL: "Drawdown order",
    HELP_TEXT:
      "Specifies the order to automatically drawdown on if required.  For example if some assets need to be sold (drawn down) to cover expenses.  If there are multiple assets with the same order the drawdown will be split equally amoungst them.  Note: drawdownOrder does not have any effect unless the 'canDrawdown' flag is set."
  },

  DRAWDOWN_FROM: {
    LABEL: "Drawdown start year (optional)",
    HELP_TEXT:
      "This value is optional and will default to the current year.  The year we can start drawing down on this asset.  For example we might not want to start drawing down on super until age 60 when the tax benefits kick in.  If this is not entered, it will be assumed that drawing down on the asset is fine from the start."
  },
  INCOME_START_YEAR: {
    LABEL: "Income start year (optional)",
    HELP_TEXT:
      "The year the income stream begins.  If there is no value, the income will be taken as being available immediately.  It is currently only possible to have 1 income period."
  },
  INCOME_END_YEAR: {
    LABEL: "Income end year (optional)",
    HELP_TEXT:
      "The year the income will end.  eg on retirement.  If there is no value, the income is assumed to continue indefinitely."
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
