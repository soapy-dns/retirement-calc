import { Container } from "@/app/ui/components/Container"

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" py-2 mt-20">
      <Container>{children}</Container>
    </div>
  )
}
