import { Container } from "@/app/ui/components/Container"
import { DesktopSideMenu } from "@/app/ui/components/docs/DesktopSideMenu"
import Link from "next/link"
import { AppPath } from "@/app/ui/types"
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-10 z-10 bg-white pt-10 pb-4 w-full">
        <div className="mb-4 flex items-center justify-center">
          <Link href={AppPath.config}>
            <div className="px-4 py-1  border-2 flex items-center border-primary bg-white text-primary gap-2 rounded-full">
              Go to App <ChevronDoubleRightIcon className="w-6 h-6" />
            </div>
          </Link>
        </div>
      </div>
      <div className="pt-36">
        <Container>
          <div className=" py-2 ">
            <div className="flex flex-row gap-4 ">
              <div className="relative">
                <div className="sticky top-48">
                  <DesktopSideMenu />
                </div>
              </div>

              <div className="flex-1  ">{children}</div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
