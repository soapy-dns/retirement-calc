export const transferConstants = {
  YEAR: {
    LABEL: "Year of the transfer",
    HELP_TEXT: "The year the transfer should occur in.  Obviously this should be this year or a future year."
  },
  FROM: {
    LABEL: "From",
    HELP_TEXT: "The asset the funds should come from"
  },
  TO: {
    LABEL: "To",
    HELP_TEXT: "The asset the funds should go to"
  },
  MIGRATE_ALL: {
    LABEL: "Migrate all funds",
    HELP_TEXT: "Tick to migrate all the funds in the asset at that point in time."
  },
  TRANSFER_PERCENT: {
    LABEL: "Percentage to transfer",
    HELP_TEXT:
      "The percentage of the asset's worth (at transfer time, and minus fees) that will be transfered.  This is likely to be 100%"
  },
  TRANSFER_COST_TYPE: {
    LABEL: "Transfer cost type.",
    HELP_TEXT:
      "The method used to calculate the transfer cost.  If you know the amount in today's money, calculate the percentage of the today's asset value, and use the 'Percentage' option."
  },
  TRANSFER_COST_PERCENT: {
    LABEL: "Transfer cost percentage",
    HELP_TEXT:
      "The percentage of the asset's worth required to pay for fees involved in the transfer eg brokerage or realty fees."
  },
  TRANSFER_COST_TODAYS_MONEY: {
    LABEL: "Transfer cost value (fixed amount in today's money)",
    HELP_TEXT:
      "The amount in today's money required to pay any fees involved in the transfer eg brokerage or realty fees."
  },
  TRANSFER_COST_FUTURE_MONEY: {
    LABEL: "Transfer cost value (fixed amount at the time of the transaction)",
    HELP_TEXT:
      "The amount at the time of the transaction required to pay any fees involved in the transfer eg brokerage or realty fees."
  }
}
