"use client"

import { documentDetails } from "@/app/docs/documentDetails"
import Anchor from "@/app/ui/components/docs/Anchor"
import { usePathname } from "next/navigation"
import clsx from "clsx"

const DesktopSideMenu: React.FC = () => {
  const pathname = usePathname()

  return (
    <div className="flex flex-col mt-10 divide-y divide-primary divide-dashed">
      {Object.values(documentDetails).map((it, index) => {
        return (
          <Anchor key={index} href={it.url} className="leading-8">
            <div
              className={clsx("", {
                "font-bold": pathname === it.url
              })}
            >
              {it.menuText}
            </div>
          </Anchor>
        )
      })}
    </div>
  )
}
export { DesktopSideMenu }
