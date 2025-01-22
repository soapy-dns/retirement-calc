// The actual values could be default, with options to override - as per other things in context.
export const stressTestOptions = [
  {
    label: "None applied",
    value: "NONE",
    summary: "No stress test applied to the scenario.  Only add stress tests once your scenario is complete."
  },
  {
    label: "Lower Returns",
    value: "LOWER_RETURNS",
    summary: "Assuming 1% lower returns on equities."
  },
  {
    label: "Market Crash",
    value: "MARKET_CRASH",
    summary: "Assuming a 20% drop in equity values."
  },
  {
    label: "Property crash",
    value: "PROPERTY_CRASH",
    summary: "Assuming property values drop by 10%."
  }
  // { label: "Exchange Rate", value: "EXCHANGE_RATE", summary: "Assuming a 10% drop in the exchange rate." }
  // }
  // {
  //   label: "Care Required",
  //   value: "CARE_REQUIRED",
  //   summary: "Assuming some sort of nursing care is required starting 2 years before your expected death."
  // },
  // { label: "Exchange Rate", value: "EXCHANGE_RATE", summary: "Assuming a 10% drop in the exchange rate." }
]
