export interface PrefixProps {
  text?: string
}

export const Prefix: React.FC<PrefixProps> = ({ text }) => {
  if (text)
    return <div className="inline-block rounded-l border-t border-l border-b border-muted0 bg-gray-100 p-1">{text}</div>
  return null
}
