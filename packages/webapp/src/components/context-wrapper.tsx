import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { ThemeProvider } from "styled-components"
import themes from "../themes"

import i18n from "i18next"
import { initReactI18next, I18nextProvider } from 'react-i18next'
import translResources from "../locales/resources.json"
import { idDecomp } from "../utils/id-compress"

export const BookmarkContext = React.createContext({
  bookmarks: [],
  initBookmarks: (bkrs: []) => {},
  updateBookmarks: (id: string) => {}
})

const ContextWrapper = ({ children, pageContext, location }) => {
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
    console.log(location.search)
  const searchParams = new URLSearchParams(location.search)
  let bookmarkedIds = []
  if(searchParams.has('t')) {
    bookmarkedIds = idDecomp(searchParams.get('t'))
  }

  const [bookmarks, setBookmarks] = React.useState(bookmarkedIds)
  const initBookmarks = (bkrs: []) => {
    setBookmarks(bkrs)
  }
  const updateBookmarks = (id: string) => {
    const index = bookmarks.indexOf(id);
    if (index > -1) {
      bookmarks.splice(index, 1);        
      setBookmarks(bookmarks.filter(el => el !== id))
    } else {
      setBookmarks(bookmarks.concat(id))
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <BookmarkContext.Provider value={{bookmarks, initBookmarks, updateBookmarks}}>
          {children}
        </BookmarkContext.Provider>
      </I18nextProvider>
    </ThemeProvider>
  )

}

export default ContextWrapper