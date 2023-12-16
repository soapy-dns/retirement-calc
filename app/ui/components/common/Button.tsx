import { MouseEvent, SyntheticEvent } from "react"

export enum ButtonType {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary"
}
interface IButton {
  buttonType?: ButtonType
  disabled?: boolean
  onClick: (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
}
export const Button: React.FC<IButton> = ({ buttonType, disabled = false, onClick, children }) => {
  const handleOnClick = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    onClick(e)
  }
  // 'MouseEvent<HTMLButtonElement, MouseEvent>' is not assignable to type 'MouseEvent<HTMLButtonElement, MouseEvent<Element, MouseEvent>>'.
  if (buttonType === ButtonType.primary) {
    return (
      <button
        onClick={handleOnClick}
        disabled={disabled}
        className="my-4 mx-4 rounded-full bg-primary py-1 px-4 text-white hover:bg-primary-darker disabled:opacity-40"
      >
        {children}
      </button>
    )
  } else if (buttonType === ButtonType.secondary) {
    return (
      <button
        onClick={handleOnClick}
        disabled={disabled}
        className="my-4 mx-4 rounded-full border-2  border-primary  py-1 px-4 text-primary disabled:opacity-40 "
      >
        {children}
      </button>
    )
  } else {
    // This has a different y margin than the other buttons which may not be good
    return (
      <button onClick={handleOnClick} disabled={disabled} className="mx-4 py-1 text-primary  disabled:opacity-40">
        {children}
      </button>
    )
  }
}
