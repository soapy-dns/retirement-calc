import { MouseEvent, MouseEventHandler, SyntheticEvent } from "react"

export enum ButtonType {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary"
}
interface IButton {
  buttonType?: ButtonType
  disabled?: boolean
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  // onClick: (e: SyntheticEvent) => void

  // onClick: (e: MouseEvent<HTMLButtonElement, MouseEvent<Element, MouseEvent>>) => void

  // onClick: (e: MouseEvent<HTMLButtonElement, MouseEvent<Element, MouseEvent>>) => void

  // onClick: (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
}
export const Button: React.FC<IButton> = ({ buttonType, disabled = false, onClick, children }) => {
  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    // const handleOnClick = (e: SyntheticEvent) => {
    // const handleOnClick = (e: MouseEventHandler<HTMLButtonElement>) => {
    // const handleOnClick = (e: MouseEvent<HTMLButtonElement, MouseEvent<Element, MouseEvent>>) => {
    // const handleOnClick = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    onClick(e)
  }
  // 'MouseEvent<HTMLButtonElement, MouseEvent>' is not assignable to type 'MouseEvent<HTMLButtonElement, MouseEvent<Element, MouseEvent>>'.
  if (buttonType === ButtonType.primary) {
    return (
      <button
        onClick={handleOnClick}
        disabled={disabled}
        className="my-4 mx-4 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-opacity-75 focus:ring-primary bg-primary py-1 px-4 shadow-md shadow-primary-darker/50 hover:shadow-primary-darker/25 text-white hover:bg-primary-darker disabled:opacity-40 display-block w-full flex justify-center"
      >
        {children}
      </button>
    )
  } else if (buttonType === ButtonType.secondary) {
    return (
      <button
        onClick={handleOnClick}
        disabled={disabled}
        className="display-block w-full my-4 mx-4 rounded-full border-2  border-primary  py-1 px-4 text-primary  disabled:opacity-40 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-opacity-75 focus:ring-primary flex flex-row justify-center"
      >
        {children}
      </button>
    )
  } else {
    // This has a different y margin than the other buttons which may not be good
    return (
      <button onClick={handleOnClick} disabled={disabled} className="py-1 text-primary  disabled:opacity-40">
        {children}
      </button>
    )
  }
}
