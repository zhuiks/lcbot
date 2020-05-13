import React from 'react'
import Toggle from "react-toggle"
import styled from "styled-components"

// import { RiFileMusicLine } from "react-icons/ri"

const Container = styled.div`
  display: flex;
  margin-bottom: 0.5em;
`
const Label = styled.label`
  font-size: 0.8em;
  color: ${props => props.theme.song.slideHeading};
`
Label.defaultProps = {
  theme: {
    song: { slideHeading: '#888' }
  }
}
const TheToggle = styled(Toggle)`
  touch-action: pan-x;

  display: inline-block;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  padding: 0;
  height: 24px;
  margin-inline-end: 10px;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;

& .react-toggle-screenreader-only {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

&.react-toggle--disabled {
  cursor: not-allowed;
  opacity: 0.5;
  -webkit-transition: opacity 0.25s;
  transition: opacity 0.25s;
}

&>.react-toggle-track {
  width: 50px;
  height: 24px;
  padding: 0;
  border-radius: 30px;
  background-color: #4D4D4D;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

&:hover:not(.react-toggle--disabled) .react-toggle-track {
  background-color: #000000;
}

&.react-toggle--checked .react-toggle-track {
  background-color: #19AB27;
}

&.react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track {
  background-color: #128D15;
}

& .react-toggle-track-check {
  position: absolute;
  width: 14px;
  height: 10px;
  top: 0px;
  bottom: 0px;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 0;
  left: 8px;
  opacity: 0;
  -webkit-transition: opacity 0.25s ease;
  -moz-transition: opacity 0.25s ease;
  transition: opacity 0.25s ease;
}

&.react-toggle--checked .react-toggle-track-check {
  opacity: 1;
  -webkit-transition: opacity 0.25s ease;
  -moz-transition: opacity 0.25s ease;
  transition: opacity 0.25s ease;
}

& .react-toggle-track-x {
  position: absolute;
  width: 10px;
  height: 10px;
  top: 0px;
  bottom: 0px;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 0;
  right: 10px;
  opacity: 1;
  -webkit-transition: opacity 0.25s ease;
  -moz-transition: opacity 0.25s ease;
  transition: opacity 0.25s ease;
}

&.react-toggle--checked .react-toggle-track-x {
  opacity: 0;
}

& .react-toggle-thumb {
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  position: absolute;
  top: 1px;
  left: 1px;
  width: 22px;
  height: 22px;
  border: 1px solid #4D4D4D;
  border-radius: 50%;
  background-color: #FAFAFA;

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  -webkit-transition: all 0.25s ease;
  -moz-transition: all 0.25s ease;
  transition: all 0.25s ease;
}

&.react-toggle--checked .react-toggle-thumb {
  left: 27px;
  border-color: #19AB27;
}

&.react-toggle--focus .react-toggle-thumb {
  -webkit-box-shadow: 0px 0px 3px 2px #0099E0;
  -moz-box-shadow: 0px 0px 3px 2px #0099E0;
  box-shadow: 0px 0px 2px 3px #0099E0;
}

&:active:not(.react-toggle--disabled) .react-toggle-thumb {
  -webkit-box-shadow: 0px 0px 5px 5px #0099E0;
  -moz-box-shadow: 0px 0px 5px 5px #0099E0;
  box-shadow: 0px 0px 5px 5px #0099E0;
}
`

interface ChordToggleProps {
  checked: boolean
  onToggle: (val: boolean) => void
}

const ChordToggle: React.FC<ChordToggleProps> = ({ checked, onToggle }) => (
  <Container>
    <TheToggle
      id='show-chords'
      checked={checked}
      onChange={(e) => onToggle(e.target.checked)} />
    <Label htmlFor='show-chords'>تظهر الكردات</Label>
  </Container>
)

export default ChordToggle