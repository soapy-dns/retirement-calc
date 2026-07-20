import { zocker } from "zocker"

import { ZodObject } from "zod"

import {
  CashSchema,
  InflationSchema,
  IScenario,
  ScenarioSchema,
  PropertySchema,
  SharesSchema,
  SuperSchema,
  IAsset
} from "@/app/lib/data/schema/config"
import { AuBank } from "./calculations/assets/AuBank"
import { AuSuper } from "./calculations/assets/AuSuper"
import { AuShares } from "./calculations/assets/AuShares"
import { AuProperty } from "./calculations/assets/AuProperty"
import { InflationContext } from "@/app/lib/calculations/types"

export function generateMock<T>(zodSchema: ZodObject<any>): T {
    const mockData = zocker(zodSchema).generate()
    return mockData as T
  
}

export const generateMockScenarioConfig = (): IScenario => {
  return generateMock(ScenarioSchema)
}

export const generateMockBankAsset = (mockScenarioConfig: IScenario, startYear: number): AuBank => {
  const mockBankConfig = generateMock<IAsset>(CashSchema)
  const bankAsset = new AuBank(mockBankConfig, startYear, mockScenarioConfig)

  return bankAsset
}

export const generateMockSuperAsset = (mockScenarioConfig: IScenario, startYear: number): AuSuper => {
  const mockSuperConfig = generateMock<IAsset>(SuperSchema)
  return new AuSuper(mockSuperConfig, startYear, mockScenarioConfig)
}

export const generateMockSharesAsset = (mockScenarioConfig: IScenario, startYear: number): AuShares => {
  const mockSharesConfig = generateMock<IAsset>(SharesSchema)
  return new AuShares(mockSharesConfig, startYear, mockScenarioConfig)
}

export const generateMockPropertyAsset = (mockScenarioConfig: IScenario, startYear: number): AuProperty => {
  const mockPropertyConfig = generateMock<IAsset>(PropertySchema)
  const mockInflationContext = generateMock<InflationContext>(InflationSchema)

  return new AuProperty(mockPropertyConfig, startYear, mockScenarioConfig, mockInflationContext)
}
