import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { ThemeProvider } from "styled-components"
import themes from "../themes"

import i18n from "i18next"
import { initReactI18next, I18nextProvider } from 'react-i18next'
import translResources from "../locales/resources.json"


// const { I18nextProvider } = require("react-i18next")
// // exports.onPreRenderHTML = () => {
//   const i18n = require("./src/utils/i18n")
// // }
// exports.wrapRootElement = ({ element }) => {
//   return (
//     <I18nextProvider i18n={i18n}>
//       {element}
//     </I18nextProvider>

//   )
// }


//   )
// }
const ContextWrapper = ({ children, pageContext }) => {
  const data = useStaticQuery(graphql`
      query SiteQuery {
        site {
          siteMetadata {
            theme
            language
          }
        }
      }
    `)
  const currentTheme = data.site.siteMetadata.theme || 'default'
  const theme = themes[currentTheme]

  const currentLanguage = data.site.siteMetadata.language || 'en'
  const resources = {}
  resources[currentLanguage] = {
    translation: translResources[currentLanguage],
  }
  i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: currentLanguage,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </ThemeProvider>
  )

}

export default ContextWrapper