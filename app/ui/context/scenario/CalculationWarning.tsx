import { Button } from "../../components/common/Button"

interface Props {
  calculatedEndYear: number
  showMore: () => void
}

// if ended and still assets - TODO: ended and no assets left AND still alive
export const CalculationWarning: React.FunctionComponent<Props> = ({ calculatedEndYear, showMore }) => {
  const handleClick = () => {
    // add code here if want to remove the alert after clicking on the link
    showMore()
  }
  return (
    <div>
      Cannot automate further capital asset drawdowns after {calculatedEndYear}.{" "}
      <Button onClick={handleClick}>Click here for more details.</Button>
    </div>
  )
}
