import { useState, useReducer } from "react"
import { EditorState, convertFromRaw, ContentState, SelectionState } from "draft-js";
import { SlideInput, SlideType } from "../__generated__/globalTypes";
import { Chord } from "../atoms/chord-span";
import ChordSlide from "./chord-slide";
import { ActionDisplay } from "@storybook/addon-actions";

export const slide2editor = (slide: ChordSlide | undefined) => {
    if (!slide) {
        return EditorState.createEmpty();
    }
    const state = ContentState.createFromText(slide.lines?.join('\n') || '');
    const editor = EditorState.createWithContent(state);
    return editor;
}
const editor2slide = (editor: EditorState) => {
    const content = editor.getCurrentContent();
    const slide: SlideInput = {
        type: SlideType.VERSE,
        lines: content.getPlainText('\n').split('\n'),
    }
    return slide;
}

interface SlideEditorState {
    chordSlide: ChordSlide;
    currentLine: number;
    currentPosition: number;
    editorState: EditorState;
}

const initState = (slide: ChordSlide) => {
    return {
        chordSlide: slide,
        currentLine: 0,
        currentPosition: 0,
        editorState: slide2editor(slide),
    }
}

interface SlideActionType {
    type: 'RESET' | 'ADD_CHORD' | 'SELECTION_CHANGE';
    selection?: SelectionState;
    data?: any;
    slide?: ChordSlide;
}
const slideReducer = (state: SlideEditorState, action: SlideActionType): SlideEditorState => {
    switch (action.type) {
        case 'RESET':
            return action.slide ? initState(action.slide) : state;
        case 'ADD_CHORD':
            return {
                ...state,
            };
        case 'SELECTION_CHANGE':
            if(!action.selection) return state;
            const blockMapKeys = state.editorState.getCurrentContent().getBlockMap().keySeq();
            const currentBlockKey = action.selection.getAnchorKey();
            console.log(`[${blockMapKeys.findIndex(k => k === currentBlockKey)}, ${action.selection.getAnchorOffset()}]`);
            return {
                ...state,
                currentPosition: action.selection.getAnchorOffset(),
                currentLine: blockMapKeys.findIndex(k => k === currentBlockKey),
            }
        default:
            throw new Error();
    }
}

export const useSlide = (initialSlide: ChordSlide) => {
    const initialState = initState(initialSlide);
    const [state, dispatch] = useReducer(slideReducer, initialState);
    return {
        editorState: state.editorState,
        dispatch
    }
}