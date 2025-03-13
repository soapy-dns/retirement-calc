"use client"

import { useEffect } from "react"
import { Button, ButtonType } from "../ui/components/common/Button"

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

/*
The error boundary - not including layout at this level.
Note, this isn't called if there is an error in any event functions eg onSubmit
*/
const Error: React.FC<Props> = ({ error, reset }: Props) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Oops, something went wrong!</h1>
      <Button buttonType={ButtonType.primary} onClick={reset}>
        Try again
      </Button>
    </div>
  )
}

export default Error

//
