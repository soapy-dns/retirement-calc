import { Container } from "@/app/ui/components/Container"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" py-2">
      <Container>{children}</Container>
    </div>
  )
}
