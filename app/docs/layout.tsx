import { Container } from "@/app/ui/components/Container"
import { DesktopSideMenu } from "@/app/ui/components/docs/DesktopSideMenu"
import Link from "next/link"
import { AppPath } from "@/app/ui/types"
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" py-2 mt-20">
      <Container>
        <div className="mb-4 flex items-center justify-center">
          <Link href={AppPath.config}>
            <div className="px-4 py-1  border-2 flex items-center border-primary bg-white text-primary gap-2 rounded-full">
              Go to App <ChevronDoubleRightIcon className="w-6 h-6" />
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
