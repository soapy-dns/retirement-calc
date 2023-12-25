export const assetConstants = {
  NAME: {
    LABEL: "Asset name",
    HELP_TEXT: "A short name for the asset to help you identify it throughout the application."
  },
  EARNINGS_BUCKET: {
    LABEL: "Earnings bucket",
    HELP_TEXT:
      "Earnings from other assets are accumulated here - perhaps this should be outside individual assets as only 1 can be active."
  },
  PREFERRED_MIN_AMT: {
    LABEL: "Maintain minimum amount.",
    HELP_TEXT:
      "The amount we'd prefer to maintain in an asset.  This is useful for banks where you might want to keep some cash handy for rainy days."
  },
  PERCENTAGE_OF_EARNINGS_TAXED: {
    LABEL: "Percentage of earnings which will be taxed",
    HELP_TEXT:
      "Usually the earnings will either be fully taxed (100%) or not at all (0%).  However one example where this is not the case, is for pension income from the UK when based in the UK (currently 25% tax free as of 2023).  Also Au super when resident in Au will have a value of zero, but when resident in the UK would be 100%"
  },
  CAN_DRAWDOWN: {
    LABEL: "Can drawdown",
    HELP_TEXT:
      "This defines whether or not we can drawdown the value of an asset. By drawing down on an asset we mean removing value from it to pay expenses. This allows the system automatically transfer to the 'Earning bucket' asset."
  },
  OWNERS: {
    LABEL: "Owners",
    HELP_TEXT: "List of owners for this asset.  All owners are assumed to own equal proportions."
  },
  CLASS: {
    LABEL: "Asset class",
    HELP_TEXT: "Defines the type of asset."
  },

  VALUE: {
    LABEL: "Value",
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
    LABEL: "Is property rented out?",
    HELP_TEXT: "If the property is rented out will need to add the expected income and expenses for that."
  },
  PROPERTY_RENTAL_INCOME: {
    LABEL: "Property rental income (monthly)",
    HELP_TEXT:
      "The gross monthly rental for the property.  This will be at the start of the term and will be assumed to increase in line with inflation."
  },
  PROPERTY_RENTAL_EXPENSES: {
    LABEL: "Property expenses (monthly)",
    HELP_TEXT:
      "All the expenses associated with the property on a monthly basis.  This will be at the start of the term and will be assumed to increase in line with inflation."
  },
  DRAWDOWN_ORDER: {
    LABEL: "Drawdown order",
    HELP_TEXT:
      "Specifies the order to automatically drawdown on if required.  For example if some assets need to be sold (drawn down) to cover expenses.  If there are multiple assets with the same order the drawdown will be split equally amoungst them.  Note: drawdownOrder does not have any effect unless the 'canDrawdown' flag is set."
  },
  DRAWDOWN_FROM: {
    LABEL: "Possible drawdown commencement year",
    HELP_TEXT:
      "The year we can start drawing down on this asset (if required).  For example we might not want to start drawing down on super until age 60 when the tax benefits kick in.  If this is not entered, it will be assumed that drawing down on the asset is fine from the start."
  },
  INCOME_END_YEAR: {
    LABEL: "Income end year",
    HELP_TEXT: "The year the income will end.  eg on retiremnt.  Without a date it is assumed it will never end"
  }
}
