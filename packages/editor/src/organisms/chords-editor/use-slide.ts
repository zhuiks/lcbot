import { useReducer } from 'react';
import ChordSlide from '../../chords/chord-slide';
import slideReducer, { initState } from './slide-reducer';



const useSlide = (initialSlide: ChordSlide, onSave?: (s: ChordSlide) => void) => {
    const initialState = initState(initialSlide, onSave);
    const [state, dispatch] = useReducer(slideReducer, initialState);
    return {
        editorState: state.editorState,
        dispatch,
    }
}

export default useSlide;

