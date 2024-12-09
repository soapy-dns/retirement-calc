import type { Metadata } from "next"

import { inter } from "./ui/fonts"
import "./globals.css"
import { AppBanner } from "./ui/AppBanner"
import { useEffect } from "react"

export const metadata: Metadata = {
  title: "Retirement project",
  description: "Calculate how long your assets will last for."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log("inter.className", inter.className)

  return (
    <html lang="en">
      {/* <body className={`antialiased`}> */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
