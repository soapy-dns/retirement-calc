import { AlertType } from "./alert/Alert"
import { getBackgroundColor } from "./alert/utils"

interface CardProps {
  type?: AlertType
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ children, type }) => {
  const bgColor = getBackgroundColor(type)

  return <div className={`mb-4 border bg-gray-50 p-4 px-8 shadow-md ${bgColor}`}>{children} </div>
}
