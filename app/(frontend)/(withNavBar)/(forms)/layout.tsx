import { Container } from "@/app/ui/components/Container"

export default function LayoutWithContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-8 ">
      <Container>{children}</Container>
    </div>
  )
}
