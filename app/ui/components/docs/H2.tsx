import Link from "next/link"
import { ReactNode } from "react"

/*
Every heading on my markdown pages contains an ID, and is wrapped in a link to itself. 
This makes it easy for readers to tap on the link to send it to their URL bar, 
or to right-click/long-press and copy a link to the part of the article they want to link to.
*/
export default function H2({ id, children }: { id?: string; children?: ReactNode }) {
  if (id) {
    return (
      <Link href={`#${id}`} tabIndex={-1}>
        <h2 id={id} className="text-primary-foreground mt-4 mb-2 text-xl">
          {children}
        </h2>
      </Link>
    )
  }
}
