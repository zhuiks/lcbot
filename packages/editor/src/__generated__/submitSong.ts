/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SlideInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: submitSong
// ====================================================

export interface submitSong_addSong_song {
  __typename: "Song";
  id: string;
  title: string | null;
  text: (string | null)[];
}

export interface submitSong_addSong {
  __typename: "UpdateResponce";
  success: boolean;
  message: string | null;
  song: submitSong_addSong_song | null;
}

export interface submitSong {
  addSong: submitSong_addSong | null;
}

export interface submitSongVariables {
  songId: string;
  title: string;
  slides?: (SlideInput | null)[] | null;
  links?: (string | null)[] | null;
}
