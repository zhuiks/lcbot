import React, { useContext } from "react";
import styled from 'styled-components';
import ChordSpan from "./chord-span";
import { Chord } from "@bit/zhuiks.lcbot.core.chords";
import { DispatchContext, StateContext } from "./slide-reducer";
import ChordsToolbar from "./chords-toolbar";
import CaretSpan from "./caret-span";

const CHORDS_PADDING = 1.1;
const ChordsLine = styled.div`
    position: relative;
    display: flex;
`;

const BlockContainer = styled.div`
  position: relative;
  width: 100%;
`;

export interface ChordsBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  line: number;
  chords: Chord[];
  onChordClick?: (chordIndex: number, e: React.MouseEvent) => void
}

const ChordsBlock: React.FC<ChordsBlockProps> = ({ chords, line }) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const onClick = (chordIndex: number, e: React.MouseEvent) => {
    const lastClickX = e.clientX;
    // const { chordIndex, charsFromTheEnd } = getChordIndex(slide, line, pos);
    dispatch({ type: 'POSITION_CHANGE', payload: { line, chordIndex, event: e, } })
  }
  return (
    <BlockContainer onClick={e => onClick(-1, e)}>
      <ChordsLine className="chords" contentEditable={false}>
        {chords.map((chord: Chord, i: number) => (
          <ChordSpan key={i} chord={chord}
            onClick={e => {
              e.stopPropagation();
              onClick(i, e)
            }}
          />
        ))
        }
      </ChordsLine>
      {state && state.caretLine === line && (
        <>
          <ChordsToolbar />
          <CaretSpan />
        </>
      )}
    </BlockContainer >
  )
}

export default ChordsBlock;