import React from 'react'
import { SlideInput } from '@bit/zhuiks.lcbot.global-types';

interface SongTextProps {
  slides: SlideInput[];
}

const SongText: React.FC<SongTextProps> = ({ slides }) => (
  <article className="song-lyrics">
    {slides.map(slide => (
      <div className={"slide slide-" + slide.type.toLowerCase()}>
        {slide.name &&
          <h3>{slide.name}</h3>}
        {
          slide.lines && slide.lines.map(line => {
            const repeatStart = line.indexOf('|:') !== -1 ? ' repeat-start' : ''
            const repeatEnd = line.indexOf(':|') !== -1 ? ' repeat-end' : ''
            return <p className={repeatStart+repeatEnd}>{line.replace(/\|:|:\|/g, '')}</p>
          })
        }
      </div>
    ))}
  </article>
);

export default SongText;
