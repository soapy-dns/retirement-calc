import { Card } from "@/app/ui/components/Card"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { EditButton } from "@/app/ui/components/common/EditButton"
import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

export const OwnersDisplay: React.FC = () => {
  const { selectedScenario } = useContext(ScenarioContext)
  const { context } = selectedScenario
  const { owners } = context

  const handleEdit = () => {
    alert("To be implemented")
  }

  const heading = <h2 className="flex items-center justify-between text-primary">Asset owners</h2>

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEdit}>
      <ul className="mx-8">
        {owners?.map((it) => (
          <li className="list-disc" key={it}>
            {it}
          </li>
        ))}
      </ul>
    </DisplayCardWithEdit>
  )
}
