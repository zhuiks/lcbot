/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSongList
// ====================================================

export interface GetSongList_songs {
  __typename: "Song";
  id: string;
  title: string | null;
}

export interface GetSongList {
  songs: (GetSongList_songs | null)[];
}
