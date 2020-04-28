import React from "react"
import useDarkMode from "use-dark-mode"
import cn from "classnames"

import styles from "./styles.module.css"

function Figure({ image, children }) {
  const { value: isDarkMode } = useDarkMode()

  return (
    <figure>
      <img
        className={cn("m-0", { [styles.dark]: isDarkMode })}
        src={image}
        alt=""
      />
      <figcaption aria-hidden="true" className="text-center caption">
        {children}
      </figcaption>
    </figure>
  )
}

export default Figure
