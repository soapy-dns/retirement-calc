import type { Metadata } from "next"

import { inter } from "./ui/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Retirement project",
  description: "Calculate how long your assets will last for."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <body className={`antialiased`}> */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
