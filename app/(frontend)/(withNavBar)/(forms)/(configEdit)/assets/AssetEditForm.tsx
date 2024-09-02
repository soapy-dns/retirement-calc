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
import {
  isCapitalAsset,
  isCashAsset,
  isDefinedBenefitAsset,
  isIncomeAsset,
  isLiquidAsset,
  isPropertyAsset
} from "@/app/ui/utils"
import { AssetClass, OwnerContext, OwnersContext } from "@/app/lib/data/schema/config"
import { useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { CountrySelector } from "@/app/ui/components/form/CountrySelector"

interface Props {
  control: Control<any, object>
  register: Function
  assetType: AssetClass
  drawdownSet: string
  isRentedFormValue: YesNo
  owners: OwnersContext
}

export const AssetEditForm: FunctionComponent<Props> = ({
  control,
  assetType,
  drawdownSet,
  isRentedFormValue,
  owners,
  register
}) => {
  const { getCurrencySymbol } = useContextConfig()
  const currency = getCurrencySymbol()
  const showDrawdown = drawdownSet === "Y"
  const ownerOptions = owners.map((it) => ({ label: it.ownerName, value: it.identifier }))
  console.log("ownerOptions", ownerOptions)

  // TODO: change to use common
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
        summaryText={assetConstants.SUMMARY[assetType]}
      />
      <CountrySelector
        id="country"
        control={control}
        label={assetConstants.COUNTRY.LABEL}
        helpText={assetConstants.COUNTRY.HELP_TEXT}
      />

      {isDefinedBenefitAsset(assetType) && (
        <RadioButtonQuestion
          id="isStatePension"
          label={assetConstants.IS_STATE_PENSION.LABEL}
          control={control}
          values={yesNoOptions}
          variant={RadioQuestionVariant.BLOCK}
          helpText={assetConstants.IS_STATE_PENSION.HELP_TEXT}
        />
      )}

      <CheckboxQuestion
        id="owners"
        control={control}
        label={assetConstants.OWNERS.LABEL}
        options={ownerOptions}
        {...register("owners", {
          validate: { validateOwners }
        })}
        helpText={assetConstants.OWNERS.HELP_TEXT}
      />
      {isCapitalAsset(assetType) && (
        <>
          <InputQuestion
            id="value"
            control={control}
            label={assetConstants.VALUE.LABEL}
            prefix={currency}
            restrictedCharSet={INTEGERS_ONLY}
            helpText={assetConstants.VALUE.HELP_TEXT}
          />

          {isCashAsset(assetType) && (
            <RadioButtonQuestion
              id="incomeBucket"
              control={control}
              label={assetConstants.INCOME_BUCKET.LABEL}
              values={yesNoOptions}
              variant={RadioQuestionVariant.BLOCK}
              helpText={assetConstants.INCOME_BUCKET.HELP_TEXT}
            />
          )}

          {isLiquidAsset(assetType) && (
            <>
              <RadioButtonQuestion
                id="canDrawdown"
                label={assetConstants.CAN_DRAWDOWN.LABEL}
                control={control}
                values={yesNoOptions}
                variant={RadioQuestionVariant.BLOCK}
                helpText={assetConstants.CAN_DRAWDOWN.HELP_TEXT}
              />

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
                  <InputQuestion
                    id="preferredMinAmt"
                    control={control}
                    label={assetConstants.PREFERRED_MIN_AMT.LABEL}
                    restrictedCharSet={INTEGERS_ONLY}
                    helpText={assetConstants.PREFERRED_MIN_AMT.HELP_TEXT}
                  />
                </>
              )}
            </>
          )}
        </>
      )}

      {isIncomeAsset(assetType) && (
        <>
          <InputQuestion
            id="incomeAmt"
            control={control}
            label={assetConstants.INCOME.LABEL}
            prefix={currency}
            restrictedCharSet={INTEGERS_ONLY}
            helpText={assetConstants.INCOME.HELP_TEXT}
          />

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
        </>
      )}

      {isPropertyAsset(assetType) && (
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

      {assetType !== "AuShares" && (
        <InputQuestion
          id="rateVariation"
          control={control}
          label={assetConstants.RATE_VARIATION.LABEL}
          restrictedCharSet={INTEGERS_ONLY}
          helpText={assetConstants.RATE_VARIATION.HELP_TEXT}
        />
      )}
    </form>
  )
}
