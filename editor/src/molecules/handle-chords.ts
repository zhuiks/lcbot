import { DraftHandleValue, EditorState, Modifier } from "draft-js";

const chordEntityType = 'CHORD';
const chordEntityMutability = 'MUTABLE';

const handleChords = (dispatch: any) => (chars: string, editorState: EditorState) => {

    const chordData = {
        rootNote: chars.toUpperCase(),
    }

    dispatch({type: 'ADD_CHORD', selection: editorState.getSelection(), data: chordData});

    const handled: DraftHandleValue = "handled";
    return handled;
}

export default handleChords;