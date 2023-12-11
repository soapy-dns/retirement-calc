export interface SuffixProps {
  text?: string
}

export const Suffix: React.FC<SuffixProps> = ({ text }) => {
  if (text) return <div className="inline-block rounded-r border bg-gray-100 p-1">{text}</div>
  return null
}
