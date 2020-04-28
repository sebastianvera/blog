import React from "react"
import useDarkMode from "use-dark-mode"

const DarkToggle = () => {
  const { toggle, value } = useDarkMode()

  return (
    <label>
      <input type="checkbox" onChange={toggle} checked={value} /> Dark mode
    </label>
  )
}

export default DarkToggle
