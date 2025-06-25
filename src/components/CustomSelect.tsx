import { useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"

interface CustomSelectProps {
  options: { value: string; label: ReactNode }[]
  selected: { value: string; label: ReactNode }
  onChange: (value: string) => void
}

export function CustomSelect({ options, selected, onChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option: { value: string; label: ReactNode }) => {
    onChange(option.value)
    setIsOpen(false)
  }

  return (
    <div className="custom-select-container">
      <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
        <div className="custom-select-selected-label">{selected.label}</div>
        <ChevronDown style={{ width: "1rem", height: "1rem", transform: isOpen ? "rotate(180deg)" : "none" }} />
      </div>
      {isOpen && (
        <div className="custom-select-options">
          {options.map((option) => (
            <div key={option.value} className="custom-select-option" onClick={() => handleSelect(option)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
