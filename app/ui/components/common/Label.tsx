interface ILabel {
  htmlFor?: string
  children: React.ReactNode
  className?: string
}
export const Label: React.FC<ILabel> = ({ htmlFor, children, className }) => {
  return (
    <label className={`font-bold ${className}`} htmlFor={htmlFor}>
      {children}
    </label>
  )
}
