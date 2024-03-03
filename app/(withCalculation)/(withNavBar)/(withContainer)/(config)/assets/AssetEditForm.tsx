import { AssetClass } from "@/app/lib/calculations/types"
import { ALPHA_NUMERIC, INTEGERS_ONLY } from "@/app/ui/components/common/formRegExes"
import { CheckboxQuestion } from "@/app/ui/components/form/CheckboxQuestion"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { RadioButtonQuestion, RadioQuestionVariant } from "@/app/ui/components/form/RadioButtonQuestion"
import { SelectQuestion } from "@/app/ui/components/form/SelectQuestion"
import { TextAreaQuestion } from "@/app/ui/components/form/TextAreaQuestion"
import { yesNoOptions } from "@/app/ui/utils/yesNoOptions"
import { FunctionComponent } from "react"
import { Control } from "react-hook-form"
import { assetConstants } from "./assetConstants"
import { assetTypeOptions, drawdownOrderOptions } from "./assetTypeOptions"
import { validateOwners } from "@/app/ui/validation/ownersValidation"
import { YesNo } from "../types"
import { AssetType } from "@/app/lib/data/types"

interface Props {
  control: Control<any, object>
  register: Function
  assetType: string
  drawdownSet: string
  isRentedFormValue: YesNo
  owners: string[]
}
const isIncome = (assetType: string) => {
  const assetTypeOption = assetTypeOptions.find((it) => it.value === assetType)
  return assetTypeOption?.income
}

export const AssetEditForm: FunctionComponent<Props> = ({
  control,
  assetType,
  drawdownSet,
  isRentedFormValue,
  owners,
  register
}) => {
  const isIncomeFlag = isIncome(assetType)
  const isProperty = assetTypeOptions.find((it) => it.value === assetType)?.assetClass === AssetClass.property || false
  const showDrawdown = drawdownSet === "Y"
  const ownersOptions = owners.map((it) => ({ label: it, value: it }))

  const showIncomeStartDate = [AssetType.AuDefinedBenefits, AssetType.Salary].includes(assetType)

  return (
    <form>
      <InputQuestion
        id="name"
        control={control}
        label={assetConstants.NAME.LABEL}
        restrictedCharSet={ALPHA_NUMERIC}
        helpText={assetConstants.NAME.HELP_TEXT}
      />
      <TextAreaQuestion
        id="description"
        control={control}
        label={assetConstants.DESCRIPTION.LABEL}
        helpText={assetConstants.DESCRIPTION.HELP_TEXT}
      />
      <SelectQuestion
        id="assetType"
        control={control}
        label={assetConstants.CLASS.LABEL}
        options={assetTypeOptions}
        editable={true}
        helpText={assetConstants.CLASS.HELP_TEXT}
      />
      <RadioButtonQuestion
        id="country"
        control={control}
        label={assetConstants.COUNTRY.LABEL}
        values={[
          { label: "Australia", value: "AU" },
          { label: "Scotland", value: "SC" }
        ]}
        variant={RadioQuestionVariant.VERTICAL}
        helpText={assetConstants.COUNTRY.HELP_TEXT}
      />
      <CheckboxQuestion
        id="owners"
        control={control}
        label={assetConstants.OWNERS.LABEL}
        options={ownersOptions}
        {...register("owners", {
          validate: { validateOwners }
        })}
        helpText={assetConstants.OWNERS.HELP_TEXT}
      />
      {!isIncomeFlag && (
        <>
          <InputQuestion
            id="value"
            control={control}
            label={assetConstants.VALUE.LABEL}
            prefix="$"
            restrictedCharSet={INTEGERS_ONLY}
            helpText={assetConstants.VALUE.HELP_TEXT}
          />

          <RadioButtonQuestion
            id="incomeBucket"
            control={control}
            label={assetConstants.EARNINGS_BUCKET.LABEL}
            values={yesNoOptions}
            variant={RadioQuestionVariant.BLOCK}
            helpText={assetConstants.EARNINGS_BUCKET.HELP_TEXT}
          />
          <InputQuestion
            id="preferredMinAmt"
            control={control}
            label={assetConstants.PREFERRED_MIN_AMT.LABEL}
            restrictedCharSet={INTEGERS_ONLY}
            helpText={assetConstants.PREFERRED_MIN_AMT.HELP_TEXT}
          />
          {!isProperty && (
            <>
              <RadioButtonQuestion
                id="canDrawdown"
                label={assetConstants.CAN_DRAWDOWN.LABEL}
                control={control}
                values={yesNoOptions}
                variant={RadioQuestionVariant.BLOCK}
                helpText={assetConstants.CAN_DRAWDOWN.HELP_TEXT}
              />
            </>
          )}

          {showDrawdown && (
            <>
              <SelectQuestion
                id="drawdownOrder"
                control={control}
                label={assetConstants.DRAWDOWN_ORDER.LABEL}
                options={drawdownOrderOptions}
                helpText={assetConstants.DRAWDOWN_ORDER.HELP_TEXT}
              />
              <InputQuestion
                id="drawdownFrom"
                control={control}
                label={assetConstants.DRAWDOWN_FROM.LABEL}
                restrictedCharSet={INTEGERS_ONLY}
                helpText={assetConstants.DRAWDOWN_FROM.HELP_TEXT}
              />
            </>
          )}
        </>
      )}
      {isIncomeFlag && (
        <>
          {showIncomeStartDate && (
            <InputQuestion
              id="incomeStartYear"
              control={control}
              label={assetConstants.INCOME_START_YEAR.LABEL}
              restrictedCharSet={INTEGERS_ONLY}
              helpText={assetConstants.INCOME_START_YEAR.HELP_TEXT}
            />
          )}
          <InputQuestion
            id="incomeEndYear"
            control={control}
            label={assetConstants.INCOME_END_YEAR.LABEL}
            restrictedCharSet={INTEGERS_ONLY}
            helpText={assetConstants.INCOME_END_YEAR.HELP_TEXT}
          />

          <InputQuestion
            id="income"
            control={control}
            label={assetConstants.INCOME.LABEL}
            prefix="$"
            restrictedCharSet={INTEGERS_ONLY}
            helpText={assetConstants.INCOME.HELP_TEXT}
          />
        </>
      )}

      {isProperty && (
        <>
          <RadioButtonQuestion
            id="isRented"
            label={assetConstants.PROPERTY_IS_RENTED.LABEL}
            control={control}
            values={yesNoOptions}
            variant={RadioQuestionVariant.BLOCK}
            helpText={assetConstants.PROPERTY_IS_RENTED.HELP_TEXT}
          />
          {isRentedFormValue === "Y" && (
            <>
              <InputQuestion
                id="rentalStartYear"
                control={control}
                label={assetConstants.RENTAL_START_YEAR.LABEL}
                restrictedCharSet={INTEGERS_ONLY}
                helpText={assetConstants.RENTAL_START_YEAR.HELP_TEXT}
              />

              <InputQuestion
                id="rentalEndYear"
                control={control}
                label={assetConstants.RENTAL_END_YEAR.LABEL}
                restrictedCharSet={INTEGERS_ONLY}
                helpText={assetConstants.RENTAL_END_YEAR.HELP_TEXT}
              />
              <InputQuestion
                id="rentalIncome"
                control={control}
                label={assetConstants.PROPERTY_RENTAL_INCOME.LABEL}
                restrictedCharSet={INTEGERS_ONLY}
                helpText={assetConstants.PROPERTY_RENTAL_INCOME.HELP_TEXT}
              />

              <InputQuestion
                id="rentalExpenses"
                control={control}
                label={assetConstants.PROPERTY_RENTAL_EXPENSES.LABEL}
                restrictedCharSet={INTEGERS_ONLY}
                helpText={assetConstants.PROPERTY_RENTAL_EXPENSES.HELP_TEXT}
              />
            </>
          )}
        </>
      )}
    </form>
  )
}
