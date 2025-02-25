import { Button } from "../../components/common/Button"

interface Props {
  calculatedEndYear: number
  showMore: () => void
}

// if ended and still assets - TODO: ended and no assets left AND still alive
export const CalculationWarning: React.FunctionComponent<Props> = ({ calculatedEndYear, showMore }) => {
  return (
    <p>
      Cannot automate further capital asset drawdowns after {calculatedEndYear}. For more details click{" "}
      <Button onClick={showMore}>here</Button>.
    </p>
  )
}
