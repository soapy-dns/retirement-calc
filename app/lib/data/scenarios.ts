import { IAsset, IScenario } from "./schema/config"
export const scenarios: IScenario[] = [
  {
    id: "A",
    name: "Multi-country example",
    description: "Complex example.",
    assets: [
      {
        id: "HIS_AU_SUPER",
        name: "Australian super",
        description: "Australian super - defined contributions",
        country: "AU",
        className: "AuSuper",
        value: 500000,
        assetOwners: ["Him"],
        // incomeProducing: false,
        canDrawdown: true,
        drawdownFrom: 2026,
        drawdownOrder: 50
        // // drawdownTaxed: false,
        // // percOfEarningsTaxable: 0
      },
      {
        id: "HER_AU_DEFINED_BENEFIT",
        name: "Final salary",
        description: "Australian super - defined benefits",
        country: "AU",
        className: "AuDefinedBenefits",
        value: 0,
        income: 3000, // this isn't the pot, but the guaranteed return value in the first year
        assetOwners: ["Her"]
        // // percOfEarningsTaxable: 0
      },
      {
        id: "HER_AU_SUPER",
        name: "Her AU super",
        description: "Australian super - defined contributions",
        country: "AU",
        className: "AuSuper",
        value: 300000,
        assetOwners: ["Her"],
        // incomeProducing: false,
        canDrawdown: true,
        drawdownOrder: 50
        // percOfEarningsTaxable: 0
      },
      {
        id: "HIS_UK_SUPER",
        name: "His Uk pension",
        description: "UK super - defined contributions",
        country: "AU",
        className: "AuSuper",
        value: 100000,
        assetOwners: ["Him"],
        canDrawdown: true,
        drawdownFrom: 2026,
        drawdownOrder: 50
      },
      {
        id: "HER_UK_SUPER",
        name: "Her Uk pension",
        description: "UK super - defined benefits",
        country: "SC",
        className: "AuDefinedBenefits",
        value: 0,
        assetOwners: ["Her"],
        income: 1000, // this isn't the pot, but the guaranteed return value in the first year
        drawdownOrder: 50
      },
      {
        id: "JOINT_SHARES",
        name: "Joint shares",
        description: "Australian shares",
        country: "AU",
        className: "AuShares",
        value: 20000,
        assetOwners: ["Her", "Him"],
        canDrawdown: true,
        drawdownOrder: 60
      },

      {
        id: "JOINT_AU_BANK",
        name: "Joint Au bank accts",
        description: "Australian bank accounts",
        country: "AU",
        className: "AuBank",
        value: 10000,
        assetOwners: ["Her", "Him"],
        incomeBucket: true, // if this is where income goes to
        canDrawdown: true,
        preferredMinAmt: 10000,
        drawdownOrder: 20
      },
      {
        id: "JOINT_UK_BANK",
        name: "Joint UK bank accts",
        description: "UK bank accounts",
        country: "SC",
        className: "AuBank",
        value: 1000,
        assetOwners: ["Her", "Him"],
        canDrawdown: true,
        drawdownOrder: 10
      },
      {
        id: "UK_PROPERTY",
        name: "UK Property",
        description: "UK property",
        country: "SC",
        className: "AuProperty",
        value: 200000,
        assetOwners: ["Her", "Him"],
        canDrawdown: false,
        isRented: false
      },
      {
        id: "AU_PROPERTY",
        name: "Au Property",
        description: "Australian property",
        className: "AuProperty",
        country: "AU",
        value: 500000,
        assetOwners: ["Her", "Him"],
        canDrawdown: false,
        isRented: true,
        rentalIncomePerMonth: 600,
        rentalExpensesPerMonth: 150
      }
    ],
    context: {
      taxResident: "AU",
      // au2ukExchangeRate: 0.52,
      currency: "AU",
      // numOfYears: 2,
      owners: ["Him", "Her"],
      auBank: {
        interestRate: 0.005
      },

      superAu: {
        investmentReturn: 0.05, // net of fees but not taxation
        taxationRate: 0.15
      },

      definedBenefitsAu: {
        useInflationRate: true
      },
      // definedBenefitsUk: {
      //   useInflationRate: true
      // },
      sharesAu: {
        growthInterestRate: 0.03,
        dividendInterestRate: 0.03
      },

      property: {
        growthInterestRate: 0.03
      },
      inflation: [{ fromYear: 2024, inflationRate: 0.03 }],
      livingExpenses: [
        { fromYear: 2024, amountInTodaysTerms: 80000 },
        { fromYear: 2038, amountInTodaysTerms: 50000 }
      ]
    },
    transfers: [
      {
        id: "1",
        year: 2024,
        from: "UK_PROPERTY",
        to: "JOINT_SHARES",
        migrateAll: true,
        costOfTransfer: 20000 // (GBP10,000)
      }
    ]
  }
]
// See Readme for details
export const scenariosMultiple: IScenario[] = [
  {
    id: "A",
    name: "Example AU",
    description: "Complex Au example",
    assets: [
      {
        id: "HIS_AU_SUPER",
        name: "Australian super",
        description: "Australian super - defined contributions",
        country: "AU",
        className: "AuSuper",
        value: 500000,
        assetOwners: ["Him"],
        canDrawdown: true,
        drawdownFrom: 2026,
        drawdownOrder: 50
      },
      {
        id: "HER_AU_DEFINED_BENEFIT",
        name: "Final salary",
        description: "Australian super - defined benefits",
        country: "AU",
        className: "AuDefinedBenefits",
        value: 0,
        income: 5000, // this isn't the pot, but the guaranteed return value in the first year
        assetOwners: ["Her"]
      },
      {
        id: "HER_AU_SUPER",
        name: "Her AU super",
        description: "Australian super - defined contributions",
        country: "AU",
        className: "AuSuper",
        value: 500000,
        assetOwners: ["Her"],
        canDrawdown: true,
        drawdownOrder: 50
      },
      {
        id: "HIS_UK_SUPER",
        name: "His Uk pension",
        description: "UK super - defined contributions",
        country: "SC",
        className: "AuSuper",
        value: 100000,
        assetOwners: ["Him"],
        canDrawdown: true,
        drawdownFrom: 2026,
        drawdownOrder: 50
      },
      {
        id: "HER_UK_SUPER",
        name: "Her Uk pension",
        description: "UK super - defined benefits",
        country: "SC",
        className: "AuDefinedBenefits",
        value: 0,
        assetOwners: ["Her"],
        income: 1000, // this isn't the pot, but the guaranteed return value in the first year
        drawdownOrder: 50
      },
      {
        id: "JOINT_SHARES",
        name: "Joint shares",
        description: "Australian shares",
        country: "SC",
        className: "AuShares",
        value: 50000,
        assetOwners: ["Her", "Him"],
        // incomeProducing: true,
        canDrawdown: true,
        drawdownOrder: 60
      },

      {
        id: "JOINT_AU_BANK",
        name: "Joint Au bank accts",
        description: "Australian bank accounts",
        country: "AU",
        className: "AuBank",
        value: 10000,
        assetOwners: ["Her", "Him"],
        incomeBucket: true, // if this is where income goes to
        canDrawdown: true,
        preferredMinAmt: 10000,
        drawdownOrder: 20
      },
      {
        id: "JOINT_UK_BANK",
        name: "Joint UK bank accts",
        description: "UK bank accounts",
        country: "SC",
        className: "AuBank",
        value: 50000,
        assetOwners: ["Her", "Him"],
        canDrawdown: true,
        drawdownOrder: 10
      },
      {
        id: "UK_PROPERTY",
        name: "UK Property",
        description: "UK property",
        country: "SC",
        className: "AuProperty",
        value: 500000,
        assetOwners: ["Her", "Him"],
        canDrawdown: false,
        isRented: false
      },
      {
        id: "AU_PROPERTY",
        name: "Au Property",
        description: "Australian property",
        country: "AU",
        className: "AuProperty",
        value: 500000,
        assetOwners: ["Her", "Him"],
        canDrawdown: false,
        isRented: true,
        rentalIncomePerMonth: 600,
        rentalExpensesPerMonth: 100
      }
    ],
    context: {
      taxResident: "AU",
      // au2ukExchangeRate: 0.52,
      currency: "AU",

      // numOfYears: 4,
      owners: ["Him", "Her"],
      auBank: {
        interestRate: 0.005
      },

      superAu: {
        investmentReturn: 0.05, // net of fees but not taxation
        taxationRate: 0.15
      },

      definedBenefitsAu: {
        useInflationRate: true
      },
      // definedBenefitsUk: {
      //   useInflationRate: true
      // },
      sharesAu: {
        growthInterestRate: 0.03,
        dividendInterestRate: 0.03
      },

      property: {
        growthInterestRate: 0.03
        // rentPercentageOfValue: 0.025, // TODO: work out a better value

        // numOfOwners: 2,
        // rentalIncomePerMonth: 820,
        // rentalExpensesPerMonth: 100
        // rentPercentageOfValue: 0.028 // based on a value of gbp230,000.  This is indivi
      },
      inflation: [{ fromYear: 2023, inflationRate: 0.03 }],
      livingExpenses: [
        { fromYear: 2023, amountInTodaysTerms: 80000 },
        { fromYear: 2038, amountInTodaysTerms: 50000 }
      ]
    },
    transfers: [
      {
        id: "1",
        year: 2024,
        from: "UK_PROPERTY",
        to: "JOINT_SHARES",
        migrateAll: true,
        // value: 498571,
        costOfTransfer: 20000 // (GBP10,000)
      }
    ]
  },
  {
    id: "B",
    name: "Example UK",
    description: "Simple UK example",
    assets: [
      {
        id: "HIS_AU_SUPER",
        name: "HIS_AU_SUPER",
        description: "Australian super - defined contributions",
        country: "AU",
        className: "AuSuper",
        value: 500000,
        assetOwners: ["Him"],
        // incomeProducing: false,
        canDrawdown: true,
        drawdownFrom: 2026,
        drawdownOrder: 50
        // drawdownTaxed: false,
        // percOfEarningsTaxable: 100
      },
      {
        id: "HER_AU_DEFINED_BENEFIT",
        name: "HER_AU_DEFINED_BENEFIT",
        description: "Australian super - defined benefits",
        country: "AU",
        className: "AuDefinedBenefits",
        value: 0,
        income: 5000, // this isn't the pot, but the guaranteed return value in the first year
        assetOwners: ["Her"]
        // percOfEarningsTaxable: 100
      },
      {
        id: "HER_AU_SUPER",
        name: "HER_AU_SUPER",
        description: "Australian super - defined contributions",
        country: "AU",
        className: "AuSuper",
        value: 500000,
        assetOwners: ["Her"],

        // incomeProducing: false,
        canDrawdown: true,
        drawdownOrder: 50
        // drawdownTaxed: false,
        // percOfEarningsTaxable: 100
      },
      {
        id: "HIS_UK_SUPER",
        name: "HIS_UK_SUPER",
        description: "UK super - defined contributions",
        country: "SC",
        className: "AuSuper",
        value: 100000,
        assetOwners: ["Him"],
        // incomeProducing: false,
        canDrawdown: true,
        drawdownFrom: 2026,
        drawdownOrder: 50
        // drawdownTaxed: true,
        // percOfEarningsTaxable: 75
      },
      {
        id: "HER_UK_SUPER",
        name: "HER_UK_SUPER",
        description: "UK super - defined benefits",
        country: "SC",
        className: "AuDefinedBenefits",
        value: 0,
        assetOwners: ["Her"],
        income: 1000, // this isn't the pot, but the guaranteed return value in the first year
        // interestRate?: 3,
        drawdownOrder: 50
        // drawdownTaxed: true,
        // percOfEarningsTaxable: 75
      },
      {
        id: "JOINT_SHARES",
        name: "JOINT_SHARES",
        description: "Australian shares",
        country: "AU",
        className: "AuShares",
        value: 50000,
        assetOwners: ["Her", "Him"],
        // incomeProducing: true,
        canDrawdown: true,
        drawdownOrder: 60
        // drawdownTaxed: false // However there could be capital gains tax
      },

      {
        id: "JOINT_AU_BANK",
        name: "JOINT_AU_BANK",
        className: "AuBank",
        description: "Australian bank account",
        country: "AU",
        value: 10000,
        assetOwners: ["Her", "Him"],
        // incomeProducing: true,
        incomeBucket: true, // if this is where income goes to
        canDrawdown: true,
        preferredMinAmt: 10000,
        drawdownOrder: 20
        // drawdownTaxed: false
      },
      {
        id: "JOINT_UK_BANK",
        name: "JOINT_UK_BANK",
        className: "AuBank",
        description: "UK bank account",
        country: "AU",
        value: 50000,
        assetOwners: ["Her", "Him"],
        // incomeProducing: true,
        canDrawdown: true,
        drawdownOrder: 10
        // drawdownTaxed: false
      },
      {
        id: "UK_PROPERTY",
        name: "UK_PROPERTY",
        description: "UK property",
        country: "SC",
        className: "AuProperty",
        value: 500000,
        assetOwners: ["Her", "Him"],
        // incomeProducing: true,
        canDrawdown: false,
        // propertyRented: true,
        isRented: true,
        rentalIncomePerMonth: 820,
        rentalExpensesPerMonth: 100
      },
      {
        id: "AU_PROPERTY",
        name: "AU_PROPERTY",
        description: "Australian property",
        country: "AU",
        className: "AuProperty",
        value: 500000,
        assetOwners: ["Her", "Him"],
        // incomeProducing: false,
        canDrawdown: false,
        isRented: false
      }
    ],
    context: {
      taxResident: "SC",
      au2ukExchangeRate: 0.52,
      currency: "AU",

      // numOfYears: 30,
      // startingYear: 2023,
      owners: ["Him", "Her"],
      auBank: {
        interestRate: 0.005
      },
      // ukBank: {
      //   interestRate: 0.005
      // },
      superAu: {
        investmentReturn: 0.05, // net of fees but not taxation
        taxationRate: 0.15
      },
      // superUk: {
      //   // TODO: need to work out how tax works on this?
      //   investmentReturn: 0.04, // net of fees but not taxation - UK tax will need to be included in income tax
      //   taxationRate: 0
      // },
      definedBenefitsAu: {
        useInflationRate: true
        // indexationRate: 0.03
      },
      // definedBenefitsUk: {
      //   useInflationRate: true
      //   // indexationRate: 0.038841 // This is a kind of frig.  It will always return this and will always need a particular value to be removed from it
      // },
      sharesAu: {
        growthInterestRate: 0.03,
        dividendInterestRate: 0.03
      },

      property: {
        growthInterestRate: 0.03
        // rentPercentageOfValue: 0.025, // TODO: work out a better value

        // numOfOwners: 2,
        // rentalIncomePerMonth: 820,
        // rentalExpensesPerMonth: 100
        // rentPercentageOfValue: 0.028 // based on a value of gbp230,000.  This is indivi
      },
      inflation: [{ fromYear: 2023, inflationRate: 0.03 }],
      livingExpenses: [
        { fromYear: 2023, amountInTodaysTerms: 80000 },
        { fromYear: 2038, amountInTodaysTerms: 50000 }
      ]
      // livingExpenses: [
      //   { numYears: 15, amountInTodaysTerms: 80000 },
      //   { numYears: 60, amountInTodaysTerms: 50000 }
      // ]
    },
    transfers: [
      {
        id: "1",
        year: 2024,
        from: "UK_PROPERTY",
        to: "JOINT_SHARES",
        migrateAll: true,
        // value: 498571,
        costOfTransfer: 20000 // (GBP10,000)
      }
    ]
  },
  {
    id: "C",
    name: "UK money purchase pension - one individual",
    description:
      "Demonstration of UK pension for a single individual and the tax implications. The rate of return matches inflation to keep things simple.",
    assets: [
      {
        id: "1",
        name: "HIS_UK_SUPER",
        description: "UK super - defined contributions",
        country: "SC",
        className: "AuSuper",
        value: 100000,
        assetOwners: ["Him"],

        // incomeProducing: false,
        canDrawdown: true,
        // drawdownFrom: 2026,
        drawdownOrder: 50
        // drawdownTaxed: true,
        // percOfEarningsTaxable: 75
      },

      {
        id: "2",
        name: "UK_BANK",
        description: "UK bank",
        country: "SC",
        className: "AuBank",
        value: 0,
        assetOwners: ["Him"],
        // incomeProducing: true,
        incomeBucket: true, // if this is where income goes to
        canDrawdown: true,
        drawdownOrder: 10
        // drawdownTaxed: false
      }
    ],
    context: {
      taxResident: "SC",
      au2ukExchangeRate: 0.52,
      currency: "AU",

      // numOfYears: 30,
      // startingYear: 2023,
      owners: ["Him"],
      auBank: {
        interestRate: 0.005
      },
      // ukBank: {
      //   interestRate: 0.005
      // },
      superAu: {
        investmentReturn: 0.05, // net of fees but not taxation
        taxationRate: 0.15
      },
      // superUk: {
      //   // TODO: need to work out how tax works on this?
      //   investmentReturn: 0.1, // net of fees but not taxation - UK tax will need to be included in income tax
      //   taxationRate: 0
      // },
      definedBenefitsAu: {
        useInflationRate: true
        // indexationRate: 0.03
      },
      // definedBenefitsUk: {
      //   useInflationRate: true
      //   // indexationRate: 0.038841 // This is a kind of frig.  It will always return this and will always need a particular value to be removed from it
      // },
      sharesAu: {
        growthInterestRate: 0.03,
        dividendInterestRate: 0.03
      },

      property: {
        growthInterestRate: 0.03
        // rentPercentageOfValue: 0.025, // TODO: work out a better value

        // numOfOwners: 2,
        // rentalIncomePerMonth: 820,
        // rentalExpensesPerMonth: 100
        // rentPercentageOfValue: 0.028 // based on a value of gbp230,000.  This is indivi
      },
      inflation: [{ fromYear: 2023, inflationRate: 0.03 }],
      livingExpenses: [
        { fromYear: 2023, amountInTodaysTerms: 80000 },
        { fromYear: 2038, amountInTodaysTerms: 50000 }
      ]
    }
  },
  {
    id: "D",
    name: "Inflation",
    description: "A simple demonstration of inflation",
    assets: [
      {
        id: "1",
        name: "JOINT_AU_BANK",
        description: "Australian bank accounts",
        country: "AU",
        className: "AuBank",
        value: 100000,
        assetOwners: ["Her", "Him"],
        incomeBucket: true, // if this is where income goes to
        canDrawdown: true,
        drawdownOrder: 20
        // drawdownTaxed: false
      }
    ],
    context: {
      taxResident: "AU",
      au2ukExchangeRate: 0.52,
      currency: "AU",

      numOfYears: 2,
      // startingYear: 2023,
      owners: ["Him", "Her"],
      auBank: {
        interestRate: 0.01
      },
      // ukBank: {
      //   interestRate: 0.01
      // },
      superAu: {
        investmentReturn: 0.05, // net of fees but not taxation
        taxationRate: 0.15
      },
      // superUk: {
      //   // TODO: need to work out how tax works on this?
      //   investmentReturn: 0.04, // net of fees but not taxation - UK tax will need to be included in income tax
      //   taxationRate: 0
      // },
      definedBenefitsAu: {
        useInflationRate: true
        // indexationRate: 0.03
      },
      // definedBenefitsUk: {
      //   useInflationRate: true
      //   // indexationRate: 0.038841 // This is a kind of frig.  It will always return this and will always need a particular value to be removed from it
      // },
      sharesAu: {
        growthInterestRate: 0.03,
        dividendInterestRate: 0.03
      },

      property: {
        growthInterestRate: 0.03
        // rentPercentageOfValue: 0.025, // TODO: work out a better value

        // numOfOwners: 2,
        // rentalIncomePerMonth: 820,
        // rentalExpensesPerMonth: 100
        // rentPercentageOfValue: 0.028 // based on a value of gbp230,000.  This is indivi
      },

      inflation: [
        { fromYear: 2023, inflationRate: 0.1 },
        { fromYear: 2024, inflationRate: 0.07 },
        { fromYear: 2025, inflationRate: 0.05 },
        { fromYear: 2026, inflationRate: 0.03 }
      ],
      livingExpenses: [{ fromYear: 2023, amountInTodaysTerms: 10000 }]
    }
  },
  {
    id: "E",
    name: "Present value",
    description: "A simple demonstration of the present value with inflation and an asset with 0% growth",
    assets: [
      {
        id: "1",
        name: "JOINT_AU_BANK",
        description: "Australian bank accounts",
        country: "AU",
        className: "AuBank",
        value: 100000,
        assetOwners: ["Her", "Him"],
        // incomeProducing: true,
        incomeBucket: true, // if this is where income goes to
        canDrawdown: true,
        // preferredMinAmt: 10000,
        drawdownOrder: 20
        // drawdownTaxed: false
      }
    ],
    context: {
      taxResident: "AU",
      au2ukExchangeRate: 0.52,
      currency: "AU",

      // numOfYears: 2,
      // startingYear: 2023,
      owners: ["Him", "Her"],
      auBank: {
        interestRate: 0
      },
      // ukBank: {
      //   interestRate: 0
      // },
      superAu: {
        investmentReturn: 0.05, // net of fees but not taxation
        taxationRate: 0.15
      },
      // superUk: {
      //   // TODO: need to work out how tax works on this?
      //   investmentReturn: 0.04, // net of fees but not taxation - UK tax will need to be included in income tax
      //   taxationRate: 0
      // },
      definedBenefitsAu: {
        useInflationRate: true
        // indexationRate: 0.03
      },
      // definedBenefitsUk: {
      //   useInflationRate: true
      //   // indexationRate: 0.038841 // This is a kind of frig.  It will always return this and will always need a particular value to be removed from it
      // },
      sharesAu: {
        growthInterestRate: 0.03,
        dividendInterestRate: 0.03
      },

      property: {
        growthInterestRate: 0.03
      },

      inflation: [{ fromYear: 2023, inflationRate: 0.1 }],
      livingExpenses: [{ fromYear: 2023, amountInTodaysTerms: 0 }]
    }
  },
  {
    id: "F",
    name: "UK defined benefits when based in UK",
    description:
      "UK Defined benefits example based in UK.  Zero inflation, zero living expenses and zero income from bank to demonstrate the behaviour of defined benefits and the taxation behaviour.  75% of income from pensions should be taxed",
    assets: [
      {
        id: "1",
        name: "UK_BANK",
        description: "UK bank accounts with super long description to test for unforseen formatting issues.",
        country: "SC",
        className: "AuBank",
        value: 100000,
        assetOwners: ["Him"],
        // incomeProducing: true,
        incomeBucket: true, // if this is where income goes to
        canDrawdown: true,
        // preferredMinAmt: 10000,
        drawdownOrder: 20
        // drawdownTaxed: false
      },
      {
        id: "2",
        name: "UK_DEFINED_BENEFIT",
        description: "UK defined benefits",
        country: "SC",
        className: "AuDefinedBenefits",
        value: 0,
        income: 100000, // this isn't the pot, but the guaranteed return value in the first year
        assetOwners: ["Him"]
        // percOfEarningsTaxable: 75
      }
    ],
    context: {
      taxResident: "SC",
      au2ukExchangeRate: 0.52,
      currency: "AU",

      // countryOfCurrency: "UK",
      numOfYears: 5,
      // startingYear: 2023,
      owners: ["Him"],
      auBank: {
        interestRate: 0
      },
      // ukBank: {
      //   interestRate: 0
      // },
      superAu: {
        investmentReturn: 0.05, // net of fees but not taxation
        taxationRate: 0.15
      },
      // superUk: {
      //   // TODO: need to work out how tax works on this?
      //   investmentReturn: 0.04, // net of fees but not taxation - UK tax will need to be included in income tax
      //   taxationRate: 0
      // },
      definedBenefitsAu: {
        useInflationRate: true
        // indexationRate: 0.03
      },
      // definedBenefitsUk: {
      //   useInflationRate: true
      //   // indexationRate: 0.03
      // },
      sharesAu: {
        growthInterestRate: 0.03,
        dividendInterestRate: 0.03
      },
      property: {
        growthInterestRate: 0.03
      },

      inflation: [{ fromYear: 2023, inflationRate: 0.0 }],
      livingExpenses: [{ fromYear: 2023, amountInTodaysTerms: 0 }]
    }
  },
  {
    id: "G",
    name: "UK defined benefits when based in AU",
    description:
      "UK Defined benefits example based in AU.  Zero inflation, zero living expenses and zero income from bank to demonstrate the behaviour of defined benefits and the taxation behaviour. 100% of any UK income will be taxed",
    assets: [
      {
        id: "1",
        name: "UK_BANK",
        description: "UK bank accounts",
        country: "SC",
        className: "AuBank",
        value: 100000,
        assetOwners: ["Him"],
        // incomeProducing: true,
        incomeBucket: true, // if this is where income goes to
        canDrawdown: true,
        // preferredMinAmt: 10000,
        drawdownOrder: 20
        // drawdownTaxed: false
      },
      {
        id: "2",
        name: "UK_DEFINED_BENEFIT",
        description: "UK defined benefits",
        country: "SC",
        className: "AuDefinedBenefits",
        value: 0,
        income: 100000, // this isn't the pot, but the guaranteed return value in the first year
        assetOwners: ["Him"]
      }
    ],
    context: {
      taxResident: "AU",
      // numOfYears: 1,
      au2ukExchangeRate: 0.52,
      currency: "AU",
      // startingYear: 2023,
      owners: ["Him"],
      auBank: {
        interestRate: 0
      },
      // ukBank: {
      //   interestRate: 0
      // },
      superAu: {
        investmentReturn: 0.05, // net of fees but not taxation
        taxationRate: 0.15
      },
      // superUk: {
      //   // TODO: need to work out how tax works on this?
      //   investmentReturn: 0.04, // net of fees but not taxation - UK tax will need to be included in income tax
      //   taxationRate: 0
      // },
      definedBenefitsAu: {
        useInflationRate: true
        // indexationRate: 0.03
      },
      // definedBenefitsUk: {
      //   useInflationRate: true
      //   // indexationRate: 0.03
      // },
      sharesAu: {
        growthInterestRate: 0.03,
        dividendInterestRate: 0.03
      },
      property: {
        growthInterestRate: 0.03
      },

      inflation: [{ fromYear: 2023, inflationRate: 0.0 }],
      livingExpenses: [{ fromYear: 2023, amountInTodaysTerms: 0 }]
    }
  },
  {
    id: "G2",
    name: "AU defined benefits when based in UK",
    description:
      "AU Defined benefits example based in UK.  Zero inflation, and zero income from bank to demonstrate the behaviour of defined benefits and the taxation behaviour. There are living expenses to cause drawdowns on the AU super.  Income will be taxed as normal UK income whereas in AU it would be tax free.",
    assets: [
      {
        id: "1",
        name: "UK_BANK",
        description: "UK bank accounts.",
        country: "SC",
        className: "AuBank",
        value: 100000,
        assetOwners: ["Him"],
        // incomeProducing: true,
        incomeBucket: true, // if this is where income goes to
        canDrawdown: true,
        preferredMinAmt: 100000,
        drawdownOrder: 20
        // drawdownTaxed: false
      },
      {
        id: "2",
        name: "AU_DEFINED_BENEFIT",
        description: "AU defined benefits",
        country: "AU",
        className: "AuDefinedBenefits",
        value: 0,
        income: 100000, // this isn't the pot, but the guaranteed return value in the first year
        assetOwners: ["Him"],
        canDrawdown: true,
        preferredMinAmt: 100000,
        drawdownOrder: 20
        // drawdownTaxed: true,

        // percOfEarningsTaxable: 100
      }
    ],
    context: {
      taxResident: "SC",
      au2ukExchangeRate: 0.52,
      currency: "AU",

      // countryOfCurrency: "UK",
      // numOfYears: 1,
      // startingYear: 2023,
      owners: ["Him"],
      auBank: {
        interestRate: 0
      },
      // ukBank: {
      //   interestRate: 0
      // },
      superAu: {
        investmentReturn: 0.05, // net of fees but not taxation
        taxationRate: 0.15
      },
      // superUk: {
      //   // TODO: need to work out how tax works on this?
      //   investmentReturn: 0.04, // net of fees but not taxation - UK tax will need to be included in income tax
      //   taxationRate: 0
      // },
      definedBenefitsAu: {
        useInflationRate: true
        // indexationRate: 0.03
      },
      // definedBenefitsUk: {
      //   useInflationRate: true
      //   // indexationRate: 0.03
      // },
      sharesAu: {
        growthInterestRate: 0.03,
        dividendInterestRate: 0.03
      },
      property: {
        growthInterestRate: 0.03
      },

      inflation: [{ fromYear: 2023, inflationRate: 0.0 }],
      livingExpenses: [{ fromYear: 2023, amountInTodaysTerms: 50000 }]
    }
  },
  {
    id: "H",
    name: "Defined contributions when based in UK.",
    description: "AU and UK defined contributions - based in UK",
    assets: [
      {
        id: "1",
        name: "UK_BANK",
        description: "UK bank accounts",
        country: "SC",
        className: "AuBank",
        value: 100000,
        assetOwners: ["Him"],
        // incomeProducing: true,
        incomeBucket: true, // if this is where income goes to
        canDrawdown: true,
        drawdownOrder: 20
        // drawdownTaxed: false
      },
      {
        id: "2",
        name: "AU_DEFINED_CONTRIBUTIONS",
        description: "AU defined contributions",
        country: "AU",
        className: "AuSuper",
        value: 1000000,
        // income: 100000, // this isn't the pot, but the guaranteed return value in the first year
        assetOwners: ["Him"],
        canDrawdown: true,
        drawdownOrder: 10
        // percOfEarningsTaxable: 100
      },
      {
        id: "3",
        name: "UK_DEFINED_CONTRIBUTIONS",
        description: "UK defined contributions",
        country: "SC",
        className: "AuSuper",
        value: 1000000,
        // income: 100000, // this isn't the pot, but the guaranteed return value in the first year
        assetOwners: ["Him"],
        canDrawdown: true,
        drawdownOrder: 10
        // percOfEarningsTaxable: 75
      }
    ],
    context: {
      taxResident: "SC",
      au2ukExchangeRate: 0.52,
      currency: "AU",

      numOfYears: 2,
      // startingYear: 2023,
      owners: ["Him"],
      auBank: {
        interestRate: 0
      },
      // ukBank: {
      //   interestRate: 0
      // },
      superAu: {
        investmentReturn: 0.1, // net of fees but not taxation
        taxationRate: 0.15 // taxation on earnings within super
      },
      // superUk: {
      //   // TODO: need to work out how tax works on this?
      //   investmentReturn: 0.1, // net of fees but not taxation - UK tax will need to be included in income tax
      //   taxationRate: 0
      // },
      definedBenefitsAu: {
        useInflationRate: true
        // indexationRate: 0.03
      },
      // definedBenefitsUk: {
      //   useInflationRate: true
      //   // indexationRate: 0.03
      // },
      sharesAu: {
        growthInterestRate: 0.03,
        dividendInterestRate: 0.03
      },
      property: {
        growthInterestRate: 0.03
      },

      inflation: [{ fromYear: 2024, inflationRate: 0.0 }],
      livingExpenses: [{ fromYear: 2024, amountInTodaysTerms: 100000 }]
    }
  },
  {
    id: "I",
    name: "Defined contributions when based in AU",
    description: "AU and UK defined contributions - based in AU",
    assets: [
      {
        id: "UK_BANK",
        name: "UK_BANK",
        description: "UK bank accounts",
        country: "SC",
        className: "AuBank",
        value: 100000,
        assetOwners: ["Him"],
        incomeBucket: true, // if this is where income goes to
        canDrawdown: true,
        drawdownOrder: 20
      },
      {
        id: "AU_DEFINED_CONTS",
        name: "AU_DEFINED_CONTS",
        description: "AU defined contributions",
        country: "AU",
        className: "AuSuper",
        value: 1000000,
        canDrawdown: true,
        drawdownOrder: 10,
        assetOwners: ["Him"]
        // percOfEarningsTaxable: 0
      },
      {
        id: "4",
        name: "UK_DEFINED_CONTRIBUTIONS",
        description: "UK defined contributions",
        country: "SC",
        className: "AuSuper",
        value: 1000000,
        assetOwners: ["Him"],
        // percOfEarningsTaxable: 100,
        drawdownOrder: 10,
        canDrawdown: true
      }
    ],
    context: {
      taxResident: "AU",
      au2ukExchangeRate: 0.52,
      currency: "AU",

      // numOfYears: 2,
      // startingYear: 2023,
      owners: ["Him"],
      auBank: {
        interestRate: 0
      },
      // ukBank: {
      //   interestRate: 0
      // },
      superAu: {
        investmentReturn: 0.1, // net of fees but not taxation
        taxationRate: 0.15
      },
      // superUk: {
      //   // TODO: need to work out how tax works on this?
      //   investmentReturn: 0.1, // net of fees but not taxation - UK tax will need to be included in income tax
      //   taxationRate: 0
      // },
      definedBenefitsAu: {
        useInflationRate: true
        // indexationRate: 0.03
      },
      // definedBenefitsUk: {
      //   useInflationRate: true
      //   // indexationRate: 0.03
      // },
      sharesAu: {
        growthInterestRate: 0.03,
        dividendInterestRate: 0.03
      },
      property: {
        growthInterestRate: 0.03
      },

      inflation: [{ fromYear: 2023, inflationRate: 0.0 }],
      livingExpenses: [{ fromYear: 2023, amountInTodaysTerms: 100000 }]
    }
  },
  {
    id: "J",
    name: "UK Property",
    description: "UK property rented out.  High rate of income to allow for tax calculation",
    assets: [
      {
        id: "1",
        name: "UK_BANK",
        description: "UK bank account to act as income bucket",
        country: "SC",
        className: "AuBank",
        value: 50000,
        assetOwners: ["Him"],
        incomeBucket: true, // if this is where income goes to
        // incomeProducing: true,
        canDrawdown: true,
        drawdownOrder: 10
        // drawdownTaxed: false
      },
      {
        id: "2",
        name: "UK_PROPERTY",
        description: "UK property",
        country: "SC",
        className: "AuProperty",
        value: 1000000,
        assetOwners: ["Him"],

        // incomeProducing: true,
        canDrawdown: false,
        // propertyRented: true,
        isRented: true,
        rentalIncomePerMonth: 2000,
        rentalExpensesPerMonth: 100
      }
    ],
    context: {
      taxResident: "SC",
      au2ukExchangeRate: 0.52,
      currency: "AU",

      // numOfYears: 30,
      // startingYear: 2023,
      owners: ["Him"],
      auBank: {
        interestRate: 0.005
      },
      // ukBank: {
      //   interestRate: 0.0
      // },
      superAu: {
        investmentReturn: 0.05, // net of fees but not taxation
        taxationRate: 0.15
      },
      // superUk: {
      //   // TODO: need to work out how tax works on this?
      //   investmentReturn: 0.04, // net of fees but not taxation - UK tax will need to be included in income tax
      //   taxationRate: 0
      // },
      definedBenefitsAu: {
        useInflationRate: true
        // indexationRate: 0.03
      },
      // definedBenefitsUk: {
      //   useInflationRate: true
      //   // indexationRate: 0.038841 // This is a kind of frig.  It will always return this and will always need a particular value to be removed from it
      // },
      sharesAu: {
        growthInterestRate: 0.03,
        dividendInterestRate: 0.03
      },

      property: {
        growthInterestRate: 0.1
      },
      inflation: [{ fromYear: 2023, inflationRate: 0.01 }],
      livingExpenses: [
        { fromYear: 2023, amountInTodaysTerms: 0 },
        { fromYear: 2038, amountInTodaysTerms: 0 }
      ]
    }
  },
  {
    id: "K",
    name: "Transfer example",
    description: "blah",
    assets: [
      {
        id: "1",
        name: "Australian bank account1",
        description: "blah",
        country: "AU",
        className: "AuBank",
        value: 100000,
        assetOwners: ["Him"],
        // incomeProducing: true,
        incomeBucket: true, // if this is where income goes to
        canDrawdown: true,
        // preferredMinAmt: 10000,
        drawdownOrder: 20
        // drawdownTaxed: false
      },
      {
        id: "2",
        name: "Australian bank account2",
        description: "blah",
        country: "AU",
        className: "AuBank",
        value: 100000,
        assetOwners: ["Him"],
        // incomeProducing: true,
        incomeBucket: false, // if this is where income goes to
        canDrawdown: true,
        // preferredMinAmt: 10000,
        drawdownOrder: 20
        // drawdownTaxed: false
      }
    ],
    context: {
      taxResident: "AU",
      au2ukExchangeRate: 0.52,
      currency: "AU",

      numOfYears: 1,
      // startingYear: 2023,
      owners: ["Him"],
      auBank: {
        interestRate: 0
      },
      // ukBank: {
      //   interestRate: 0
      // },
      superAu: {
        investmentReturn: 0.1, // net of fees but not taxation
        taxationRate: 0.15
      },
      // superUk: {
      //   // TODO: need to work out how tax works on this?
      //   investmentReturn: 0.1, // net of fees but not taxation - UK tax will need to be included in income tax
      //   taxationRate: 0
      // },
      definedBenefitsAu: {
        useInflationRate: true
        // indexationRate: 0.03
      },
      // definedBenefitsUk: {
      //   useInflationRate: true
      //   // indexationRate: 0.03
      // },
      sharesAu: {
        growthInterestRate: 0.03,
        dividendInterestRate: 0.03
      },
      property: {
        growthInterestRate: 0.03
      },

      inflation: [{ fromYear: 2023, inflationRate: 0.0 }],
      livingExpenses: [{ fromYear: 2023, amountInTodaysTerms: 0 }]
    },
    transfers: [
      {
        id: "1",
        year: 2024,
        from: "1",
        to: "2",
        migrateAll: false,
        value: 25000,
        costOfTransfer: 20000 // (GBP10,000)
      }
    ]
  },
  {
    id: "L",
    name: "Salary example",
    description: "blah",
    assets: [
      {
        id: "1",
        name: "Australian bank account1",
        description: "blah",
        country: "AU",
        className: "AuBank",
        value: 100000,
        assetOwners: ["Him"],
        // incomeProducing: true,
        incomeBucket: true, // if this is where income goes to
        canDrawdown: true,
        // preferredMinAmt: 10000,
        drawdownOrder: 20
        // drawdownTaxed: false
      },
      {
        id: "2",
        name: "Salary income",
        description: "blah",
        country: "AU",
        className: "Salary",
        value: 0,
        income: 100000,
        assetOwners: ["Him"],
        // incomeProducing: true,
        incomeBucket: false, // if this is where income goes to
        canDrawdown: false
        // preferredMinAmt: 10000,
      }
    ],
    context: {
      taxResident: "AU",
      au2ukExchangeRate: 0.52,
      currency: "AU",

      numOfYears: 2,
      // startingYear: 2023,
      owners: ["Him"],
      auBank: {
        interestRate: 0
      },
      // ukBank: {
      //   interestRate: 0
      // },
      superAu: {
        investmentReturn: 0.1, // net of fees but not taxation
        taxationRate: 0.15
      },
      // superUk: {
      //   // TODO: need to work out how tax works on this?
      //   investmentReturn: 0.1, // net of fees but not taxation - UK tax will need to be included in income tax
      //   taxationRate: 0
      // },
      definedBenefitsAu: {
        useInflationRate: true
        // indexationRate: 0.03
      },
      // definedBenefitsUk: {
      //   useInflationRate: true
      //   // indexationRate: 0.03
      // },
      sharesAu: {
        growthInterestRate: 0.03,
        dividendInterestRate: 0.03
      },
      property: {
        growthInterestRate: 0.03
      },

      inflation: [{ fromYear: 2023, inflationRate: 0.0 }],
      livingExpenses: [{ fromYear: 2023, amountInTodaysTerms: 0 }]
    }
  }
]

export const getAssetData = (scenario: IScenario, assetName: string): IAsset | undefined => {
  const { assets } = scenario
  return assets.find((it) => it.name === assetName)
}
