import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import React, { useState } from "react"
import { assetConstants } from "./assetConstants"
import { useContextConfig } from "@/app/ui/hooks/useContextConfig"
import { INTEGERS_ONLY } from "@/app/ui/components/common/formRegExes"
import { AssetType } from "@/app/lib/data/types"
import { AssetClass } from "@/app/lib/data/schema/config"

interface Props {
  // control: Control<any, object>
  //   register: Function
  assetType: AssetClass
  //   drawdownSet: string
  //   isRentedFormValue: YesNo
  //   isIncomeBucket: boolean
  //   owners: OwnersType
}

const IncomeAssetDetails: React.FC<Props> = ({ assetType }) => {
  //   const [income, setIncome] = useState("")
  //   const [asset, setAsset] = useState("")
  const { getCurrencySymbol } = useContextConfig()

  const currency = getCurrencySymbol()

  const showIncomeStartDate = [AssetType.AuDefinedBenefits, AssetType.Salary].includes(assetType)

  return (
    <>
      <InputQuestion
        id="incomeAmt"
        label={assetConstants.INCOME.LABEL}
        prefix={currency}
        restrictedCharSet={INTEGERS_ONLY}
        helpText={assetConstants.INCOME.HELP_TEXT}
      />

      {showIncomeStartDate && (
        <InputQuestion
          id="incomeStartYear"
          label={assetConstants.INCOME_START_YEAR.LABEL}
          restrictedCharSet={INTEGERS_ONLY}
          helpText={assetConstants.INCOME_START_YEAR.HELP_TEXT}
        />
      )}
      <InputQuestion
        id="incomeEndYear"
        label={assetConstants.INCOME_END_YEAR.LABEL}
        restrictedCharSet={INTEGERS_ONLY}
        helpText={assetConstants.INCOME_END_YEAR.HELP_TEXT}
      />
    </>
  )
}

export default IncomeAssetDetails
