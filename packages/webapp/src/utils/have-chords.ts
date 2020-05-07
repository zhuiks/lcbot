import { ChordSlide } from "@bit/zhuiks.lcbot.core.chords";

interface SongDetails {
  __typename: "Song";
  id: string;
  title: string | null;
  slides: (ChordSlide | null)[] | null;
  links: (string | null)[] | null;
}


export default function haveChords(song: SongDetails) {
  if (!song.slides) return false
  return song.slides.find(slide => (
    slide.chords && slide.chords.find((chordsLine) => (
      chordsLine.length && (chordsLine.length > 1 || chordsLine[0].root !== "_")
    )) !== undefined
  )) !== undefined

}