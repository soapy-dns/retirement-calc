import type { Config } from "jest"
import nextJest from "next/jest.js"

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./"
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  maxWorkers: process.env.CI ? 2 : 1,
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // moduleNameMapper: {
  //   "^@/(.*)$": "<rootDir>/$1"
  // },
  slowTestThreshold: 2, // Highlights any file taking over 2 seconds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 55,
      lines: 84,
      statements: 84
    }
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
