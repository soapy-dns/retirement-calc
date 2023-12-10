import { Container } from "@/app/ui/Container"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <Container>{children}</Container>
    </div>
  )
}
