import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
import { ChordActionType } from '@bit/zhuiks.lcbot.core.types';
import { KeyboardEvent } from 'react';
const { hasCommandModifier } = KeyBindingUtil;

export const keyBinding = (e: KeyboardEvent<{}>) => {
    switch (e.keyCode) {
        case 67:   // C
            return ChordActionType.ADD_CHORD_C;
        case 68:   // D
            return ChordActionType.ADD_CHORD_D;
        case 69:   // E
            return ChordActionType.ADD_CHORD_E;
        case 70:   // F
            return ChordActionType.ADD_CHORD_F;
        case 71:   // G
            return ChordActionType.ADD_CHORD_G;
        case 65:   // A
            return ChordActionType.ADD_CHORD_A;
        case 66:   // B
            return ChordActionType.ADD_CHORD_B;
        case 51: // 3/# 
            return ChordActionType.MOD_CHORD_SHARP;
        case 77: // m
        case 173: // - (firefox)
        case 189: // -
            return ChordActionType.MOD_CHORD_MIN;
        case 73: // i
        case 79: // o
            return ChordActionType.MOD_CHORD_DIM;
        case 61: // = / + (firefox)
        case 187: // = / +
        case 85: // u
            return ChordActionType.MOD_CHORD_AUG;
        case 83: // s 
            if(hasCommandModifier(e)) {
                return 'SLIDE_UPDATE';
            }
            return ChordActionType.OPT_CHORD_SUS;
        case 55: // 7 
            return ChordActionType.OPT_CHORD_7;
        case 50: // 2 
            return ChordActionType.OPT_CHORD_2;
        case 46: // del 
            return ChordActionType.DEL_CHORD_DEL;
        case 8: // backspace 
            return ChordActionType.DEL_CHORD_BS;
        case 13: // enter
            return 'SLIDE_UPDATE';
        case 32: // " " 
        case 186:
        case 188:
        case 190:
        case 191:
        case 192:
        case 219:
        case 220:
        case 221:
        case 222:
            return 'skip';

        // case 35: //Home
        // case 36: //End   
        // case 37:
        // case 38:
        // case 39:
        // case 40:
        //     return 'MOVE_CURSOR';
    }
    console.log(e.keyCode);
    if (48 <= e.keyCode && e.keyCode <= 90) { //skip all 0-1 a-z keys
        return 'skip';
    }
    return getDefaultKeyBinding(e);
}

export const handleChords = (command: string) => {

    switch (command) {
        case 'chord-C':
    }
    const chordData = {
        root: command.toUpperCase(),
    }

    return chordData;
}

