import { AppNavBar } from "../../ui/AppNavBar"
import { Container } from "../../ui/Container"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>
}
