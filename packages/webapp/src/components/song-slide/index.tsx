import React from 'react'
import { SlideType } from '@bit/zhuiks.lcbot.core.types'
import { ChordSlide } from '@bit/zhuiks.lcbot.core.chords'
import styled from 'styled-components'
import ChordsLine from './chords-line'
import LyricsLine from './lyrics-line'

interface SlideProps {
  readonly type: SlideType
}
const Slide = styled.div<SlideProps>`
  position: relative;
  z-index: 0;
  margin: 0 -1em;
  padding: 0.6em 1em;
  background-color: ${props => props.type === SlideType.CHORUS ? '#d0a16e3d' : 'transparent'};
`
const SlideTitle = styled.h3`
  position: absolute;
  color: #cccccc;
  top: 0;
  margin-inline-start: -0.4em;
`
interface LineContainerProps {
  readonly slideType: SlideType
}
const LineContainer = styled.div<LineContainerProps>`
  margin: 0;
  min-height: 1em;
  position: relative;
  padding-inline-start: ${props => props.slideType === SlideType.CHORUS ? '1em' : '0'};
`;


interface SongSlideProps {
  slide: ChordSlide
  displayChords?: boolean
}

const SongSlide: React.FC<SongSlideProps> = ({ slide, displayChords = false }) => {
  const toDisplayChords = displayChords && slide.chords && slide.chords.find((chordsLine) => (
    chordsLine.length && (chordsLine.length > 1 || chordsLine[0].root !== "_")
  )) !== undefined
  return (
    <Slide type={slide.type}>
      {slide.name &&
        <SlideTitle>{slide.name}</SlideTitle>}
      {
        slide.lines && slide.lines.map((str, i) => (
          <LineContainer key={i} slideType={slide.type}>
            {toDisplayChords && <ChordsLine chords={slide.chords[i]} />}
            <LyricsLine text={str} chordsPadding={toDisplayChords} />
          </LineContainer>

        ))
      }
    </Slide>
  )
}
export default SongSlide;
