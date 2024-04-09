import { Container } from "@/app/ui/components/Container"
import { DesktopSideMenu } from "@/app/ui/components/docs/DesktopSideMenu"
import Link from "next/link"
// import { ChevronDoubleRightIcon, Cog8ToothIcon } from "@heroicons/react/24/outline"
import { AppPath } from "@/app/ui/types"

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" py-2 mt-20">
      <Container>
        <div className="mb-4 flex items-center justify-center">
          <Link href={AppPath.config}>
            <div className="px-4 py-1  border  border-primary bg-white text-primary gap-2 rounded-full">
              <div>Go to App</div>
            </div>
          </Link>
        </div>

        <div className="flex flex-row gap-4">
          <div className="">
            <DesktopSideMenu />
          </div>
          <div className="flex-1  ">{children}</div>
        </div>
      </Container>
    </div>
  )
}
