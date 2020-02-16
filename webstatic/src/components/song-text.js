import React from 'react';

const SongText = ({ slides }) => (
  <>
    {slides.map(slide => (
      <div className={"slide slide-" + slide.type.toLowerCase()}>
        {slide.name &&
          <h3>{slide.name}</h3>}
        {
          slide.lines.map(line => (
            <p>{line}</p>
          ))
        }
      </div>
    ))}
  </>
);

export default SongText;
