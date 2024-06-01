"use client"
import { useSearchParams } from "next/navigation"

import { getIncomeTaxCalculator } from "@/app/lib/calculations/tax/taxCalcs/getTaxCalculator"
import { Country } from "@/app/lib/calculations/tax/taxCalcs/types"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { Card } from "@/app/ui/components/Card"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { DECIMALS_ONLY, INTEGERS_ONLY } from "@/app/ui/components/common/formRegExes"
import { Container } from "@/app/ui/components/Container"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { SelectQuestion } from "@/app/ui/components/form/SelectQuestion"

import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline"
import { useState, useContext } from "react"
import { useForm } from "react-hook-form"
import { contextConstants } from "../../(withNavBar)/(forms)/(configEdit)/context/contextConstants"
import { getStartingYear } from "@/app/lib/calculations/utils/getStartingYear"

// TODO: make this a common utility
const scrollFieldIntoView = (id: string) => {
  const field = document.getElementById(id)
  if (field) {
    field.focus({ preventScroll: false })
    field.scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" })
  }
}

interface ChangedFormData {
  // id: string
  taxResident: Country
  currency: Country
  au2ukExchangeRate: number
  income: number
}

export default function ToolsPage() {
  const [tax, setTax] = useState<number>()
  const searchParams = useSearchParams()

  const { selectedScenario } = useContext(ScenarioContext)

  const navigation = useNavigation()

  const debug = searchParams.get("debug")

  const {
    handleSubmit,
    control,
    // reset,
    formState: { isDirty }
    // setFocus
    // clearErrors
  } = useForm<ChangedFormData>()

  const alertId = "calculatedTax"

  const handleBack = () => {
    navigation.goBack()
  }

  const handleOnClick = (data: ChangedFormData) => {
    const { taxResident, currency, au2ukExchangeRate, income } = data
    const incomeTaxCalculator = getIncomeTaxCalculator({
      taxResident,
      currency,
      inflationContext: undefined,
      au2ukExchangeRate
    })
    const ownersTaxAmt = incomeTaxCalculator.getTax(income, getStartingYear())
    setTax(ownersTaxAmt)
    // setFocus("id")
    scrollFieldIntoView(alertId)
  }

  return (
    <Container>
      <div className="flex flex-col items-center text-primary">
        <Button onClick={handleBack} buttonType={ButtonType.tertiary}>
          <div className="flex items-center gap-2">
            <ChevronDoubleLeftIcon className="h-6 w-6" />
            <div>Back</div>
          </div>
        </Button>
        <h1>Income tax calculator</h1>
      </div>

      <Card>
        {tax && (
          <Alert id={alertId} alertType={AlertType.success}>
            <div className="flex gap-2">
              <div className="font-bold">Calculated income tax (in selected currency) =</div>
              <div>{tax}</div>
            </div>
          </Alert>
        )}

        {/* @ts-ignore */}
        <SelectQuestion
          id="taxResident"
          control={control}
          label={contextConstants.TAX_RESIDENCY.LABEL}
          // defaultValue=""
          editable={true}
          options={[
            { value: "AU", label: "Australia" },
            { value: "SC", label: "Scotland" }
          ]}
        />
        <SelectQuestion
          id="currency"
          control={control}
          label={contextConstants.CURRENCY.LABEL}
          // defaultValue=""
          editable={true}
          helpText={contextConstants.CURRENCY.HELP_TEXT}
          options={[
            { value: "AU", label: "AUD" },
            { value: "SC", label: "GBP" }
          ]}
        />
        <InputQuestion
          id="au2ukExchangeRate"
          control={control}
          label={contextConstants.AU_2_UK_EXCHANGE_RATE.LABEL}
          // defaultValue=""
          editable={true}
          // validationRules={changeDetailsValidation}
          restrictedCharSet={DECIMALS_ONLY}
          helpText={contextConstants.AU_2_UK_EXCHANGE_RATE.HELP_TEXT}
        />
        <InputQuestion
          id="income"
          control={control}
          label="Income amount"
          // defaultValue=""
          editable={true}
          // validationRules={changeDetailsValidation}
          restrictedCharSet={INTEGERS_ONLY}
        />
        <Button onClick={handleSubmit(handleOnClick)} buttonType={ButtonType.primary}>
          Calculate
        </Button>
      </Card>
      {debug && (
        <Card>
          <h2 className="text-primary">Selected scenario config</h2>
          <pre>{JSON.stringify(selectedScenario, null, 4)}</pre>
        </Card>
      )}
    </Container>
  )
}
