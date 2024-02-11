import { IncomeConfig } from "@/app/lib/data/types"

// TODO: I think we might be better swapping the names of IncomeConfig and IIncome
export interface IIncome extends Omit<IncomeConfig, "className"> {}
