/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum SlideType {
  BRIDGE = "BRIDGE",
  CHORUS = "CHORUS",
  INTRO = "INTRO",
  OUT = "OUT",
  PRE = "PRE",
  SOLO = "SOLO",
  VERSE = "VERSE",
}

export interface ChordInput {
  root: string;
  quality?: string | null;
  type?: string | null;
  bass?: string | null;
  text: string;
}

export interface SlideInput {
  type: SlideType;
  name?: string | null;
  lines?: string[] | null;
  chords?: ((ChordInput | null)[] | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
