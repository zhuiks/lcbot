/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SlideType } from "./globalTypes";

// ====================================================
// GraphQL query operation: SongDetails
// ====================================================

export interface SongDetails_song_slides_chords {
  __typename: "Chord";
  root: string;
  quality: string | null;
  type: string | null;
  bass: string | null;
  text: string;
}

export interface SongDetails_song_slides {
  __typename: "Slide";
  type: SlideType;
  name: string | null;
  lines: string[] | null;
  chords: ((SongDetails_song_slides_chords | null)[] | null)[] | null;
}

export interface SongDetails_song {
  __typename: "Song";
  id: string;
  title: string | null;
  slides: (SongDetails_song_slides | null)[] | null;
  links: (string | null)[] | null;
}

export interface SongDetails {
  song: SongDetails_song | null;
}

export interface SongDetailsVariables {
  songId: string;
}
