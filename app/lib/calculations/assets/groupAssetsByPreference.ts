import { Asset } from "./Asset"

// type Group = Asset[]

export const groupAssetsByPreference = (sortedByPreference: Asset[]): Asset[][] => {
  // create an array of arrays.  Each array in the outer array represents
  // assets with the same preference to drawdown
  const grouped: Asset[][] = []
  let group: Asset[] = []
  let drawdownOrderTest = 0

  sortedByPreference.forEach((it: Asset) => {
    if (it.drawdownOrder !== drawdownOrderTest) {
      drawdownOrderTest = it.drawdownOrder || 0
      if (group.length > 0) grouped.push(group)
      // new group

      group = [it]
    } else {
      group.push(it)
    }
  })
  if (group.length > 0) grouped.push(group)

  return grouped
}
