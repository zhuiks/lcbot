import ChordSlide from '../chord-slide';
import getChordIndex from '../get-chord-index';

const mockSlide = {
  lines: ['_123456789_123456789_123456789'],
  chords: [[
    {
      root: '_',
      text: '_12345',
    },
    {
      root: 'A',
      text: '6789_123456789'
    },
    {
      root: 'B',
      text: '_123456789'
    },
  ]]
}

describe('getChordIndex', () => {
  let slide;
  const line = 0;
  beforeEach(() => {
    slide = new ChordSlide(mockSlide);
  });
  afterEach(() => {
    slide = null;
  });

  it('initialise with the right slide', () => {
    expect(slide.lines).toHaveLength(1);
    expect(slide.chords).toHaveLength(1);
    expect(slide.chords[0]).toHaveLength(3);
  })

  it('works before the line', () => {
    const { chordIndex, charsFromTheEnd } = getChordIndex(slide, line, 0);
    expect(chordIndex).toEqual(0);
    const chord = slide.chords[line][chordIndex]
    expect(charsFromTheEnd).toEqual(-6);
    const prevChordText = chord.text.slice(0, charsFromTheEnd);
    expect(prevChordText).toEqual('');
    const newChordText = chord.text.slice(charsFromTheEnd);
    expect(newChordText).toEqual('_12345'); 
  })
  it('works before on the first char', () => {
    const { chordIndex, charsFromTheEnd } = getChordIndex(slide, line, 1);
    expect(chordIndex).toEqual(0);
    const chord = slide.chords[line][chordIndex]
    expect(charsFromTheEnd).toEqual(-6);
    const prevChordText = chord.text.slice(0, charsFromTheEnd);
    expect(prevChordText).toEqual('');
    const newChordText = chord.text.slice(charsFromTheEnd);
    expect(newChordText).toEqual('_12345'); 
  })
  it('works for the end of the first chord', () => {
    const { chordIndex, charsFromTheEnd } = getChordIndex(slide, line, 6);
    expect(chordIndex).toEqual(0);
    expect(charsFromTheEnd).toEqual(-1);
    const chord = slide.chords[line][chordIndex]
    const prevChordText = chord.text.slice(0, charsFromTheEnd);
    expect(prevChordText).toEqual('_1234');
    const newChordText = chord.text.slice(charsFromTheEnd);
    expect(newChordText).toEqual('5'); 
  })
  it('works for the second chord', () => {
    const { chordIndex, charsFromTheEnd } = getChordIndex(slide, line, 7);
    expect(chordIndex).toEqual(1);
    expect(charsFromTheEnd).toEqual(-14);
    const chord = slide.chords[line][chordIndex]
    const prevChordText = chord.text.slice(0, charsFromTheEnd);
    expect(prevChordText).toEqual('');
    const newChordText = chord.text.slice(charsFromTheEnd);
    expect(newChordText).toEqual('6789_123456789'); 
  })
  it('works for the end of the last chord', () => {
    const { chordIndex, charsFromTheEnd } = getChordIndex(slide, line, 29);
    expect(chordIndex).toEqual(2);
    expect(charsFromTheEnd).toEqual(-2);
    const chord = slide.chords[line][chordIndex]
    const prevChordText = chord.text.slice(0, charsFromTheEnd);
    expect(prevChordText).toEqual('_1234567');
    const newChordText = chord.text.slice(charsFromTheEnd);
    expect(newChordText).toEqual('89'); 
  })
  it('works for the end of the line', () => {
    const { chordIndex, charsFromTheEnd } = getChordIndex(slide, line, 30);
    expect(chordIndex).toEqual(2);
    expect(charsFromTheEnd).toEqual(-1);
    const chord = slide.chords[line][chordIndex]
    const prevChordText = chord.text.slice(0, charsFromTheEnd);
    expect(prevChordText).toEqual('_12345678');
    const newChordText = chord.text.slice(charsFromTheEnd);
    expect(newChordText).toEqual('9'); 
  })
})
