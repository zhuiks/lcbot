import React from "react";
import { SlideInput } from "../__generated__/globalTypes";
import SongSlide from "@bit/zhuiks.lcbot.song-slide";
import { Editor, EditorState, ContentState, ContentBlock, DraftHandleValue } from 'draft-js';
import chordsBlockRenderer from "../molecules/chords-block";
import { useSlide } from "../molecules/store-slide";
import handleChords from "../molecules/handle-chords";



interface ChordEditorProps {
    slide: SlideInput
}
const ChordEditor: React.FC<ChordEditorProps> = ({ slide }) => {
    const { editorState, updateSlide } = useSlide(slide);
    const handleCharInput = handleChords(updateSlide);
    return (
        <Editor
            editorState={editorState}
            onChange={updateSlide}
            blockRendererFn={chordsBlockRenderer}
            handleBeforeInput={handleCharInput}
        //    handleKeyCommand={action('key-command')}
        />
    );
}

export default ChordEditor;