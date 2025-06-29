import { Container } from "@/app/ui/components/Container"
import { DesktopSideMenu } from "@/app/ui/components/docs/DesktopSideMenu"
import Link from "next/link"
import { AppPath } from "@/app/ui/types"
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline"
import { AppBanner } from "../ui/AppBanner"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-0 left-0 z-50 mb-4 inline-block min-w-full">
        <AppBanner />
      </div>
      <div className="fixed top-10  bg-white/80 pt-10 pb-4 w-full backdrop-filter backdrop-blur-xs">
        <div className="mb-4 flex items-center justify-center">
          <div className="display-block my-4 rounded-full border-2  border-primary  py-1 px-4 text-primary-foreground  disabled:opacity-40 flex flex-row justify-center items-center">
            <Link href={AppPath.config} className=" focus:outline-2  focus:outline-primary">
              <div className="flex flex-row justify-center items-center">
                Go to App <ChevronDoubleRightIcon className="w-6 h-6" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="pt-36">
        <Container>
          <div className=" py-2 ">
            <div className="flex flex-row gap-8 ">
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
