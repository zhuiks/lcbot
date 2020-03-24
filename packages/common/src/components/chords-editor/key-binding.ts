import { getDefaultKeyBinding } from 'draft-js';
import { KeyboardEvent } from 'react';
// const { hasCommandModifier } = KeyBindingUtil;

export const keyBinding = (e: KeyboardEvent<{}>) => {
    switch (e.keyCode) {
        case 67:   // C
            return 'ADD_CHORD_C';
        case 68:   // D
            return 'ADD_CHORD_D';
        case 69:   // E
            return 'ADD_CHORD_E';
        case 70:   // F
            return 'ADD_CHORD_F';
        case 71:   // G
            return 'ADD_CHORD_G';
        case 65:   // A
            return 'ADD_CHORD_A';
        case 66:   // B
            return 'ADD_CHORD_B';
        case 51: // 3/# 
            return 'MOD_CHORD_SHARP';
        case 77: // m
        case 189: // -
            return 'MOD_CHORD_MIN';
        case 73: // i
        case 79: // o
            return 'MOD_CHORD_DIM';
        case 187: // = / +
        case 85: // u
            return 'MOD_CHORD_AUG';
        case 83: // s 
            return 'OPT_CHORD_SUS';
        case 55: // 7 
            return 'OPT_CHORD_7';
        case 50: // 2 
            return 'OPT_CHORD_2';
        case 46: // del 
            return 'DEL_CHORD_DEL';
        case 8: // backspace 
            return 'DEL_CHORD_BS';
        // case 32: // " " 
        //     return 'DEL_CHORD__';

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

