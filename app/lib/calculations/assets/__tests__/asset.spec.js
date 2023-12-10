import { Asset } from "../Asset"

const testCalculator = {
  calculate: jest.fn((value) => ({ value: value + 100 }))
}

describe("test", () => {
  // TODO: maybe move some of this to beforeEach
  it.skip("should calculate the next year ok", () => {
    const data = {
      name: "TEST",
      incomeProducing: true,
      //   assetOwner,
      calculator: testCalculator,
      //   incomeBucket,
      //   canDrawdown,
      //   preferredMinAmt,
      drawdownOrder: 1
    }
    testCalculator.calculate.mockReturnValue({ value: 1100 })
    const year = 2020
    const asset = new Asset(data)
    asset.history.push({ value: 1000, year }) // initialising

    const transferAmt = 0

    const calculated = asset.calcNextYear(transferAmt)

    expect(calculated.value).toBe(1100)
    expect(asset.history.length).toBe(2)
    expect(asset.history[1].value).toBe(1100)
    expect(asset.history[1].year).toBe(2021)

    const amountLeft = asset.getAmountLeft(year + 1)
    expect(amountLeft).toBe(1100)
  })

  // TODO: test with preferredMinAmt
})
