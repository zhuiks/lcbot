const slideHaveChords = (slide) => {
  return slide.chords && slide.chords.find((chordsLine) => (
    chordsLine.length && (chordsLine.length > 1 || chordsLine[0].root !== "_")
  )) !== undefined
}

const haveChords = (song) => {
  if (!song.slides) return false
  return song.slides.find(slide => slideHaveChords(slide)) !== undefined
}
module.exports = {
  haveChords,
  slideHaveChords
}