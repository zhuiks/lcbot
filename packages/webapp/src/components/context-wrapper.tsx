import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ThemeProvider } from "styled-components"
import themes from "../themes"

const ContextWrapper = ({ children, pageContext}) => {
    const data = useStaticQuery(graphql`
      query SiteQuery {
        site {
          siteMetadata {
            theme
          }
        }
      }
    `)
    const currentTheme = data.site.siteMetadata.theme || 'default'
    const theme = themes[currentTheme]
    return (
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    )
  
  }
  
  export default ContextWrapper