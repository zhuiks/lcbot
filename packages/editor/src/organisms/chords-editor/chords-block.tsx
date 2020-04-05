import React from "react";
import { ContentState, ContentBlock, EditorBlock } from 'draft-js';
import styled from 'styled-components';
import ChordSpan from "./chord-span";
import { IChord } from "../../chords/chord";

const CHORDS_PADDING = 1.1;
const ChordsLine = styled.div`
    position: absolute;
    z-index: -1;
    display: flex;
`;

const BlockContainer = styled.div`
    & > .public-DraftStyleDefault-block {
        padding-top: ${(CHORDS_PADDING).toString() + 'em'}
    }
`;

export interface ChordsBlockProps {
    block: ContentBlock;
    contentState: ContentState;
    blockProps?: any
}

export const ChordsBlock: React.FC<ChordsBlockProps> = (props) => {
    const blockData = props.block.getData();
    const chords = blockData.has('chords') ? blockData.get('chords') : [];
    return (
        <BlockContainer>
            <ChordsLine className="chords">
                { chords.map((chord: IChord, i: number) => (
                    <ChordSpan key={i} chord={chord} paddingTop={CHORDS_PADDING} />
                ))
                }
            </ChordsLine>
            <EditorBlock {...props}/>
        </BlockContainer>
    )
}
const chordsBlockRenderer = (block: ContentBlock) => {
    return {
        component: ChordsBlock,
        editable: true,
        props: {

        }
    }
}

export default chordsBlockRenderer;