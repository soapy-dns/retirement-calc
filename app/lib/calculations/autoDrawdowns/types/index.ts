import { Country } from "@/app/lib/data/schema/config"

// similar, but not the same as Transfer
export interface AutomatedDrawdown {
  id: string
  from: string
  fromName: string
  year: number
  to: string
  // migrateAll: false
  value: number
}

interface MandatoryDrawdownPercentageForYear {
  ageTo: number
  percentage: number
}
export type MandatoryDrawdownPercentages = Partial<Record<Country, MandatoryDrawdownPercentageForYear[]>>
