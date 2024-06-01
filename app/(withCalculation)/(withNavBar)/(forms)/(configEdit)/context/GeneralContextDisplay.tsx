import { useContext } from "react"
import { contextConstants } from "./contextConstants"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { Card } from "@/app/ui/components/Card"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { EditButton } from "@/app/ui/components/common/EditButton"
import { CountryFlag } from "@/app/ui/components/CountryFlag"
import { FormGroup } from "@/app/ui/components/common/FormGroup"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { DisplayCardWithEdit } from "@/app/ui/components/form/DisplayCardWithEdit"

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

  const heading = (
    <h2 className="flex items-center justify-between text-primary">
      <div className="flex gap-2 items-center">
        Tax and currency
        <button onClick={showInfo}>
          <InformationCircleIcon className="w-6 h-6" />
        </button>
      </div>
    </h2>
  )

  return (
    <DisplayCardWithEdit heading={heading} handleEdit={handleEdit}>
      <FormGroup
        label={contextConstants.TAX_RESIDENCY.LABEL}
        id="taxResidency"
        helpText={contextConstants.TAX_RESIDENCY.HELP_TEXT}
      >
        <CountryFlag country={taxResident} />
      </FormGroup>

      <FormGroup label={contextConstants.CURRENCY.LABEL} id="currency" helpText={contextConstants.CURRENCY.HELP_TEXT}>
        <CountryFlag country={currency} />
      </FormGroup>

      {taxResident !== currency && (
        <TextDisplayField
          label={contextConstants.AU_2_UK_EXCHANGE_RATE.LABEL}
          helpText={contextConstants.AU_2_UK_EXCHANGE_RATE.HELP_TEXT}
          value={au2ukExchangeRate || "-"}
        />
      )}

      {/* <SelectQuestion
        id="currency"
        control={control}
        label={contextConstants.CURRENCY.LABEL}
        defaultValue={context.currency}
        editable={editable}
        helpText={contextConstants.CURRENCY.HELP_TEXT}
        options={[
          { code: "AU", label: "AUD" },
          { code: "SC", label: "GBP" }
        ]}
      /> */}

      {/* {taxResident !== currency && (
        <InputQuestion
          id="au2ukExchangeRate"
          control={control}
          label={contextConstants.AU_2_UK_EXCHANGE_RATE.LABEL}
          defaultValue={context.au2ukExchangeRate}
          editable={editable}
          // validationRules={changeDetailsValidation}
          restrictedCharSet={DECIMALS_ONLY}
          helpText={contextConstants.AU_2_UK_EXCHANGE_RATE.HELP_TEXT}
        />
      )} */}

      {/* <InputQuestion
        id="maxYears"
        control={control}
        label={contextConstants.MAX_YEARS.LABEL}
        defaultValue={context.numOfYears}
        editable={editable}
        // validationRules={changeDetailsValidation}
        restrictedCharSet={INTEGERS_ONLY}
        helpText={contextConstants.MAX_YEARS.HELP_TEXT}
      /> */}
    </DisplayCardWithEdit>
  )
}
