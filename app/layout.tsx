import type { Metadata } from "next"

import { inter } from "./ui/fonts"
import "./globals.css"
import { AppBanner } from "./ui/AppBanner"

export const metadata: Metadata = {
  title: "The retirement project",
  description:
    "Using your current asset values and making estimates for external variables like inflation, your living expenses etc, project your wealth forward to get an idea of how long it will last."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log("inter.className", inter.className)
  return (
    <html lang="en">
      {/* <body className={`antialiased`}> */}
      <body className={`${inter.className} antialiased`}>
        <div className="fixed top-0 left-0 z-50 mb-4 inline-block min-w-full">
          <AppBanner />
        </div>
        {children}
      </body>
    </html>
  )
}
