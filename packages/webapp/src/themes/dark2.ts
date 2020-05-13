import { DefaultTheme } from "styled-components"
import searchBg from "../images/worship.jpg"
import pattern from "../images/pattern-dark.svg"

const dark2: DefaultTheme = {
  background: `#000 url(${pattern}) repeat`,
  index: {
    link: '#fff',
    searchBackground: `url('${searchBg}') no-repeat center`,
  },
  song: {
    title: '#aaa',
    lyrics: '#fefefe',
    chords: 'red',
    slideHeading: '#333',
    chorusBackground: '#2d2d2d80',
  },
  footer: {
    borderTop: '1px solid #888', 
    color: '#888',
    link: '#ccc',
  }
}

export default dark2