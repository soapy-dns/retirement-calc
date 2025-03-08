import { INTEGERS_ONLY } from "@/app/ui/components/common/formRegExes"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { RadioButtonQuestion, RadioQuestionVariant } from "@/app/ui/components/form/RadioButtonQuestion"
import { SelectQuestion } from "@/app/ui/components/form/SelectQuestion"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { FunctionComponent, useContext } from "react"
import { Control } from "react-hook-form"
import { transferConstants } from "./transferConstants"
import { useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { costOfTransferTypeOptions } from "./costOfTransferTypeOptions"

interface Props {
  control: Control<any, object>
  watch: Function
}

export const TransferForm: FunctionComponent<Props> = ({ control, watch }) => {
  const { getSelectedScenarioAssetsOptions } = useContext(ScenarioContext)
  const { getCurrencySymbol } = useContextConfig()
  const currency = getCurrencySymbol()

  const transferableAssets = getSelectedScenarioAssetsOptions({ excludeIncome: true })

  const currentCostOfTransferType = watch("transferCostType")

  return (
    <form>
      <InputQuestion
        id="year"
        // control={control}
        label={transferConstants.YEAR.LABEL}
        helpText={transferConstants.YEAR.HELP_TEXT}
        restrictedCharSet={INTEGERS_ONLY}
      />
      <SelectQuestion
        id="from"
        // control={control}
        label={transferConstants.FROM.LABEL}
        helpText={transferConstants.FROM.HELP_TEXT}
        options={transferableAssets}
      />
      <SelectQuestion
        id="to"
        // control={control}
        label={transferConstants.TO.LABEL}
        helpText={transferConstants.TO.HELP_TEXT}
        options={transferableAssets}
      />

      <InputQuestion
        id="transferPercent"
        // control={control}
        label={transferConstants.TRANSFER_PERCENT.LABEL}
        suffix="%"
        helpText={transferConstants.TRANSFER_PERCENT.HELP_TEXT}
      />

      <RadioButtonQuestion
        id="transferCostType"
        // control={control}
        label={transferConstants.TRANSFER_COST_TYPE.LABEL}
        values={costOfTransferTypeOptions}
        variant={RadioQuestionVariant.VERTICAL}
        helpText={transferConstants.TRANSFER_COST_TYPE.HELP_TEXT}
      />

      {currentCostOfTransferType === "TODAYS_MONEY" && (
        <InputQuestion
          id="transferCostValue"
          // control={control}
          label={transferConstants.TRANSFER_COST_TODAYS_MONEY.LABEL}
          prefix={currency}
          helpText={transferConstants.TRANSFER_COST_TODAYS_MONEY.HELP_TEXT}
        />
      )}

      {currentCostOfTransferType === "FUTURE_MONEY" && (
        <InputQuestion
          id="transferCostValue"
          // control={control}
          label={transferConstants.TRANSFER_COST_FUTURE_MONEY.LABEL}
          prefix={currency}
          helpText={transferConstants.TRANSFER_COST_FUTURE_MONEY.HELP_TEXT}
        />
      )}

      {currentCostOfTransferType === "PERCENTAGE" && (
        <InputQuestion
          id="transferCostValue"
          // control={control}
          label={transferConstants.TRANSFER_COST_PERCENT.LABEL}
          suffix="%"
          helpText={transferConstants.TRANSFER_COST_PERCENT.HELP_TEXT}
        />
      )}
    </form>
  )
}
