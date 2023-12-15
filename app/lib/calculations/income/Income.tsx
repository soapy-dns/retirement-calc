import { BasicYearData } from "../types"
import { IIncome } from "./types"

export abstract class Income {
  history: BasicYearData[] = [] // Maybe better not an array
  name = "UnNamed Income"
  description
  owners
  initialIncome
  percTaxFree = 0

  constructor({ name, description, owners, percTaxFree, initialIncome }: IIncome) {
    this.name = name
    this.description = description
    this.owners = owners
    this.initialIncome = initialIncome
    this.percTaxFree = percTaxFree
  }

  abstract calcNextYear(yearData: BasicYearData): BasicYearData
}
