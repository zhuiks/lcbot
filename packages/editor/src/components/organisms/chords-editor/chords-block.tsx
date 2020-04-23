import React from "react";
import { ContentState, ContentBlock, EditorBlock } from 'draft-js';
import styled from 'styled-components';
import ChordSpan from "./chord-span";
import { Chord } from "@bit/zhuiks.lcbot.core.chords";

export const CHORDS_PADDING = 1.1;
const ChordsLine = styled.div`
    position: relative;
    display: flex;
`;

const BlockContainer = styled.div`
    & > .public-DraftStyleDefault-block {
        padding-top: ${(CHORDS_PADDING).toString() + 'em'};
        position: relative;
        caret-color: red;
    }
`;

export interface ChordsBlockProps {
    chords: Chord[];
}

const ChordsBlock: React.FC<ChordsBlockProps> = ({chords}) => {
    return (
        <BlockContainer>
            <ChordsLine className="chords" contentEditable={false}>
                { chords.map((chord: Chord, i: number) => (
                    <ChordSpan key={i} chord={chord} paddingTop={CHORDS_PADDING} />
                ))
                }
            </ChordsLine>
        </BlockContainer>
    )
}

export default ChordsBlock;