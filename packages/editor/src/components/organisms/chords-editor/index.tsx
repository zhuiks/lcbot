import React from "react";
import { Editor, EditorState, DraftHandleValue } from 'draft-js';
import chordsBlockRenderer from "./chords-block";
import useSlide from "./slide-reducer";
import { SlideActionType } from './slide-reducer';
import { keyBinding } from "./key-binding";
import { ChordSlide } from "@bit/zhuiks.lcbot.core.chords";


export interface ChordEditorProps {
    slide: ChordSlide;
    onSave?: (s: ChordSlide) => void;
}

const ChordEditor: React.FC<ChordEditorProps> = ({ slide: initialSlide, onSave }) => {
    const [ state, dispatch ] = useSlide(initialSlide, onSave);
    const onEditorChange = (newState: EditorState) => {
        dispatch({ type: 'SELECTION_CHANGE', editorState: newState })
    }

    const onKeyCommand = (command: SlideActionType, es: EditorState) => {

        console.log(command);
        if (/^[A-Z]{3}_CHORD_\S+$/.test(command) || command === 'SLIDE_UPDATE') {
            dispatch({ type: command, editorState: es });
        }

        const handled: DraftHandleValue = "handled";
        return handled;
    }

    return <Editor
        editorState={state.editorState}
        onChange={onEditorChange}
        blockRendererFn={chordsBlockRenderer}
        // handleBeforeInput={onCharInput}
        handleKeyCommand={onKeyCommand}
        keyBindingFn={keyBinding}
    />
}

export default ChordEditor;