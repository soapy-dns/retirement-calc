interface ILabel {
  htmlFor?: string
  children: React.ReactNode
}
export const Label: React.FC<ILabel> = ({ htmlFor, children }) => {
  return (
    <label className="font-bold" htmlFor={htmlFor}>
      {children}
    </label>
  )
}
