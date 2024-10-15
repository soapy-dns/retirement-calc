import React, { ReactNode, useContext, useEffect, useState } from "react"
import { LifeExpectancyDetails } from "@/app/lib/calculations/lifeExpectancy/types"
import { OwnerType } from "@/app/lib/data/schema/config"
import { FullOwnerDetails, getExpectedDeathDetails, getFullOwnerDetails } from "@/app/lib/calculations/lifeExpectancy"
import { ScenarioContext } from "./scenario/ScenarioContext"

// const getFullOwnerDetails = (owners: OwnerType[]): FullOwnerDetails[] => {
//   const fullOwnersDetails = owners.map((owner: OwnerType) => {
//     if (owner.birthYear && owner.gender) {
//       const deathDetails = getExpectedDeathDetails(owner.birthYear, owner.gender)

//       if (deathDetails) {
//         const { deathAge, deathYear, yearsLeft } = deathDetails
//         return { ...owner, deathYear, deathAge, yearsLeft }
//       }
//     }
//     return { ...owner }
//   })

//   return fullOwnersDetails
// }

// type FullOwnerDetails = Partial<LifeExpectancyDetails> & OwnerType

interface IFullOwnerContext {
  fullOwnerDetails?: FullOwnerDetails[]
}

const FullOwnerContext = React.createContext<IFullOwnerContext>({
  fullOwnerDetails: []
})

interface IFullOwnerProvider {
  children: ReactNode
}

/*
TODO: Calculating life expectancy details is separate because this is displayed on the config page.
It means we don't need to do calculations.  However, as the age can affect the calculations - ie taxes
then this should really be in the full calculations thing I think
*/
const FullOwnerProvider: React.FC<IFullOwnerProvider> = ({ children }) => {
  const [fullOwnerDetails, setFullOwnerDetails] = useState<FullOwnerDetails[]>([])
  const { selectedScenario } = useContext(ScenarioContext)

  useEffect(() => {
    // update life expectancy in full owner details when owner changes
    const owners = selectedScenario.context.owners
    const fullOwnerDetails = getFullOwnerDetails(owners)

    setFullOwnerDetails(fullOwnerDetails)
  }, [selectedScenario.context.owners])

  return <FullOwnerContext.Provider value={{ fullOwnerDetails }}>{children}</FullOwnerContext.Provider>
}

export { FullOwnerContext, FullOwnerProvider }
