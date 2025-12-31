// import { defineConfig, globalIgnores } from "eslint/config"
// import path from "node:path"
// import { fileURLToPath } from "node:url"

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// export default defineConfig([
//   globalIgnores(["**/node_modules/"]),
//   {
//     extends: ["next/core-web-vitals"],
//     plugins: ["next"]
//   }
// ])
// import { defineConfig } from "eslint-define-config"

import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts"
  ])
])

export default eslintConfig

// import { defineConfig } from "eslint/config"

// import path from "node:path"
// import { fileURLToPath } from "node:url"

// const __filename = fileURLToPath(import.meta.url)
// // const __dirname = path.dirname(__filename)

// export default defineConfig({
//   ignorePatterns: ["**/node_modules/"],
//   extends: ["next/core-web-vitals"],
//   plugins: ["next"]
// })
