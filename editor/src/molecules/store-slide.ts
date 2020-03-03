import { useState, useReducer } from "react"
import { EditorState, convertFromRaw, ContentState } from "draft-js";
import { SlideInput, SlideType } from "../__generated__/globalTypes";

const slide2editor = (slide: SlideInput) => {
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
    slide: SlideInput;
    editorState: EditorState;
}
interface SlideActionType {
    type: 'update' | 'reset';
    payload?: any;
}
const slideReducer = (state: SlideEditorState, action: SlideActionType) => {
    switch (action.type) {
        case 'update':
          return {
              editorState: action.payload,
              slide: editor2slide(action.payload)
            };
        default:
          throw new Error();
      }
}

export const useSlide = (initialSlide: SlideInput) => {
    const [state, dispatch] = useReducer(slideReducer, {
        slide: initialSlide, 
        editorState: slide2editor(initialSlide),
    });
    return {
        editorState: state.editorState,
        updateSlide: (newEditorState: EditorState) => {
            dispatch({type: 'update', payload: newEditorState})
        },
    }
}