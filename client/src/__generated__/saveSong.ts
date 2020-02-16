/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SlideInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: saveSong
// ====================================================

export interface saveSong_saveSong_song {
  __typename: "Song";
  id: string;
  title: string | null;
  text: (string | null)[];
}

export interface saveSong_saveSong {
  __typename: "UpdateResponce";
  success: boolean;
  message: string | null;
  song: saveSong_saveSong_song | null;
}

export interface saveSong {
  saveSong: saveSong_saveSong | null;
}

export interface saveSongVariables {
  title: string;
  slides: SlideInput[];
  links?: (string | null)[] | null;
}
