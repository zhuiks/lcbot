import React, { useContext } from "react";
import styled from 'styled-components';
import ChordSpan from "./chord-span";
import { Chord } from "@bit/zhuiks.lcbot.core.chords";
import { DispatchContext, StateContext } from "./slide-reducer";
import ChordsToolbar from "./chords-toolbar";
import CaretSpan from "./caret-span";
import WidthCalculator from "./width-calculator";

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
}

const ChordsBlock: React.FC<ChordsBlockProps> = ({ chords, line }) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const onClick = (chordIndex: number, e: React.MouseEvent) => {
    // const { chordIndex, charsFromTheEnd } = getChordIndex(slide, line, pos);
    const lastClickX = e.clientX - (e.target as Element).getBoundingClientRect().x;
    dispatch({ type: 'POSITION_CHANGE', payload: { line, chordIndex, lastClickX, } })
  }
  return (
    <BlockContainer onClick={e => onClick(-1, e)}>
      <ChordsLine className="chords" contentEditable={false}>
        {chords.map((chord: Chord, i: number) => (
          state && state.charPixelOffset[line] && state.charPixelOffset[line][i] !== null ? (
            <ChordSpan key={i} chord={chord}
              onClick={e => {
                e.stopPropagation();
                onClick(i, e)
              }}
            />
          ) : (
              <WidthCalculator
                text={chord.text}
                onComplete={charPixels =>
                  dispatch({
                    type: 'UPDATE_WIDTH',
                    payload: { line, chordIndex: i, charPixels }
                  })
                }
              />
            )
        ))
        }
      </ChordsLine>
      {state && state.caretLine === line && state.charPixelOffset[line] && (
        <>
          <ChordsToolbar />
          <CaretSpan />
        </>
      )}
    </BlockContainer >
  )
}

export default ChordsBlock;