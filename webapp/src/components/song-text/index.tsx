import React from 'react'
import { SlideInput, SlideType } from '@bit/zhuiks.lcbot.global-types'
import styled from 'styled-components'

interface SlideProps {
  readonly type: SlideType
}
const Slide = styled.div<SlideProps>`
  position: relative;
  z-index: 0;
  margin: 0 -1em;
  padding: 0.6em 1em;
  background-color: ${props => props.type === SlideType.CHORUS ? '#f5f5f5' : 'transparent'};
`
const SlideTitle = styled.h3`
  position: absolute;
  color: #cccccc;
  top: 0;
  margin-inline-start: -0.4em;
`
interface LineProps {
  readonly slideType: SlideType
}  
const Line = styled.p<LineProps>`
  margin: 0;
  min-height: 1em;
  position: relative;
  padding-inline-start: ${props => props.slideType === SlideType.CHORUS ? '1em' : '0'};
`
const Repeat = styled.span`
  position: absolute;
  height: 100%;
  z-index: -1;
  width: 1.5em;
  color: #cccccc;
  font-size: 0.7em;
  top: 0;
  inset-block-start: 0;
  left: 0;
  inset-inline-end: 0;
  border-inline-start: 2px solid #cccccc;
  padding-inline-start: 5px;
  padding-block-start: 1em;
`

interface SongTextProps {
    slides: SlideInput[]
}

const SongText: React.FC<SongTextProps> = ({ slides }) => (
    <article className="song-lyrics">
        {slides.map(slide => (
            <Slide type={slide.type}>
                {slide.name &&
                    <SlideTitle>{slide.name}</SlideTitle>}
                {
                    slide.lines && slide.lines.map(str => (
                        <Line slideType={slide.type}>
                            {str.replace(/\|:|:\|/g, '')}
                            {str.indexOf(':|') !== -1 ? (
                                <Repeat>2x</Repeat>
                            ) : ( str.indexOf('|:') !== -1 &&
                                <Repeat/>
                            )}
                        </Line>
                    ))
                }
            </Slide>
        ))}
    </article>
);

export default SongText;
