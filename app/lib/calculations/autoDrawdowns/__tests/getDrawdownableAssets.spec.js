import { Asset } from "../../assets/Asset"
import { getDrawdownableAssets } from "../getDrawdownableAssets"

describe("test", () => {
  it("should return if allowed and no drawdownFrom date set", () => {
    const data = {
      name: "TEST",
      canDrawdown: true
    }
    const year = 2023
    const asset = new Asset(data)

    const result = getDrawdownableAssets([asset], year)
    expect(result.length).toEqual(1)
  })

  it("should return if allowed and date ok", () => {
    const data = {
      name: "TEST",
      canDrawdown: true,
      drawdownFrom: 2023
    }

    const year = 2023
    const asset = new Asset(data)

    const result = getDrawdownableAssets([asset], year)
    expect(result.length).toEqual(1)
  })

  it("should not return if not allowed", () => {
    const data = {
      name: "TEST",
      canDrawdown: false
    }
    const year = 2023
    const asset = new Asset(data)

    const result = getDrawdownableAssets([asset], year)
    expect(result).toEqual([])
  })

  it("should not return if before drawdownAfter", () => {
    const data = {
      name: "TEST",
      canDrawdown: true,
      drawdownFrom: 2024
    }
    const year = 2023
    const asset = new Asset(data)

    const result = getDrawdownableAssets([asset], year)
    expect(result).toEqual([])
  })
})
