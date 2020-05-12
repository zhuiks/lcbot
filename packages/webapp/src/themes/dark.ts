import { DefaultTheme } from "styled-components"
import searchBg from "../images/worship.jpg"


const dark: DefaultTheme = {
  background: '#000',
  index: {
    link: '#fff',
    searchBackground: `url('${searchBg}') no-repeat center`,
  },
  song: {
    title: '#aaa',
    lyrics: '#fefefe',
    chords: 'red',
    slideHeading: '#333',
    chorusBackground: '#111',
  },
  footer: {
    borderTop: '1px solid #888', 
    color: '#888',
    link: '#ccc',
  }
}

export default dark