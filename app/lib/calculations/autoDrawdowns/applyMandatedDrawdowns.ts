import { Asset } from "../assets/Asset"
import { AutomatedDrawdown } from "./types"

interface Props {
  drawdowns: AutomatedDrawdown[]
  assets: Asset[]
}

// no need to take of taxes.  Taxes will be calculated after.
export const applyMandatedDrawdowns = ({ drawdowns, assets }: Props) => {
  return drawdowns.map((drawdown) => {
    const { year, from, value } = drawdown

    const asset = assets.find((it) => it.id === from) // find the asset to drawdown from
    if (!asset) throw new Error(`asset not found ${from}`)

    const nextHistory = asset.history.find((it) => it.year === year + 1) // next history - for manipulating it
    if (!nextHistory) throw new Error(`history cannot be found ${asset.name}, ${year}`)

    nextHistory.value = nextHistory.value - value

    //  TODO: and do we just take off the value? - no divide by 2 or anything?
  })
}
