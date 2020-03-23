import React from "react";
import { Editor, EditorState, DraftHandleValue } from 'draft-js';
import chordsBlockRenderer from "./chords-block";
import { useSlide } from "./use-slide";
import handleChords, { keyBinding } from "./key-binding";
import ChordSlide from "../../chords/chord-slide";


export interface ChordEditorProps {
    slide: ChordSlide;
}
const ChordEditor: React.FC<ChordEditorProps> = ({ slide }) => {
    const { editorState, dispatch } = useSlide(slide);
    const onChange = (newState: EditorState) => {
        dispatch({ type: 'SELECTION_CHANGE', editorState: newState })
    }
    const onCharInput = (chars: string, es: EditorState) => {

        dispatch({ type: 'ADD_CHORD', editorState: es, payload: handleChords(chars) });

        const handled: DraftHandleValue = "handled";
        return handled;
    }
    const onKeyCommand = (command: string, es: EditorState) => {

        console.log(command);
        if(/^[A-Z]{3}_CHORD_\S+$/.test(command)) {
            dispatch({ type: command, editorState: es });
        }

        const handled: DraftHandleValue = command === "MOVE_CURSOR" ? "not-handled" : "handled";
        return handled;
    }

    return (
        <Editor
            editorState={editorState}
            onChange={onChange}
            blockRendererFn={chordsBlockRenderer}
            // handleBeforeInput={onCharInput}
            handleKeyCommand={onKeyCommand}
            keyBindingFn={keyBinding}
        />
    );
}

export default ChordEditor;