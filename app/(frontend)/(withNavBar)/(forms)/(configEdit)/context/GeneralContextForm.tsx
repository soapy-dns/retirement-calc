"use client"

import { DECIMALS_ONLY } from "@/app/ui/components/common/formRegExes"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { SelectQuestion } from "@/app/ui/components/form/SelectQuestion"
import { Control } from "react-hook-form"
import { contextConstants } from "./contextConstants"
import { taxResidentOptions } from "./options"
import { RadioButtonQuestion, RadioQuestionVariant } from "@/app/ui/components/form/RadioButtonQuestion"
import { CountrySelector } from "@/app/ui/components/form/CountrySelector"

interface Props {
  control: Control<any, object>
  taxResident: string
  currency: string
}

const GeneralContextForm: React.FC<Props> = ({ control, taxResident, currency }) => {
  return (
    <form>
      <CountrySelector
        id="taxResident"
        control={control}
        label={contextConstants.TAX_RESIDENCY.LABEL}
        helpText={contextConstants.TAX_RESIDENCY.HELP_TEXT}
      />

      <CountrySelector
        id="currency"
        control={control}
        label={contextConstants.CURRENCY.LABEL}
        helpText={contextConstants.CURRENCY.HELP_TEXT}
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

export default GeneralContextForm
