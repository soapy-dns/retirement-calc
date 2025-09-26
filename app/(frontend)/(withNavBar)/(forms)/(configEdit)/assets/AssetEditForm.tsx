import { ALPHA_NUMERIC, INTEGERS_ONLY } from "@/app/ui/components/common/formRegExes"
import { CheckboxQuestion } from "@/app/ui/components/form/CheckboxQuestion"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { RadioButtonQuestion, RadioQuestionVariant } from "@/app/ui/components/form/RadioButtonQuestion"
import { SelectQuestion } from "@/app/ui/components/form/SelectQuestion"
import { TextAreaQuestion } from "@/app/ui/components/form/TextAreaQuestion"
import { yesNoOptions } from "@/app/ui/utils/yesNoOptions"
import { FunctionComponent } from "react"
import { assetConstants } from "./assetConstants"
import { assetTypeOptions, drawdownOrderOptions } from "./assetTypeOptions"
import { validateOwners } from "@/app/ui/validation/ownersValidation"
import { YesNo } from "../types"
import {
  isCapitalAsset,
  isCashAsset,
  isDefinedBenefitAsset,
  isIncomeAsset,
  isLiquidAsset,
  isPropertyAsset
} from "@/app/ui/utils"
import { AssetClass, OwnersType } from "@/app/lib/data/schema/config"
import { useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { CountrySelector } from "@/app/ui/components/form/CountrySelector"
import { TextDisplayField } from "@/app/ui/components/TextDisplayField"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import IncomeAssetDetails from "./IncomeAssetDetails"

interface Props {
  register: Function
  assetType: AssetClass
  drawdownSet: string
  isRentedFormValue: YesNo
  isIncomeBucket: boolean
  owners: OwnersType
}

export const AssetEditForm: FunctionComponent<Props> = ({
  assetType,
  drawdownSet,
  isRentedFormValue,
  isIncomeBucket,
  owners,
  register
}) => {
  const { getCurrencySymbol } = useContextConfig()
  const currency = getCurrencySymbol()
  const showDrawdown = drawdownSet === "Y"
  const ownerOptions = owners.map((it) => ({ label: it.ownerName, value: it.identifier }))

  return (
    <form>
      <InputQuestion
        id="name"
        label={assetConstants.NAME.LABEL}
        restrictedCharSet={ALPHA_NUMERIC}
        helpText={assetConstants.NAME.HELP_TEXT}
      />

      {isIncomeBucket && (
        <div className="mb-8">
          <Alert alertType={AlertType.INFO} heading="Note.">
            <>
              <p>Income from other assets is annually accumulated in this &apos;Cash&apos; asset.</p>
              <p>It cannot be removed or disabled as it is integral to the calculation process.</p>
            </>
          </Alert>
        </div>
      )}

      <TextAreaQuestion
        id="description"
        label={assetConstants.DESCRIPTION.LABEL}
        helpText={assetConstants.DESCRIPTION.HELP_TEXT}
      />

      {!isIncomeBucket ? (
        <SelectQuestion
          id="assetType"
          label={assetConstants.CLASS.LABEL}
          options={assetTypeOptions}
          editable={true}
          helpText={assetConstants.CLASS.HELP_TEXT}
          summaryText={assetConstants.SUMMARY[assetType]}
        />
      ) : (
        <TextDisplayField label={assetConstants.CLASS.LABEL} value="Cash" />
      )}

      {!isIncomeBucket && (
        <RadioButtonQuestion
          id="disabled"
          label={assetConstants.DISABLED.LABEL}
          values={yesNoOptions}
          variant={RadioQuestionVariant.BLOCK}
          helpText={assetConstants.DISABLED.HELP_TEXT}
        />
      )}

      <CountrySelector id="country" label={assetConstants.COUNTRY.LABEL} helpText={assetConstants.COUNTRY.HELP_TEXT} />

      {isDefinedBenefitAsset(assetType) && (
        <RadioButtonQuestion
          id="isStatePension"
          label={assetConstants.IS_STATE_PENSION.LABEL}
          values={yesNoOptions}
          variant={RadioQuestionVariant.BLOCK}
          helpText={assetConstants.IS_STATE_PENSION.HELP_TEXT}
        />
      )}

      <CheckboxQuestion
        id="owners"
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
            label={assetConstants.VALUE.LABEL}
            prefix={currency}
            // restrictedCharSet={INTEGERS_ONLY}
            helpText={assetConstants.VALUE.HELP_TEXT}
          />

          {isCashAsset(assetType) && (
            <RadioButtonQuestion
              id="incomeBucket"
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
                values={yesNoOptions}
                variant={RadioQuestionVariant.BLOCK}
                helpText={assetConstants.CAN_DRAWDOWN.HELP_TEXT}
              />

              {showDrawdown && (
                <>
                  <SelectQuestion
                    id="drawdownOrder"
                    label={assetConstants.DRAWDOWN_ORDER.LABEL}
                    options={drawdownOrderOptions}
                    helpText={assetConstants.DRAWDOWN_ORDER.HELP_TEXT}
                  />
                  <InputQuestion
                    id="drawdownFrom"
                    label={assetConstants.DRAWDOWN_FROM.LABEL}
                    restrictedCharSet={INTEGERS_ONLY}
                    helpText={assetConstants.DRAWDOWN_FROM.HELP_TEXT}
                  />
                  <InputQuestion
                    id="preferredMinAmt"
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

      {isIncomeAsset(assetType) && <IncomeAssetDetails assetType={assetType} />}

      {isPropertyAsset(assetType) && (
        <>
          <RadioButtonQuestion
            id="isRented"
            label={assetConstants.PROPERTY_IS_RENTED.LABEL}
            values={yesNoOptions}
            variant={RadioQuestionVariant.BLOCK}
            helpText={assetConstants.PROPERTY_IS_RENTED.HELP_TEXT}
          />
          {isRentedFormValue === "Y" && (
            <>
              <InputQuestion
                id="rentalStartYear"
                label={assetConstants.RENTAL_START_YEAR.LABEL}
                restrictedCharSet={INTEGERS_ONLY}
                helpText={assetConstants.RENTAL_START_YEAR.HELP_TEXT}
              />

              <InputQuestion
                id="rentalEndYear"
                label={assetConstants.RENTAL_END_YEAR.LABEL}
                restrictedCharSet={INTEGERS_ONLY}
                helpText={assetConstants.RENTAL_END_YEAR.HELP_TEXT}
              />
              <InputQuestion
                id="rentalIncome"
                label={assetConstants.PROPERTY_RENTAL_INCOME.LABEL}
                restrictedCharSet={INTEGERS_ONLY}
                helpText={assetConstants.PROPERTY_RENTAL_INCOME.HELP_TEXT}
              />

              <InputQuestion
                id="rentalExpenses"
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
          label={assetConstants.RATE_VARIATION.LABEL}
          restrictedCharSet={INTEGERS_ONLY}
          helpText={assetConstants.RATE_VARIATION.HELP_TEXT}
        />
      )}
    </form>
  )
}
