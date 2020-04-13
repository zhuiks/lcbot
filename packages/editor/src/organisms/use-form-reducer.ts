import { useReducer } from 'react';
import { useUpdateSong } from '../molecules/use-update-song';
import { ChordSlide } from '@bit/zhuiks.lcbot.core.chords';
import { SongDetails_song as ISongData } from '../__generated__/SongDetails';

const nullToUndefined = (value: any): any => {
    if (Array.isArray(value)) {
        return value.map(nullToUndefined)
    }
    if (value === null) {
        return undefined
    }
    if (typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, val]) => [key, nullToUndefined(val)])
        );
    }
    return value
}
// export interface ISongData {
//     id: string;
//     title?: string | null;
//     text?: (string | null)[];
//     slides?: (IChordSlide[] | null) | null;
//     links?: (string | null)[] | null;
// }
type UpdateSongCb = (data: any) => any;

interface FormEditState {
    songId: string
    songTitle: string;
    slides: ChordSlide[];
    editSlide: number;
    slideName: string;
    updateSong: UpdateSongCb;
}

interface InitData {
    songData: ISongData;
    updateSong: UpdateSongCb;
}
export const initForm = ({ songData, updateSong }: InitData): FormEditState => {
    const chordSlides = songData.slides ?
        songData.slides.map(slide => new ChordSlide(nullToUndefined(slide))) : [];
    return {
        songId: songData.id,
        songTitle: songData.title || '',
        slides: chordSlides,
        editSlide: -1,
        slideName: '',
        updateSong,
    }
}

export type FormActionType = 'CHORDS_EDIT' | 'CHORDS_UPDATE' | 'TITLE_CHANGE' | 'NAME_CHANGE' | 'SONG_SAVE';
export interface FormAction {
    type: FormActionType;
    payload?: any;
}

const formReducer = (state: FormEditState, action: FormAction): FormEditState => {
    switch (action.type) {
        case 'TITLE_CHANGE':
            return {
                ...state,
                songTitle: action.payload,
            };
        case 'NAME_CHANGE':
            return {
                ...state,
                slideName: action.payload,
            };
        case 'CHORDS_EDIT':
            const editSlide = action.payload;
            if (editSlide === state.editSlide || !state.slides[editSlide]) {
                return state;
            }
            return {
                ...state,
                slideName: state.slides[editSlide].name,
                editSlide,
            };
        case 'CHORDS_UPDATE':
            console.log('form reducer: dispatch CHORDS_UPDATE');
            if (!state.slides[state.editSlide]) {
                return state;
            }
            const slide = new ChordSlide({
                type: state.slides[state.editSlide].type,
                name: state.slideName,
                lines: action.payload.lines,
                chords: action.payload.chords,
            })
            return {
                ...state,
                slides: [
                    ...state.slides.slice(0, state.editSlide),
                    slide,
                    ...state.slides.slice(state.editSlide + 1),
                ],
                editSlide: -1,
            };
        case 'SONG_SAVE':
            if (typeof state.updateSong === 'function') {
                state.updateSong({
                    songId: state.songId,
                    title: state.songTitle,
                    slides: state.slides,
                    links: []
                });
            }
            return state;
        default:
            throw new Error(`Action "${action.type}" not found in form reducer`);
    }
}

const useFormReducer = (songData: ISongData) => {
    const { updateSong, mutationResult } = useUpdateSong();
    const [state, dispatch] = useReducer(formReducer, { songData, updateSong }, initForm)
    return {
        state,
        dispatch,
        mutationResult,
    }
}

export default useFormReducer;