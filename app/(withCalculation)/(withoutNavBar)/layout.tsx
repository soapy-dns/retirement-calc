import { Container } from "@/app/ui/components/Container"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 py-8 ">
      <Container>{children}</Container>
    </div>
  )
}
