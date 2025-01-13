import { INTEGERS_ONLY } from "@/app/ui/components/common/formRegExes"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { RadioButtonQuestion, RadioQuestionVariant } from "@/app/ui/components/form/RadioButtonQuestion"
import { SelectQuestion } from "@/app/ui/components/form/SelectQuestion"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { yesNoOptions } from "@/app/ui/utils/yesNoOptions"
import { FunctionComponent, useContext } from "react"
import { Control } from "react-hook-form"
import { transferConstants } from "./transferConstants"
import { useContextConfig } from "@/app/ui/hooks/useContextConfig"

interface Props {
  control: Control<any, object>
  showValue: boolean
}

export const TransferForm: FunctionComponent<Props> = ({ control, showValue }) => {
  const { getSelectedScenarioAssetsOptions } = useContext(ScenarioContext)
  const { getCurrencySymbol } = useContextConfig()
  const currency = getCurrencySymbol()

  const transferableAssets = getSelectedScenarioAssetsOptions({ excludeIncome: true })
  return (
    <form>
      <InputQuestion
        id="year"
        control={control}
        label={transferConstants.YEAR.LABEL}
        helpText={transferConstants.YEAR.HELP_TEXT}
        restrictedCharSet={INTEGERS_ONLY}
      />
      <SelectQuestion
        id="from"
        control={control}
        label={transferConstants.FROM.LABEL}
        helpText={transferConstants.FROM.HELP_TEXT}
        options={transferableAssets}
      />
      <SelectQuestion
        id="to"
        control={control}
        label={transferConstants.TO.LABEL}
        helpText={transferConstants.TO.HELP_TEXT}
        options={transferableAssets}
      />

      <RadioButtonQuestion
        id="migrateAll"
        control={control}
        label={transferConstants.MIGRATE_ALL.LABEL}
        values={yesNoOptions}
        variant={RadioQuestionVariant.BLOCK}
        helpText={transferConstants.MIGRATE_ALL.HELP_TEXT}
      />
      {showValue && (
        <InputQuestion
          id="value"
          control={control}
          label={transferConstants.VALUE.LABEL}
          prefix={currency}
          helpText={transferConstants.VALUE.HELP_TEXT}
        />
      )}

      <InputQuestion
        id="costOfTransfer"
        control={control}
        label={transferConstants.TRANSFER_COST.LABEL}
        prefix={currency}
        helpText={transferConstants.TRANSFER_COST.HELP_TEXT}
      />
    </form>
  )
}
