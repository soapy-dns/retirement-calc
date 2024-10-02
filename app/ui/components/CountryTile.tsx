import Image from "next/image"

import { Country } from "@/app/lib/data/schema/config"
import clsx from "clsx"

interface CountryFlagProps {
  country: Country
  // selected?: boolean
}

const flag = {
  SC: "/images/gb-sct.svg",
  EN: "/images/gb-eng.svg",
  WA: "/images/gb-wls.svg",
  NI: "/images/gb-nir.svg",
  AU: "/images/au.svg"
}

const text = {
  SC: "Scotland",
  EN: "England",
  WA: "Wales",
  NI: "N. Ireland",
  AU: "Australia"
}

// DISPLAY ONLY!!!!!!
// DISPLAY ONLY!!!!!!
// DISPLAY ONLY!!!!!!
// DISPLAY ONLY!!!!!!

// Flag svgs are 4 x 3
export const CountryDislayTile: React.FC<CountryFlagProps> = ({ country }) => {
  return (
    <div
      className={clsx("flex flex-col gap-2   justify-center items-center w-[100px] h-[100px]", {
        // "border-2 border-primary": selected
      })}
    >
      <div className="border">
        <Image src={flag[country]} width={36} height={24} alt="Country flag" />
      </div>
      {text[country]}
    </div>
  )
}
