import { Card } from "@/app/ui/components/Card"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

export const OwnersDisplay: React.FC = () => {
  // const navigation = useNavigation()

  const { selectedScenario } = useContext(ScenarioContext)
  const { context } = selectedScenario
  const { owners } = context

  const handleEdit = () => {
    alert("To be implemented")
    // history.push(`/context/inflation/edit`)
  }

  return (
    <Card>
      <h2 className="flex items-center justify-between text-primary">
        Asset owners
        <Button buttonType={ButtonType.tertiary} onClick={handleEdit}>
          <div className="flex items-center gap-2">
            <PencilSquareIcon className="mx-2 h-6 w-6" /> <div className="text-base">Edit</div>
          </div>
        </Button>
      </h2>
      <ul className="mx-8">
        {owners?.map((it) => (
          <li className="list-disc" key={it}>
            {it}
          </li>
        ))}
      </ul>
    </Card>
  )
}
