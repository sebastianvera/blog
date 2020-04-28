import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = ({ rhythm }) => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    a: {
      color: "var(--color-primary)",
    },
    h2: {
      color: "var(--color-tertiary)",
    },
    blockquote: {
      borderLeft: `${rhythm(3 / 16)} solid var(--color-blockquote-border)`,
    },
  }
}

Wordpress2016.bodyColor = `var(--color-background)`

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
