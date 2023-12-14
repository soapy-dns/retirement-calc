"use client"
import { ConfigTabProvider } from "@/app/ui/context/ConfigTabProvider"

export default function LayoutWithTabContext({ children }: { children: React.ReactNode }) {
  return <ConfigTabProvider>{children}</ConfigTabProvider>
}
