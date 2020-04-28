import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

import DarkToggle from "./dark-toggle"
import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  const {
    site: {
      siteMetadata: { social },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: rhythm(1.5),
        }}
      >
        <h1
          style={{
            ...scale(1.5),
            margin: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
        <DarkToggle />
      </div>
    )
  } else {
    header = (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            margin: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
        <DarkToggle />
      </div>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://github.com/${social.github}`}
          >
            github
          </a>{" "}
          {` - `}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://twitter.com/${social.twitter}`}
          >
            twitter
          </a>
        </div>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
