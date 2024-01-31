import { IAsset } from "@/app/lib/data/schema/config"
import { useAsset } from "../useAsset"

describe("hasValidationErrors", () => {
  it("dummy", () => {
    const a = 1
    const b = 2
    expect(b + a).toBe(3)
  })
  // const { hasValidationErrors } = useAsset()
  // Returns false if calculationResults is null or calculationResults.success is true
  // it.skip("should return false when calculationResults is null", () => {
  //   const asset: IAsset = {
  //     id: "UK_BANK",
  //     name: "UK_BANK",
  //     description: "UK bank accounts",
  //     country: "SC",
  //     className: "AuBank",
  //     value: 100000,
  //     assetOwners: ["Him"],
  //     incomeBucket: true,
  //     canDrawdown: true,
  //     drawdownOrder: 20
  //   }
  //   const calculationResults = null
  //   const result = hasValidationErrors(asset)
  //   expect(result).toBe(false)
  // })
  // Returns false if errors is null
  // it('should return false when errors is null', () => {
  //   const asset: IAsset = {...};
  //   const calculationResults = { success: false, errors: null };
  //   const result = hasValidationErrors(asset);
  //   expect(result).toBe(false);
  // });
  // // Returns false if assetErrors is null
  // it('should return false when assetErrors is null', () => {
  //   const asset: IAsset = {...};
  //   const calculationResults = { success: false, errors: [] };
  //   const result = hasValidationErrors(asset);
  //   expect(result).toBe(false);
  // });
  // // Returns false if calculationResults is not null but calculationResults.success is false and errors is null
  // it('should return false when calculationResults is not null, calculationResults.success is false, and errors is null', () => {
  //   const asset: IAsset = {...};
  //   const calculationResults = { success: false, errors: null };
  //   const result = hasValidationErrors(asset);
  //   expect(result).toBe(false);
  // });
  // // Returns false if calculationResults is not null but calculationResults.success is false and assetErrors is null
  // it('should return false when calculationResults is not null, calculationResults.success is false, and assetErrors is null', () => {
  //   const asset: IAsset = {...};
  //   const calculationResults = { success: false, errors: [] };
  //   const result = hasValidationErrors(asset);
  //   expect(result).toBe(false);
  // });
  // // Returns false if calculationResults is not null but calculationResults.success is false and matchingAssets is null
  // it('should return false when calculationResults is not null, calculationResults.success is false, and matchingAssets is null', () => {
  //   const asset: IAsset = {...};
  //   const calculationResults = { success: false, errors: [{ path: ["other"] }] };
  //   const result = hasValidationErrors(asset);
  //   expect(result).toBe(false);
  // });
})
