interface IContainer {
  children: React.ReactNode
}
export const Container: React.FC<IContainer> = ({ children }) => {
  return <div className=" container mx-auto max-w-2xl px-4">{children}</div>
}
