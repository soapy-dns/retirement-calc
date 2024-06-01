interface Props {
  children: React.ReactNode
}
export const ButtonGroup: React.FC<Props> = ({ children }) => {
  return <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 mx-4">{children}</div>
}
