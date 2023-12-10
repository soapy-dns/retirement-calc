import { Constants } from "../../constants"
import { getTransferAmt } from "../transferUtils"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// allTransfers.scenarioX = {
//   2021: [
//     { from: "AU_BANK1", to: "AU_BANK2", value: 100 },
//     { from: "AU_BANK2", to: "AU_BANK1", value: 50 }
//   ],
//   2022: [{ from: "SOMETHING", to: Constants.DRAWDOWN, value: 100 }],
//   2023: [{ from: "SOMETHING", to: "SOMETHING_ELSE", value: 100, costOfTransfer: 10 }]
// }

describe.skip("test", () => {
  it("should calc transfer amount = 0 when no matching transfers.", () => {
    const result = getTransferAmt(2021, "AU_BANK3", "scenarioX")
    expect(result).toEqual(0)
  })

  it("should calc transfer amount.", () => {
    const result = getTransferAmt(2021, "AU_BANK1", "scenarioX")
    expect(result).toEqual(-50)
  })
  it("should calc transfer amount +ve.", () => {
    const result = getTransferAmt(2021, "AU_BANK2", "scenarioX")
    expect(result).toEqual(50)
  })
  it("should calc transfer amount +ve for DRAWDOWN", () => {
    const result = getTransferAmt(2022, Constants.DRAWDOWN, "scenarioX")
    expect(result).toEqual(100)
  })
  it("should calc transfer amount minus cost of transfer", () => {
    const result = getTransferAmt(2023, "SOMETHING_ELSE", "scenarioX")
    expect(result).toEqual(90)
  })
})
