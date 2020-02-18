import React from 'react';

const SongText = ({ slides }) => (
  <>
    {slides.map(slide => (
      <div className={"slide slide-" + slide.type.toLowerCase()}>
        {slide.name &&
          <h3>{slide.name}</h3>}
        {
          slide.lines.map(line => {
            const repeatStart = line.indexOf('|:') !== -1 ? ' repeat-start' : ''
            const repeatEnd = line.indexOf(':|') !== -1 ? ' repeat-end' : ''
            return <p className={repeatStart+repeatEnd}>{line.replace(/\|\:|\:\|/g, '')}</p>
          })
        }
      </div>
    ))}
  </>
);

export default SongText;
