interface IAccordian {
  id?: string
  children: React.ReactNode
  //   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  //   heading: string
  //   content: React.ReactNode
}

export const Accordion: React.FC<IAccordian> = ({ id, children }: IAccordian) => {
  return <div id={id || "accordian"}>{children}</div>
}
