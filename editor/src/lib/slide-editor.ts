import { List, Map, OrderedSet } from "immutable";
import { EditorState, CharacterMetadata, ContentBlock, ContentState } from "draft-js";

import { SlideInput, SlideType } from "../__generated__/globalTypes";
import generateKey from "./generate-key";
import ChordSlide from "../molecules/chord-slide";
import { chords2block } from "./apply-chords";

const EMPTY_SET = OrderedSet();

export const slide2editor = (
    slide: ChordSlide,
    editorState: EditorState | null = null,
    changedBlockIndex: number = -1
) => {
    let state;
    const initState = editorState 
        ? editorState.getCurrentContent() 
        : ContentState.createFromText(slide.lines?.join('\n') || '');
    // if (!slide || !slide.lines) {
    //     return EditorState.createEmpty();
    // }
    const blockSeq = initState.getBlockMap().toIndexedSeq();
    if (changedBlockIndex < 0 && slide.chords.length > 0) {

    } else {
        state = chords2block(
            initState, 
            blockSeq.get(changedBlockIndex), 
            chords[changedBlockIndex]);
    }
    let entityMap = Map();
    const blocks = slide.lines.map((text, i) => {
        const chords = slide.chords[i];
        const entities = chords2block(text, chords, entityMap);
        const styles = Array(text.length).fill(EMPTY_SET);
        const characterArray = styles.map((style, ii) => {
            const entity = entities[ii];
            return CharacterMetadata.create({ style, entity });
        });
        return new ContentBlock({
            text,
            depth: 0,
            type: 'unstyled',
            key: generateKey(),
            data: Map(),
            characterList: List(characterArray),
        });
    });
    // const state = ContentState.createFromBlockArray(blocks, entityMap);
    const editor = EditorState.createWithContent(state);
    return editor;
}
export const editor2slide = (editor: EditorState) => {
    const content = editor.getCurrentContent();
    const slide: SlideInput = {
        type: SlideType.VERSE,
        lines: content.getPlainText('\n').split('\n'),
    }
    return slide;
}
