import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"

import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { AppPath } from "@/app/ui/types"
import { useContext, useEffect } from "react"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { getGenderLabel } from "@/app/lib/utils/genderOptions"
import { getExpectedDeathDetails } from "@/app/lib/calculations/lifeExpectancy"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"

const UNKNOWN = "Unknown"

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

  const ownersWithDeathYear = owners.map((owner) => {
    if (owner.birthYear && owner.gender) {
      const deathDetails = getExpectedDeathDetails(owner.birthYear, owner.gender)

      if (deathDetails) {
        const { age, year, yearsLeft } = deathDetails
        return { ...owner, deathYear: year, deathAge: age, yearsLeft }
      }
    }
    return { ...owner, deathYear: undefined, deathAge: undefined, yearsLeft: undefined }
  })

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEditFn}>
      <ul className="mx-8 divide-y ">
        {ownersWithDeathYear?.map((it, index) => (
          <div key={it.identifier} className="mb-4 ">
            <TextDisplayField label="Name" value={it.ownerName || `Person #${index + 1}`} />
            {/* {it.gender && <TextDisplayField label="Gender" value={getGenderLabel(it.gender)} />} */}
            {it.yearsLeft && (
              <TextDisplayField
                label="Possible number of years to cover"
                helpText="Calculated using UK life expectancy data"
                value={`${it.yearsLeft} - i.e. until ${it.deathYear}`}
              />
            )}
            {/* {it.deathYear && (
              <TextDisplayField
                label="Possible year of death"
                helpText="Calculated using UK life expectancy data"
                value={it.deathYear}
              />
            )}
            {it.deathAge && (
              <TextDisplayField
                label="Possible age at death"
                helpText="Calculated using UK life expectancy data"
                value={it.deathAge}
              />
            )} */}
          </div>
        ))}
      </ul>
    </DisplayCardWithEdit>
  )
}
