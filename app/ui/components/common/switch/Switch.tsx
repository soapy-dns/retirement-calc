import React, { ChangeEvent } from "react"

type Props = {
  label: string
  id: string
  onChange: Function
}

export const Switch: React.FC<Props> = ({ label, id, onChange }) => {
  // const nameOfEl = name ?? id

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault()
    onChange(event)
  }

  return (
    <div className="my-2">
      <label className="inline-flex items-center cursor-pointer gap-2">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
        <input type="checkbox" value="" className="sr-only peer" onChange={handleOnChange} />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-hidden peer-focus:ring-1 peer-focus:ring-primary/75  peer-focus:ring-offset-2 rounded-full peer  peer-checked:after:translate-x-full peer-checked:rtl:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary"></div>
      </label>
    </div>
  )
}
