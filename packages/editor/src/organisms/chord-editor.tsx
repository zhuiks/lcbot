import React from "react";
import { Editor, EditorState, DraftHandleValue } from 'draft-js';
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
        dispatch({type: 'SELECTION_CHANGE', editorState: newState})
    }
    const onCharInput = (chars: string, es: EditorState) => {
        
        dispatch({type: 'ADD_CHORD', editorState: es, payload: handleChords(chars)});

        const handled: DraftHandleValue = "handled";
        return handled;
        }
    return (
        <Editor
            editorState={editorState}
            onChange={onChange}
            blockRendererFn={chordsBlockRenderer}
            handleBeforeInput={onCharInput}
        //    handleKeyCommand={action('key-command')}
        />
    );
}

export default ChordEditor;