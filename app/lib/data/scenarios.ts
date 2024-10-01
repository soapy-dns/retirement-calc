import { getCurrentYear } from "../calculations/utils/getCurrentYear"
import { IAsset, IScenario } from "./schema/config"

export const getDefaultScenarios = (): IScenario[] => {
  const currentYear = getCurrentYear()
  return [
    {
      id: "A",
      name: "Australian example",
      description: "Example with all Australian asset types",

      asAtYear: currentYear,
      assets: [
        {
          id: "JOINT_AU_BANK",
          name: "Bank account",
          description: "blah blah",
          country: "AU",
          className: "AuBank",
          value: 10000,
          assetOwners: ["HER", "HIM"],
          incomeBucket: true,
          canDrawdown: true,
          drawdown: {
            drawdownOrder: 20,
            preferredMinAmt: 10000
          }
        },
        {
          id: "HER_AU_DEFINED_BENEFIT",
          name: "Final salary pension",
          description: "Final salary pension",
          country: "AU",
          className: "AuDefinedBenefits",
          isStatePension: false,
          income: {
            incomeAmt: 10000
          },
          assetOwners: ["HER"]
        },
        {
          id: "AU_PROPERTY",
          name: "Property",
          description: "Property",
          className: "AuProperty",
          country: "AU",
          value: 500000,
          assetOwners: ["HER", "HIM"],
          property: {
            isRented: false
          }
        },
        {
          id: "JOINT_SHARES",
          name: "Shares",
          description: "Some shares",
          country: "AU",
          className: "AuShares",
          value: 20000,
          assetOwners: ["HER", "HIM"],
          canDrawdown: true,
          drawdown: {
            drawdownOrder: 50
          }
        },
        {
          id: "HIS_AU_SUPER",
          name: "Pension Pot",
          description: "Pension pot",
          country: "AU",
          className: "AuSuper",
          value: 500000,
          assetOwners: ["HIM"],
          canDrawdown: true,
          drawdown: {
            drawdownOrder: 50,
            drawdownFrom: currentYear + 2
          }
        },
        {
          name: "Salary1",
          description: "Salary",
          country: "AU",
          className: "Salary",
          assetOwners: ["HIM"],
          income: {
            incomeAmt: 100000,
            incomeEndYear: currentYear + 6
          },
          id: "7bf4c27d-9a73-49cd-9f5d-368269174f6a"
        }
      ],
      context: {
        taxResident: "AU",
        currency: "AU",
        owners: [
          { identifier: "HIM", ownerName: "Him" },
          { identifier: "HER", ownerName: "Her" }
        ],
        auBank: {
          interestRate: 0.005
        },
        superAu: {
          investmentReturn: 0.05
        },
        definedBenefitsAu: {
          useInflationRate: true
        },
        sharesAu: {
          growthInterestRate: 0.03,
          dividendInterestRate: 0.03
        },
        property: {
          growthInterestRate: 0.03
        },
        inflation: [
          {
            fromYear: currentYear,
            inflationRate: 0.04
          },
          {
            fromYear: currentYear + 1,
            inflationRate: 0.03
          }
        ],
        livingExpenses: [
          {
            fromYear: currentYear,
            amountInTodaysTerms: 80000
          },
          {
            fromYear: currentYear + 14,
            amountInTodaysTerms: 50000
          }
        ]
      },
      transfers: []
    },
    {
      id: "e0fc55d7-c55a-45fe-90fb-b9dd63a70d50",
      name: "Scottish example",
      description: "Scottish example",
      asAtYear: currentYear,
      assets: [
        {
          id: "JOINT_AU_BANK",
          name: "Bank account",
          description: "blah blah",
          country: "SC",
          className: "AuBank",
          value: 10000,
          assetOwners: ["HER", "HIM"],
          incomeBucket: true,
          canDrawdown: true,
          drawdown: {
            drawdownOrder: 20,
            preferredMinAmt: 10000
          }
        },
        {
          id: "HER_AU_DEFINED_BENEFIT",
          name: "Final salary pension",
          description: "Final salary pension",
          country: "SC",
          className: "AuDefinedBenefits",
          isStatePension: false,
          income: {
            incomeAmt: 10000
          },
          assetOwners: ["HER"]
        },
        {
          id: "AU_PROPERTY",
          name: "Property",
          description: "Property",
          className: "AuProperty",
          country: "SC",
          value: 500000,
          assetOwners: ["HER", "HIM"],
          property: {
            isRented: false
          }
        },
        {
          id: "JOINT_SHARES",
          name: "Shares",
          description: "Some shares",
          country: "SC",
          className: "AuShares",
          value: 20000,
          assetOwners: ["HER", "HIM"],
          canDrawdown: true,
          drawdown: {
            drawdownOrder: 50
          }
        },
        {
          id: "HIS_AU_SUPER",
          name: "Pension pot",
          description: "pension pot",
          country: "SC",
          className: "AuSuper",
          value: 500000,
          assetOwners: ["HIM"],
          canDrawdown: true,
          drawdown: {
            drawdownOrder: 50,
            drawdownFrom: currentYear + 2
          }
        },
        {
          name: "Salary1",
          description: "Salary",
          country: "SC",
          className: "Salary",
          assetOwners: ["HIM"],
          income: {
            incomeAmt: 100000,
            incomeEndYear: currentYear + 6
          },
          id: "7bf4c27d-9a73-49cd-9f5d-368269174f6a"
        }
      ],
      context: {
        taxResident: "SC",
        currency: "SC",
        owners: [
          { identifier: "HIM", ownerName: "Him" },
          { identifier: "HER", ownerName: "Her" }
        ],
        auBank: {
          interestRate: 0.005
        },
        superAu: {
          investmentReturn: 0.05
        },
        definedBenefitsAu: {
          useInflationRate: true
        },
        sharesAu: {
          growthInterestRate: 0.03,
          dividendInterestRate: 0.03
        },
        property: {
          growthInterestRate: 0.03
        },
        inflation: [
          {
            fromYear: currentYear,
            inflationRate: 0.04
          },
          {
            fromYear: currentYear + 1,
            inflationRate: 0.03
          }
        ],
        livingExpenses: [
          {
            fromYear: currentYear,
            amountInTodaysTerms: 80000
          },
          {
            fromYear: currentYear + 14,
            amountInTodaysTerms: 50000
          }
        ]
      },
      transfers: []
    }
  ]
}

export const getAssetData = (scenario: IScenario, assetName: string): IAsset | undefined => {
  const { assets } = scenario
  return assets.find((it) => it.name === assetName)
}
