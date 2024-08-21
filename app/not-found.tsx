import Link from "next/link"
import { AppPath } from "./ui/types"
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline"

export default function NotFound() {
  return (
    // <div className="flex justify-center items-center">
    <div className="flex flex-col justify-center items-center mt-16">
      <h2 className="text-primary-foreground">404 - This page cannot be found</h2>

      <div className="display-block my-4 rounded-full border-2  border-primary  py-1 px-4 text-primary-foreground  disabled:opacity-40 flex flex-row justify-center items-center">
        <Link href={AppPath.config} className=" focus:outline-2  focus:outline-primary">
          <div className="flex flex-row justify-center items-center">
            Return to App <ChevronDoubleRightIcon className="w-6 h-6" />
          </div>
        </Link>
      </div>
    </div>
  )
}
