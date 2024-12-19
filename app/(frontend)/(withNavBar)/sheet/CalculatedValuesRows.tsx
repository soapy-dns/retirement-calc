import { SurplusRowData } from "@/app/lib/calculations/types"
import { Row } from "./row/Row"
import { SectionHeading } from "./row/SectionHeading"

interface Props {
  data: SurplusRowData
}
export const CalculatedValueRows = ({ data }: Props) => {
  return (
    <>
      {/* calculated values */}
      <SectionHeading text="Calculated values" />

      {/* surplus */}
      {data &&
        Object.entries(data).map(([rowIdentifier, surplusData], index) => {
          return <Row key={index} rowIdentifier={rowIdentifier} cells={surplusData} />
        })}
    </>
  )
}
