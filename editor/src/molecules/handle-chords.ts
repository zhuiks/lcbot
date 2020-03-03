import { DraftHandleValue, EditorState, Modifier } from "draft-js";

const chordEntityType = 'CHORD';
const chordEntityMutability = 'MUTABLE';

const handleChords = (callback: any) => (chars: string, editorState: EditorState) => {
    console.log(`"${chars}"@${editorState.getSelection().getEndOffset()}`);

    const chordData = {
        chord: chars.toUpperCase(),
    }

    const contentstate = editorState.getCurrentContent();

    // Returns ContentState record updated to include the newly created DraftEntity record in it's EntityMap.
    const entityContentState = contentstate.createEntity(chordEntityType, chordEntityMutability, chordData);

    // Call getLastCreatedEntityKey to get the key of the newly created DraftEntity record.
    const entityKey = contentstate.getLastCreatedEntityKey();

    // Get the current selection
    const selectionState = editorState.getSelection();

    // Add the created entity to the current selection, for a new contentState
    const newContentState = Modifier.applyEntity(
        entityContentState,
        selectionState,
        entityKey
    );

    // Add newContentState to the existing editorState, for a new editorState
    const newEditorState = EditorState.push(
        editorState,
        newContentState,
        'apply-entity'
    );
    
    callback(newEditorState);

    const handled: DraftHandleValue = "handled";
    return handled;
}

export default handleChords;