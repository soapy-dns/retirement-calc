import { OwnerType } from "../../data/schema/config"
import { Tax, YearsTaxData } from "../assets/types"
import { AssetData } from "../types"
import { accumTaxData } from "./accumTaxData"

interface Props {
  owners: OwnerType[]
  taxes: Tax[]
}
interface ResultProps {
  [key: string]: YearsTaxData[]
}

export const getTaxDetailsByOwner = ({ owners, taxes }: Props): ResultProps => {
  return owners.reduce((accum, owner) => {
    const filteredTaxesByOwner = taxes.filter((it) => it.ownerId === owner.identifier)

    accum[owner.ownerName] = accumTaxData(filteredTaxesByOwner.map((it) => it.history).flat() || 0)
    return accum
  }, {} as ResultProps)
}
