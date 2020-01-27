/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: saveSong
// ====================================================

export interface saveSong_saveSong {
  __typename: "UpdateResponce";
  success: boolean;
  message: string | null;
}

export interface saveSong {
  saveSong: saveSong_saveSong | null;
}

export interface saveSongVariables {
  title?: string | null;
  text: (string | null)[];
  links?: (string | null)[] | null;
}
