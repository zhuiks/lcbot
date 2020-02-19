/* tslint:disable */
/* eslint-disable */
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

export interface SlideInput {
  type: SlideType;
  name?: string | null;
  lines?: string[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
