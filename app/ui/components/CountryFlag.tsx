import Image from "next/image"

import { Country } from "@/app/lib/data/schema/config"

interface CountryFlagProps {
  country: Country
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
  NI: "Northern Ireland",
  AU: "Australia"
}

// Flag svgs are 4 x 3
export const CountryFlag: React.FC<CountryFlagProps> = ({ country }) => {
  return (
    <div className="flex gap-2">
      <Image src={flag[country]} width={24} height={16} alt="Country flag" />
      {text[country]}
    </div>
  )
}
