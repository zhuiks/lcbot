import React from "react";
import { SlideInput } from "../__generated__/globalTypes";
import SongSlide from "@bit/zhuiks.lcbot.song-slide";
import { Editor, EditorState, ContentState, ContentBlock, DraftHandleValue } from 'draft-js';
import chordsBlockRenderer from "../molecules/chords-block";



/* const handleChords: DraftHandleValue = (chars: string, editorState: EditorState) => {
    console.log(`"${chars}"@${editorState.getSelection().getEndOffset()}`);
    
    return 'handled';
}
 */
interface ChordEditorProps {
    slide: SlideInput
}
const ChordEditor: React.FC<ChordEditorProps> = ({ slide }) => {
    const startText = slide.lines && slide.lines[0] || 'aaa';
    const contentState = ContentState.createFromText(startText);
    const [editorState, setEditorState] = React.useState(
        EditorState.createWithContent(contentState),
    );
    return (
        <Editor
            editorState={editorState}
            onChange={setEditorState}
            blockRendererFn={chordsBlockRenderer}
        //    handleBeforeInput={handleChords}
        //    handleKeyCommand={action('key-command')}
        />
    );
}

export default ChordEditor;