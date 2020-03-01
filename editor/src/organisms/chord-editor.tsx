import React from "react";
import { SlideInput } from "../__generated__/globalTypes";
import SongSlide from "@bit/zhuiks.lcbot.song-slide";
import { Editor, EditorState, ContentState, ContentBlock, convertFromRaw } from 'draft-js';
import ChordSpan from "../atoms/chord-span";

interface ChordigyBlockProps {
    block: ContentBlock;
    contentState: ContentState;
    blockProps?: any
}
const ChordifyBlock: React.FC<ChordigyBlockProps> = ({block, contentState, blockProps}) => {
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
            entityDivs.push(<ChordSpan chord="C">{text.slice(start, end)}</ChordSpan>)
        }
      );
    return (
        <div>
            <div className="chordsLine">{entityDivs}</div>
        <div>{text}</div>
        </div>
    )
}
const blockRenderer = (block: ContentBlock) => {
    return {
        component: ChordifyBlock,
        editable: true,
        props: {

        }
    }
}


interface ChordEditorProps {
    slide: SlideInput
}

const ChordEditor: React.FC<ChordEditorProps> = ({ slide }) => {
    const startText = slide.lines && slide.lines[0] || 'aaa';
    // const contentState = ContentState.createFromText(startText);
    const contentState = convertFromRaw({
        blocks: [{
            text: "Dont worry, be happy! pa-pa-pa",
            type: 'unstyled',
            entityRanges: [
                {offset: 0, length: 4, key: 'randomId'},
                {offset: 6, length: 5, key: 'randomId'},
            ],
        }],
        entityMap: {
            randomId: {
                type: 'CHORD',
                mutability: 'IMMUTABLE',
            },
        }
    });
    const [editorState, setEditorState] = React.useState(
        EditorState.createWithContent(contentState),
    );
    return (
        <Editor
            editorState={editorState}
            onChange={setEditorState}
            blockRendererFn={blockRenderer}
        />
    );
}

export default ChordEditor;