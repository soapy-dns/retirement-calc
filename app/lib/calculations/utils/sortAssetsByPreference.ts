import { Asset } from "../assets/Asset"

export const sortByDrawdownOrder = (drawdownableAssets: Asset[]): Asset[] => {
  return drawdownableAssets.sort((a, b) => {
    if (a.drawdownOrder === undefined || !b.drawdownOrder) return 1 // this seems clumsy to get around the fact that assets might not have drawdownOrder
    if (a.drawdownOrder > b.drawdownOrder) return 1
    if (a.drawdownOrder < b.drawdownOrder) return -1
    return 0
  })
}
