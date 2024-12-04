import { Country } from "@/app/lib/data/schema/config"

export interface AutomatedDrawdown {
  id: string
  from: string
  fromName: string
  year: number
  to: string
  migrateAll: false
  value: number
}

interface MandatoryDrawdownPercentageForYear {
  ageTo: number
  percentage: number
}
export type MandatoryDrawdownPercentages = Partial<Record<Country, MandatoryDrawdownPercentageForYear[]>>
