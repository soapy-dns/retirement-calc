// import { z } from "zod"
import { AssetBaseSchema, AssetClassEnum } from "../asset"

describe("AssetBaseSchema", () => {
  it("should validate a correct asset base object", () => {
    const validAssetBase = {
      id: "asset1",
      className: "AuBank",
      name: "Asset Name",
      assetOwners: ["owner1"],
      country: "AU"
    }
    expect(() => AssetBaseSchema.parse(validAssetBase)).not.toThrow()
  })

  it("should fail validation if id is missing", () => {
    const invalidAssetBase = {
      className: "AuBank",
      name: "Asset Name",
      assetOwners: ["owner1"],
      country: "AU"
    }
    expect(() => AssetBaseSchema.parse(invalidAssetBase)).toThrow()
  })

  it("should fail validation if className is invalid", () => {
    const invalidAssetBase = {
      id: "asset1",
      className: "InvalidClass",
      name: "Asset Name",
      assetOwners: ["owner1"],
      country: "AU"
    }
    expect(() => AssetBaseSchema.parse(invalidAssetBase)).toThrow()
  })

  it("should validate with optional fields", () => {
    const validAssetBase = {
      id: "asset1",
      className: "AuBank",
      name: "Asset Name",
      assetOwners: ["owner1"],
      country: "AU",
      disabled: true,
      description: "Asset Description",
      rateVariation: 1.5
    }
    expect(() => AssetBaseSchema.parse(validAssetBase)).not.toThrow()
  })
})
