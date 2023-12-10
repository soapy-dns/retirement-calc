import { AppNavBar } from "@/app/ui/AppNavBar"
import { Container } from "@/app/ui/Container"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // margin top because of navbar
    <div className="mt-10">{children}</div>
  )
}
