/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SlideInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateSong
// ====================================================

export interface updateSong_updateSong_song {
  __typename: "Song";
  id: string;
  title: string | null;
  text: (string | null)[];
}

export interface updateSong_updateSong {
  __typename: "UpdateResponce";
  success: boolean;
  message: string | null;
  song: updateSong_updateSong_song | null;
}

export interface updateSong {
  updateSong: updateSong_updateSong | null;
}

export interface updateSongVariables {
  songId: string;
  title: string;
  slides?: (SlideInput | null)[] | null;
  links?: (string | null)[] | null;
}
