import React, { ReactNode, useContext, useEffect, useState } from "react"
import { FullOwnerDetails, getFullOwnerDetails } from "@/app/lib/calculations/lifeExpectancy"
import { ScenarioContext } from "./scenario/ScenarioContext"
import { OwnerType } from "@/app/lib/data/schema/config"

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

  const storeOwnerDetailsInState = async (owners: OwnerType[]) => {
    const fullOwnerDetails = await getFullOwnerDetails(owners)
    setFullOwnerDetails(fullOwnerDetails)
  }

  useEffect(() => {
    // update life expectancy in full owner details when owner changes
    const owners = selectedScenario.context.owners
    storeOwnerDetailsInState(owners)
  }, [selectedScenario.context.owners])

  return <FullOwnerContext.Provider value={{ fullOwnerDetails }}>{children}</FullOwnerContext.Provider>
}

export { FullOwnerContext, FullOwnerProvider }
