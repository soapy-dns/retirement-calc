import { Asset } from "../assets/Asset"

export const getDrawdownableAssets = (assets: Asset[], year: number): Asset[] => {
  return assets.filter((it: Asset) => {
    return it.canDrawdown && (!it.drawdownFrom || it.drawdownFrom <= year)
  })
}
