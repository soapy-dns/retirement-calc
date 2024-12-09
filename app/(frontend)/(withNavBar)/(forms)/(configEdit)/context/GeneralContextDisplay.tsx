import { useContext } from "react"
import { contextConstants } from "./contextConstants"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { Card } from "@/app/ui/components/Card"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { EditButton } from "@/app/ui/components/common/EditButton"
import { CountryDislayTile } from "@/app/ui/components/CountryTile"
import { FormGroup } from "@/app/ui/components/common/FormGroup"
import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"
import { InfoButton } from "@/app/ui/components/common/accordian/InfoButton"

interface Props {
  showInfo: () => void
}

export const GeneralContextDisplay: React.FC<Props> = ({ showInfo }) => {
  const { selectedScenario } = useContext(ScenarioContext)
  const navigation = useNavigation()

  const { context } = selectedScenario

  const { taxResident, currency, au2ukExchangeRate } = context

  const handleEdit = () => {
    navigation.goTo(AppPath.contextGeneralEdit)
  }

  const handleEditFn = selectedScenario.asAtYear >= getCurrentYear() ? handleEdit : undefined

  const heading = (
    <h2 className="flex items-center justify-between text-primary-foreground">
      <div className="flex gap-2 items-center">
        Tax and currency
        <InfoButton showInfo={showInfo} />
      </div>
    </h2>
  )

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEditFn}>
      <FormGroup label={contextConstants.TAX_RESIDENCY.LABEL} id="taxResidency">
        <CountryDislayTile country={taxResident} />
      </FormGroup>

      <FormGroup label={contextConstants.CURRENCY.LABEL} id="currency">
        <CountryDislayTile country={currency} />
      </FormGroup>

      {/* TODO: GBP / AUD? */}
      {taxResident !== currency && (
        <TextDisplayField label={contextConstants.AU_2_UK_EXCHANGE_RATE.LABEL} value={au2ukExchangeRate || "-"} />
      )}
    </DisplayCardWithEdit>
  )
}
