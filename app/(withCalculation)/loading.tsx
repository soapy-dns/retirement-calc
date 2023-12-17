import { Spinner } from "../ui/components/common/Spinner"

export default function Loading() {
  // NOTE: this is server side loading only.  Still required for certain situations.
  return <Spinner text="Calculating..." />
}
