import React, { ReactNode, useContext, useEffect, useState } from "react"
import { ConfigTab } from "./types"
import { LifeExpectancyDetails } from "@/app/lib/calculations/lifeExpectancy/types"
import { OwnersType, OwnerType } from "@/app/lib/data/schema/config"
import { getExpectedDeathDetails } from "@/app/lib/calculations/lifeExpectancy"
import { ScenarioContext } from "./scenario/ScenarioContext"

const getFullOwnerDetails = (owners: OwnerType[]): FullOwnerDetails[] => {
  const fullOwnersDetails = owners.map((owner: OwnerType) => {
    if (owner.birthYear && owner.gender) {
      const deathDetails = getExpectedDeathDetails(owner.birthYear, owner.gender)

      if (deathDetails) {
        const { deathAge, deathYear, yearsLeft } = deathDetails
        return { ...owner, deathYear, deathAge, yearsLeft }
      }
    }
    return { ...owner }
  })

  return fullOwnersDetails
}

type FullOwnerDetails = Partial<LifeExpectancyDetails> & OwnerType

interface IFullOwnerContext {
  fullOwnerDetails?: FullOwnerDetails[]
}

const FullOwnerContext = React.createContext<IFullOwnerContext>({
  fullOwnerDetails: []
})

interface IFullOwnerProvider {
  children: ReactNode
}
const FullOwnerProvider: React.FC<IFullOwnerProvider> = ({ children }) => {
  const [fullOwnerDetails, setFullOwnerDetails] = useState<FullOwnerDetails[]>([])
  const { selectedScenario } = useContext(ScenarioContext)

  useEffect(() => {
    // update life expectancy in full owner details when owner changes
    const owners = selectedScenario.context.owners

    setFullOwnerDetails(getFullOwnerDetails(owners))
  }, [selectedScenario.context.owners])

  return <FullOwnerContext.Provider value={{ fullOwnerDetails }}>{children}</FullOwnerContext.Provider>
}

export { FullOwnerContext, FullOwnerProvider }
