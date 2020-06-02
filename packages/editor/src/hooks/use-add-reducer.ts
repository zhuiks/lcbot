import { useReducer } from "react";
import { ChordSlide } from "@bit/zhuiks.lcbot.core.chords";
import textBreaker from "../utils/text-breaker";
import validateLink from "../utils/validate-link"
import useSubmitSong from "./use-submit-song";

type SubmitSongCb = (data: any) => any;

interface AddFormState {
  songId: string;
  songLyrics: string;
  songTitle: string;
  slides: ChordSlide[];
  songLink: string;
  isLinkInvalid: boolean;
  submitSong: SubmitSongCb;
}

interface InitArgs {
  songId: string;
  submitSong: SubmitSongCb;
}

export const initForm = ({ songId, submitSong }: InitArgs): AddFormState => (
  {
    songId,
    songLyrics: '',
    songTitle: '',
    slides: [],
    songLink: '',
    isLinkInvalid: false,
    submitSong,
  }
)

export type AddFormActionType = 'SET_LYRICS' | 'SET_TITLE' | 'SET_LINK' | 'CONFIRM_LYRICS' | 'VALIDATE_LINK' | 'SAVE_SONG';
export interface AddFormAction {
  type: AddFormActionType;
  payload?: any;
}

const formReducer = (state: AddFormState, action: AddFormAction): AddFormState => {
  switch (action.type) {
    case 'SET_LYRICS':
      return {
        ...state,
        songLyrics: action.payload,
      }
    case 'SET_TITLE':
      return {
        ...state,
        songTitle: action.payload,
      }
    case 'SET_LINK':
      return {
        ...state,
        songLink: action.payload.trim(),
        isLinkInvalid: false,
      }
    case 'CONFIRM_LYRICS':
      const slides = textBreaker(state.songLyrics);
      return {
        ...state,
        slides,
        songTitle: state.songTitle || slides[0].lines[0].replace(/\|:|:\|/g, '').trim()
      }
    case 'VALIDATE_LINK':
      return {
        ...state,
        isLinkInvalid: !validateLink(state.songLink)
      }
    case 'SAVE_SONG':
      if (validateLink(state.songLink)) {
        state.submitSong({
          songId: state.songId,
          title: state.songTitle,
          slides: state.slides.map((slide: ChordSlide) => ({
            ...slide,
            chords: undefined,
          })),
          links: state.songLink !== '' ? [state.songLink] : []
        });
      }
      return state;
    default:
      throw new Error(`Action "${action.type}" not found in add form reducer`);
  }
}

const useAddReducer = (songId: string) => {
  const { submitSong, mutationResult } = useSubmitSong();
  const [state, dispatch] = useReducer(formReducer, { songId, submitSong }, initForm)
  return {
    state,
    dispatch,
    mutationResult,
  }
}

export default useAddReducer;