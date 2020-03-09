import React from "react";
import { SlideInput } from "../__generated__/globalTypes";
import SongSlide from "@bit/zhuiks.lcbot.song-slide";
import { Editor, EditorState, ContentState, ContentBlock, DraftHandleValue } from 'draft-js';
import chordsBlockRenderer from "../molecules/chords-block";
import { useSlide } from "../molecules/actions-slide";
import handleChords from "../molecules/handle-chords";
import ChordSlide from "../molecules/chord-slide";


export interface ChordEditorProps {
    slide: ChordSlide;
}
const ChordEditor: React.FC<ChordEditorProps> = ({ slide }) => {
    const { editorState, dispatch } = useSlide(slide);
    const onChange = (newState: EditorState) => {
        dispatch({type: 'SELECTION_CHANGE', payload: newState})
    }
    const handleCharInput = handleChords(dispatch);
    return (
        <Editor
            editorState={editorState}
            onChange={onChange}
            blockRendererFn={chordsBlockRenderer}
            handleBeforeInput={handleCharInput}
        //    handleKeyCommand={action('key-command')}
        />
    );
}

export default ChordEditor;