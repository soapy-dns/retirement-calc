import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"

import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { AppPath } from "@/app/ui/types"
import { useContext } from "react"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { FullOwnerContext } from "@/app/ui/context/LifeExpectancyProvider"

const UNKNOWN = "Unknown"

export const OwnersDisplay: React.FC = () => {
  const { selectedScenario } = useContext(ScenarioContext)
  const { fullOwnerDetails } = useContext(FullOwnerContext)

  const navigation = useNavigation()

  const { asAtYear } = selectedScenario

  const handleEdit = () => {
    navigation.goTo(AppPath.contextOwnersEdit)
  }

  const handleEditFn = asAtYear >= getCurrentYear() ? handleEdit : undefined

  const heading = <h2 className="flex items-center justify-between text-primary-foreground">Asset owners</h2>

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEditFn}>
      <ul className="mx-8 divide-y ">
        {fullOwnerDetails?.map((it, index) => (
          <div key={it.identifier} className="mb-4 ">
            <TextDisplayField label="Name" value={it.ownerName || `Person #${index + 1}`} />
            {it.yearsLeft && (
              <TextDisplayField
                label="Possible number of years to cover"
                helpText="Calculated using UK life expectancy data"
                value={`${it.yearsLeft} - i.e. until ${it.deathYear}`}
              />
            )}
          </div>
        ))}
      </ul>
    </DisplayCardWithEdit>
  )
}
