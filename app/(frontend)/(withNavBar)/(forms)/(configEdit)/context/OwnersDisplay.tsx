import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"

import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { AppPath } from "@/app/ui/types"
import { useContext } from "react"
import { useNavigation } from "@/app/ui/hooks/useNavigation"

export const OwnersDisplay: React.FC = () => {
  const { selectedScenario } = useContext(ScenarioContext)
  const navigation = useNavigation()

  const { context, asAtYear } = selectedScenario
  const { owners } = context

  const handleEdit = () => {
    navigation.goTo(AppPath.contextOwnersEdit)
  }

  const handleEditFn = asAtYear >= getCurrentYear() ? handleEdit : undefined

  const heading = <h2 className="flex items-center justify-between text-primary-foreground">Asset owners</h2>

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEditFn}>
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
