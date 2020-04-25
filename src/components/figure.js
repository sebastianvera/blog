import React from "react"

function Figure({ image, children }) {
  return (
    <figure>
      <img className="m-0" src={image} alt={children} />
      <figcaption aria-hidden="true" className="text-center caption">
        {children}
      </figcaption>
    </figure>
  )
}

export default Figure
