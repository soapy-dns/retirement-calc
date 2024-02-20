import { ValidationIssue } from "@/app/lib/calculations/types"
import { IAsset, Transfer } from "@/app/lib/data/schema/config"
import { FormattedErrorLine } from "./FormattedErrorLine"

interface ComponentProps {
  errors: ValidationIssue[]
  assets: IAsset[]
  transfers: Transfer[]
}

export const FormattedErrors: React.FC<ComponentProps> = ({ errors = [], assets, transfers = [] }) => {
  if (errors.length === 0) return <div>No errors</div>

  return (
    <ul>
      {errors.map((error, index) => {
        if (index > 2) return null
        return <FormattedErrorLine key={index} error={error} assets={assets} transfers={transfers} />
      })}
    </ul>
  )
}
