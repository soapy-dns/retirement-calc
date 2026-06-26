import { generateMock } from "@anatine/zod-mock"

import {
  CashSchema,
  InflationSchema,
  IScenario,
  ScenarioSchema,
  PropertySchema,
  SharesSchema,
  SuperSchema
} from "@/app/lib/data/schema/config"
import { AuBank } from "./calculations/assets/AuBank"
import { AuSuper } from "./calculations/assets/AuSuper"
import { AuShares } from "./calculations/assets/AuShares"
import { AuProperty } from "./calculations/assets/AuProperty"

export const generateMockScenarioConfig = (): IScenario => {
  return generateMock(ScenarioSchema)
}

export const generateMockBankAsset = (mockScenarioConfig: IScenario, startYear: number): AuBank => {
  const mockBankConfig = generateMock(CashSchema)
  const bankAsset = new AuBank(mockBankConfig, startYear, mockScenarioConfig)

  return bankAsset
}

export const generateMockSuperAsset = (mockScenarioConfig: IScenario, startYear: number): AuSuper => {
  const mockSuperConfig = generateMock(SuperSchema)
  return new AuSuper(mockSuperConfig, startYear, mockScenarioConfig)
}

export const generateMockSharesAsset = (mockScenarioConfig: IScenario, startYear: number): AuShares => {
  const mockSharesConfig = generateMock(SharesSchema)
  return new AuShares(mockSharesConfig, startYear, mockScenarioConfig)
}

export const generateMockPropertyAsset = (mockScenarioConfig: IScenario, startYear: number): AuProperty => {
  const mockPropertyConfig = generateMock(PropertySchema)
  const mockInflationContext = generateMock(InflationSchema)

  return new AuProperty(mockPropertyConfig, startYear, mockScenarioConfig, mockInflationContext)
}
