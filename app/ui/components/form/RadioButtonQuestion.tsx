import React, { FunctionComponent } from "react"
import { Controller, Control } from "react-hook-form"
import { useError } from "../../hooks/useError"
import { FormGroup } from "../common/FormGroup"
import { Radio, RadioVariant } from "../common/Radio"
import { Toggle, ToggleVariant } from "../common/Toggle"
import { CountryTiles } from "../common/CountryTiles"

export enum RadioQuestionVariant {
  VERTICAL = "VERTICAL",
  HORIZONTAL = "HORIZONTAL",
  BLOCK = "BLOCK",
  TILE = "TILE"
}

type RadioProps = {
  label: string
  id: string
  name?: string
  control: Control<any, object>
  values: Array<{ label: string; value: string }>
  defaultValue?: string
  className?: string
  //   otherContainerProps?: object
  //   labelVariant?: LabelVariant
  validationRules?: object
  //   isRadioBlock?: boolean
  //   radioBlockCols?: 2 | 3 | 4 | 5 | 6 | undefined
  variant?: RadioQuestionVariant
  helpText?: string
  helpAriaLabel?: string
}

export const RadioButtonQuestion: FunctionComponent<RadioProps> = ({
  label,
  id,
  name,
  values,
  control,
  defaultValue,
  //   className,
  //   otherContainerProps = {},
  //   labelVariant,
  validationRules,
  //   isRadioBlock = false,
  //   radioBlockCols,
  //   OnRadioButtonChange = undefined
  variant,
  helpText,
  helpAriaLabel
}) => {
  const nameOfEl = name ?? id
  const errorMsg = useError(control, nameOfEl)

  return (
    <FormGroup
      id={id}
      label={label}
      // className={className}
      // labelVariant={labelVariant}
      // {...otherContainerProps}
      // role="radiogroup"
      errorMsg={errorMsg}
      helpText={helpText}
      helpAriaLabel={helpAriaLabel}
    >
      <Controller
        name={nameOfEl}
        control={control}
        defaultValue={defaultValue}
        rules={validationRules}
        render={({ field: { value, onChange, name: renderName, onBlur, ref } }) => {
          switch (variant) {
            case RadioQuestionVariant.BLOCK:
              return (
                <Toggle
                  id={id}
                  data-testid={id}
                  name={renderName}
                  options={values}
                  value={value}
                  onChange={onChange}
                  variant={ToggleVariant.FULLWIDTH}
                />
              )

            // case RadioQuestionVariant.TILE:
            //   console.log("radio tile")
            //   return (
            //     <CountryTiles
            //       id={id}
            //       data-testid={id}
            //       name={renderName}
            //       // options={values}
            //       value={value}
            //       onChange={onChange}
            //       //  variant={
            //       //    variant === RadioQuestionVariant.HORIZONTAL
            //       //      ? RadioVariant.HORIZONTAL
            //       //      : RadioVariant.VERTICAL
            //       //  }
            //       //   onBlur={() => setTimeout(onBlur, 100)}
            //       //   ref={ref}
            //     />
            //   )

            default:
              return (
                <Radio
                  id={id}
                  data-testid={id}
                  name={renderName}
                  options={values}
                  value={value}
                  onChange={onChange}
                  variant={
                    variant === RadioQuestionVariant.HORIZONTAL ? RadioVariant.HORIZONTAL : RadioVariant.VERTICAL
                  }
                  //   onBlur={() => setTimeout(onBlur, 100)}
                  //   ref={ref}
                />
              )
          }
        }}
      />
    </FormGroup>
  )
}
//       <>
//       {
//       () => { return switch (true) {
//         case variant === RadioQuestionVariant.BLOCK:
//           return (<Controller
//           name={nameOfEl}
//           control={control}
//           defaultValue={defaultValue}
//           rules={validationRules}
//           render={({ field: { value, onChange, name: renderName, onBlur, ref } }) => (
//             <Toggle
//               id={id}
//               data-testid={id}
//               name={renderName}
//               options={values}
//               value={value}
//               onChange={onChange}
//               variant={ToggleVariant.FULLWIDTH}
//             />
//           )}
//         />
//       default:
//         return (
//           <Controller
//               name={nameOfEl}
//               control={control}
//               defaultValue={defaultValue}
//               rules={validationRules}
//               render={({ field: { value, onChange, name: renderName, onBlur, ref } }) => (
// <Radio
//   id={id}
//   data-testid={id}
//   name={renderName}
//   options={values}
//   value={value}
//   onChange={onChange}
//   variant={variant === RadioQuestionVariant.HORIZONTAL ? RadioVariant.HORIZONTAL : RadioVariant.VERTICAL}
//   //   onBlur={() => setTimeout(onBlur, 100)}
//   //   ref={ref}
// />
//               )}
//             />
//         )

//       }}}
//             </>

//     </FormGroup>
//   )
// }

// {variant === RadioQuestionVariant.BLOCK ? (
//         <Controller
//           name={nameOfEl}
//           control={control}
//           defaultValue={defaultValue}
//           rules={validationRules}
//           render={({ field: { value, onChange, name: renderName, onBlur, ref } }) => (
//             <Toggle
//               id={id}
//               data-testid={id}
//               name={renderName}
//               options={values}
//               value={value}
//               onChange={onChange}
//               variant={ToggleVariant.FULLWIDTH}
//             />
//           )}
//         />
//       ) : (
//         <Controller
//           name={nameOfEl}
//           control={control}
//           defaultValue={defaultValue}
//           rules={validationRules}
//           render={({ field: { value, onChange, name: renderName, onBlur, ref } }) => (
//             <Radio
//               id={id}
//               data-testid={id}
//               name={renderName}
//               options={values}
//               value={value}
//               onChange={onChange}
//               variant={variant === RadioQuestionVariant.HORIZONTAL ? RadioVariant.HORIZONTAL : RadioVariant.VERTICAL}
//               //   onBlur={() => setTimeout(onBlur, 100)}
//               //   ref={ref}
//             />
//           )}
//         />
//       )}
