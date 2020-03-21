import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
import { KeyboardEvent } from 'react';
const { hasCommandModifier } = KeyBindingUtil;

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
        case 37:
        case 38:
        case 39:
        case 40:
            return 'MOVE_CURSOR';
    }
    return getDefaultKeyBinding(e) || 'skip';
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

