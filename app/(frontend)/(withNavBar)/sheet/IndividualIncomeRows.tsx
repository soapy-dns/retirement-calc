import { AssetData } from "@/app/lib/calculations/types"
import { Row } from "./row/Row"

interface Props {
  data: AssetData
}
export const IndividualIncomeRows = ({ data }: Props) => {
  return (
    <>
      {Object.entries(data).map(([owner, data]) => {
        return <Row key={owner} rowIdentifier={`Total income - ${owner}`} cells={data} />
      })}
    </>
  )
}
