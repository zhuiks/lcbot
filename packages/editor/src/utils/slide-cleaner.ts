import { ChordSlide, Chord } from "@bit/zhuiks.lcbot.core.chords";

const slideCleaner = (slides: ChordSlide[]) => (
  slides.map((slide: ChordSlide) => {
      const cleanChords = slide.chords.find((chordsLine) => (
          chordsLine.length && (chordsLine.length > 1 || chordsLine[0].root !== "_")
      ))
          ? slide.chords.map(chordsLine => chordsLine.map((chord: Chord) => (
              Object.fromEntries(
                  Object.entries(chord).map(([key, val]) =>
                      [key, val === '' ? undefined : val])
              )
          )))
          : null;
      return {
          ...slide,
          name: slide.name === '' ? undefined : slide.name,
          chords: cleanChords,
      }
  })
)

export default slideCleaner;