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
        {fullOwnerDetails?.map((it) => (
          <div key={it.identifier} className="my-4">
            <p className="font-semibold"> {it.ownerName}</p>
            {it.yearsLeft && (
              <>
                <p>
                  Based on your age, you may be expected to live, on average, to around{" "}
                  <span className="font-semibold">{it.deathAge}</span>.
                </p>
                <p>
                  This means you need to plan for at least the next{" "}
                  <span className="font-semibold">{it.yearsLeft}</span> years.
                </p>
              </>
            )}
          </div>
        ))}
      </ul>
    </DisplayCardWithEdit>
  )
}
