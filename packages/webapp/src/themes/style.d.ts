import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    background?: string
    index?: {
      link?: string
      searchBackground?: string
    }
    song?: {
      title?: string
      lyrics?: string
      chords?: string
      slideHeading?: string
      chorusBackground?: string
    }
    footer?: {
      borderTop?: string
      background?: string
      color?: string
      link?: string
    }
  }
}
