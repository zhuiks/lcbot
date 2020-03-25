import React from "react";
import { Editor, EditorState, DraftHandleValue } from 'draft-js';
import chordsBlockRenderer from "./chords-block";
import { useSlide } from "./use-slide";
import { keyBinding } from "./key-binding";
import ChordSlide from "../../chords/chord-slide";


export interface ChordEditorProps {
    slide: ChordSlide;
    onChange?: (s: ChordSlide) => void;
}

const ChordEditor: React.FC<ChordEditorProps> = ({ slide: initialSlide, onChange }) => {
    const { editorState, slide, dispatch } = useSlide(initialSlide);
    const onEditorChange = (newState: EditorState) => {
        dispatch({ type: 'SELECTION_CHANGE', editorState: newState })
        if(onChange && !Object.is(slide, initialSlide)) {
            onChange(slide);
        }
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
            onChange={onEditorChange}
            blockRendererFn={chordsBlockRenderer}
            // handleBeforeInput={onCharInput}
            handleKeyCommand={onKeyCommand}
            keyBindingFn={keyBinding}
        />
    );
}

export default ChordEditor;