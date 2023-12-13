import { DECIMALS_ONLY } from "@/app/ui/components/common/formRegExes"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { SelectQuestion } from "@/app/ui/components/form/SelectQuestion"
import { Control } from "react-hook-form"
import { contextConstants } from "./contextConstants"

import { currencyOptions, taxResidentOptions } from "./options"
// import { useNavigation } from "view/hooks/useNavigation"

interface Props {
  control: Control<any, object>
  taxResident: string
  currency: string
}

export const GeneralContext: React.FC<Props> = ({ control, taxResident, currency }) => {
  // const { selectedScenario } = useContext(ScenarioContext)
  // const navigation = useNavigation()

  // const { context } = selectedScenario

  // const handleBack = () => {
  //   navigation.goBack()
  // }

  return (
    <form>
      <SelectQuestion
        id="taxResident"
        control={control}
        label={contextConstants.TAX_RESIDENCY.LABEL}
        helpText={contextConstants.TAX_RESIDENCY.HELP_TEXT}
        options={taxResidentOptions}
      />
      <SelectQuestion
        id="currency"
        control={control}
        label={contextConstants.CURRENCY.LABEL}
        helpText={contextConstants.CURRENCY.HELP_TEXT}
        options={currencyOptions}
      />

      {taxResident !== currency && (
        <InputQuestion
          id="au2ukExchangeRate"
          control={control}
          label={contextConstants.AU_2_UK_EXCHANGE_RATE.LABEL}
          restrictedCharSet={DECIMALS_ONLY}
          helpText={contextConstants.AU_2_UK_EXCHANGE_RATE.HELP_TEXT}
        />
      )}

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
    </form>
  )
}
