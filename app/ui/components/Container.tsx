interface IContainer {
  children: React.ReactNode
}
export const Container: React.FC<IContainer> = ({ children }) => {
  return <div className=" container mx-auto my-0 max-w-2xl">{children}</div>
}
