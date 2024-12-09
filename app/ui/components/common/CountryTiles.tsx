import Image from "next/image"

import { MouseEvent, MouseEventHandler } from "react"
import { Country } from "@/app/lib/data/schema/config"
import clsx from "clsx"

const flag = {
  SC: "/images/gb-sct.svg",
  EN: "/images/gb-eng.svg",
  WA: "/images/gb-wls.svg",
  NI: "/images/gb-nir.svg",
  AU: "/images/au.svg"
}

const text: Record<Country, string> = {
  SC: "Scotland",
  EN: "England",
  WA: "Wales",
  NI: "N Ireland",
  AU: "Australia"
}

const options = ["SC", "EN", "WA", "NI", "AU"] as Country[]

export enum RadioVariant {
  VERTICAL = "VERTICAL",
  HORIZONTAL = "HORIZONTAL",
  BLOCK = "BLOCK"
}

interface CountryTilesProps {
  id: string
  name: string
  value: Country
  onChange: MouseEventHandler<HTMLInputElement>
  disabled?: boolean
}
export const CountryTiles: React.FC<CountryTilesProps> = ({ id, name, value, onChange }) => {
  return (
    <div className="flex flex-row gap-4 flex-wrap">
      {options.map((option) => {
        const selected = value === option

        return (
          <div
            key={`${option}`}
            className={clsx("flex flex-col border gap-2 justify-center items-center min-w-[100px] h-[100px] mt-2 ", {
              "border-2 border-primary": selected
              // border: !selected
            })}
          >
            <input
              id={`${id}-${option}`}
              data-testid={`${id}-${option}`}
              name={name}
              defaultChecked={value === option}
              value={option}
              onClick={onChange}
              className="hidden"
            />
            <label htmlFor={`${id}-${option}`}>
              <div className="flex justify-center">
                <Image src={flag[option]} width={36} height={24} alt="Country flag" className="border" />
              </div>
              {text[option]}
            </label>
          </div>
        )
      })}
    </div>
  )
}
