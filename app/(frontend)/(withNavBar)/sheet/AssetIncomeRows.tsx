import { AssetData } from "@/app/lib/calculations/types"
import { Row } from "./row/Row"

interface Props {
  data: AssetData
}
export const AssetIncomeRows = ({ data }: Props) => {
  return (
    <>
      {Object.entries(data).map(([rowIdentifier, incomeData], index) => {
        return <Row key={index} rowIdentifier={rowIdentifier} cells={incomeData} />
      })}
    </>
  )
}
