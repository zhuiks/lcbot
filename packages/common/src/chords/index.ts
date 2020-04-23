import { SlideType } from "../types";
import Chord from "./chord";

export { default as Chord } from './chord';
export { default as ChordSlide } from './chord-slide';
export { default as chordAction } from './chord-action';
export { default as getChordIndex } from './get-chord-index';

export interface IChordSlide {
  type?: SlideType;
  name?: string;
  lines?: string[];
  chords?: Chord[][];
}
