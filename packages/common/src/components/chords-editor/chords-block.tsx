import React from "react";
import { ContentState, ContentBlock } from 'draft-js';
import styled from 'styled-components';
import ChordSpan from "./chord-span";

const chordsPadding = 1.1;
const ChordsLine = styled.div`
    position: absolute;
    z-index: -1;
    display: flex;
`;

const TextLine = styled.div`
    padding-top: ${chordsPadding.toString() + 'em'}
`;
const BlockContainer = styled.div``;

export interface ChordsBlockProps {
    block: ContentBlock;
    contentState: ContentState;
    blockProps?: any
}

export const ChordsBlock: React.FC<ChordsBlockProps> = ({ block, contentState, blockProps }) => {
    const text = block.getText();
    let entityDivs: JSX.Element[] = [];
    block.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'CHORD'
            );
        },
        (start, end) => {
            const entityKey = block.getEntityAt(start);
            const entityData = contentState.getEntity(entityKey).getData();
            entityDivs.push(
                <ChordSpan key={start} chord={entityData.chord} paddingTop={chordsPadding} />
            )
        }
    );
    return (
        <BlockContainer>
            <ChordsLine className="chords">{entityDivs}</ChordsLine>
            <TextLine className="lyrics">{text}</TextLine>
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