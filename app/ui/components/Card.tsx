import { AlertType } from "./alert/Alert"
import { getBackgroundColor } from "./alert/utils"

interface CardProps {
  type?: AlertType
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ children, type }) => {
  const bgColor = getBackgroundColor(type)

  return <div className={`mb-8 border bg-gray-50 p-6 shadow-lg ${bgColor}`}>{children} </div>
}
