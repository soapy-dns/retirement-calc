import type { MDXComponents } from "mdx/types"
import Anchor from "./app/ui/components/docs/Anchor"
import LI from "./app/ui/components/docs/LI"
import UL from "./app/ui/components/docs/UL"
import H1 from "./app/ui/components/docs/H1"
import H2 from "./app/ui/components/docs/H2"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    h1: H1,
    h2: H2,
    a: Anchor,
    ul: UL,
    li: LI
  }
}
