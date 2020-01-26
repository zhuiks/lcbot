/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SongDetails
// ====================================================

export interface SongDetails_song {
  __typename: "Song";
  id: string;
  title: string | null;
  text: (string | null)[];
}

export interface SongDetails {
  song: SongDetails_song | null;
}

export interface SongDetailsVariables {
  songId: string;
}
