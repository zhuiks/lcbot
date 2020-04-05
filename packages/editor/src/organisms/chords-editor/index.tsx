import React from "react";
import { Editor, EditorState, DraftHandleValue } from 'draft-js';
import chordsBlockRenderer from "./chords-block";
import useSlide from './use-slide';
import { keyBinding } from "./key-binding";
import ChordSlide from "../../chords/chord-slide";
import { ChordActions } from "../../types";


export interface ChordEditorProps {
    slide: ChordSlide;
    onSave?: (s: ChordSlide) => void;
}

const ChordEditor: React.FC<ChordEditorProps> = ({ slide: initialSlide, onSave }) => {
    const { editorState, dispatch } = useSlide(initialSlide, onSave);
    const onEditorChange = (newState: EditorState) => {
        dispatch({ type: 'SELECTION_CHANGE', editorState: newState })
    }

    const onKeyCommand = (command: ChordActions, es: EditorState) => {

        console.log(command);
        if (/^[A-Z]{3}_CHORD_\S+$/.test(command)) {
            dispatch({ type: command, editorState: es });
        }

        const handled: DraftHandleValue = "handled";
        return handled;
    }

    return <Editor
        editorState={editorState}
        onChange={onEditorChange}
        blockRendererFn={chordsBlockRenderer}
        // handleBeforeInput={onCharInput}
        handleKeyCommand={onKeyCommand}
        keyBindingFn={keyBinding}
    />
}

export default ChordEditor;