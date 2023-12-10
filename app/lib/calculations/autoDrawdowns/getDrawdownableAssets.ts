import { Asset } from "../assets/Asset"

export const getDrawdownableAssets = (assets, year): Asset[] => {
  return assets.filter((it: Asset) => {
    return it.canDrawdown && (!it.drawdownFrom || it.drawdownFrom <= year)
  })
}
