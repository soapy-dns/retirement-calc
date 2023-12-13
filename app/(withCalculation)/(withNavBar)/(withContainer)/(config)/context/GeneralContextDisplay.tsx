import { useContext } from "react"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { contextConstants } from "./contextConstants"
import { currencyOptions, taxResidentOptions } from "./options"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { AppPath } from "@/app/ui/types"
import { Card } from "@/app/ui/components/Card"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"

export const GeneralContextDisplay: React.FC = () => {
  const { selectedScenario } = useContext(ScenarioContext)
  const navigation = useNavigation()

  const { context } = selectedScenario

  const { taxResident, currency, au2ukExchangeRate } = context

  const taxResidentValue = taxResidentOptions.find((it) => it.value === taxResident)?.label
  const currencyValue = currencyOptions.find((it) => it.value === currency)?.label

  const handleGeneralContextEdit = () => {
    navigation.goTo(AppPath.contextGeneralEdit)
  }

  return (
    <Card>
      <h2 className="flex items-center justify-between text-primary">
        Tax and currency
        <Button buttonType={ButtonType.tertiary} onClick={handleGeneralContextEdit}>
          <div className="flex items-center gap-2">
            <PencilSquareIcon className="mx-2 h-4 w-4" /> <div className="text-base">Edit</div>
          </div>
        </Button>
      </h2>
      <TextDisplayField
        label={contextConstants.TAX_RESIDENCY.LABEL}
        helpText={contextConstants.TAX_RESIDENCY.HELP_TEXT}
        value={taxResidentValue || "-"}
      />

      <TextDisplayField
        label={contextConstants.CURRENCY.LABEL}
        helpText={contextConstants.CURRENCY.HELP_TEXT}
        value={currencyValue || "-"}
      />

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
    </Card>
  )
}
