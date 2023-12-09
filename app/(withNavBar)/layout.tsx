import { AppNavBar } from "../ui/AppNavBar"
import { Container } from "../ui/Container"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-10 left-0 z-40 mb-4 inline-block min-w-full">
        <AppNavBar />
      </div>
      {children}
    </>
  )
}
