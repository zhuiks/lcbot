import { DefaultTheme } from "styled-components"
import patternBg from "../images/pattern.svg"
import flowerBg from "../images/flower.png"


const patterns: DefaultTheme = {
  background: `url('${patternBg}') repeat`,
  index: {
    link: '#441a01',
    searchBackground: `url('${flowerBg}') no-repeat center`,
  },
  song: {
    title: '#441a01',
    lyrics: '#441a01',
    chords: 'red',
    slideHeading: '#db8f0085',
    chorusBackground: '#eccc8d57',
  },
  footer: {
    borderTop: '1px solid #805f4c', 
    color: '#805f4c',
    link: '#d07524',
  }
}

export default patterns