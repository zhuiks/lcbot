import { ChordActionType } from '@bit/zhuiks.lcbot.core.types';
import { KeyboardEvent } from 'react';

export const keyBinding = (e: KeyboardEvent<{}>, dispatch: any) => {
    switch (e.keyCode) {
        case 67:   // C
            dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.ADD_CHORD_C });
            break;
        case 68:   // D
            dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.ADD_CHORD_D });
            break;
        case 69:   // E
            dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.ADD_CHORD_E });
            break;
        case 70:   // F
            dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.ADD_CHORD_F });
            break;
        case 71:   // G
            dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.ADD_CHORD_G });
            break;
        case 65:   // A
            dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.ADD_CHORD_A });
            break;
        case 66:   // B
            dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.ADD_CHORD_B });
            break;
        case 51: // 3/# 
            dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.MOD_CHORD_SHARP });
            break;
        case 77: // m
        case 173: // - (firefox)
        case 189: // -
            dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.MOD_CHORD_MIN });
            break;
        case 73: // i
        case 79: // o
            dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.MOD_CHORD_DIM });
            break;
        case 61: // = / + (firefox)
        case 187: // = / +
        case 85: // u
            dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.MOD_CHORD_AUG });
            break;
        case 83: // s 
            // if(hasCommandModifier(e)) {
            //     return 'SLIDE_UPDATE';
            // }
            dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.OPT_CHORD_SUS });
            break;
        case 55: // 7 
            dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.OPT_CHORD_7 });
            break;
        case 50: // 2 
            dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.OPT_CHORD_2 });
            break;
        case 46: // del 
            dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.DEL_CHORD_DEL });
            break;
        case 8: // backspace 
            dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.DEL_CHORD_BS });
            break;
        case 13: // enter
            dispatch({ type: 'SLIDE_UPDATE' });
            break;
        // case 32: // " " 
        // case 186:
        // case 188:
        // case 190:
        // case 191:
        // case 192:
        // case 219:
        // case 220:
        // case 221:
        // case 222:
        //     return 'skip';

        case 35: //Home
        case 36: //End   
        case 37:
            dispatch({ type: 'MOVE_CURSOR', payload: { x: -1, y: 0 } });
            break;
        case 38:
            dispatch({ type: 'MOVE_CURSOR', payload: { x: -1, y: 0 } });
            break;
        case 39:
            dispatch({ type: 'MOVE_CURSOR', payload: { x: -1, y: 0 } });
            break;
        case 40:
            dispatch({ type: 'MOVE_CURSOR', payload: { x: -1, y: 0 } });
            break;
    }
    console.log(e.keyCode);
    // if (48 <= e.keyCode && e.keyCode <= 90) { //skip all 0-1 a-z keys
    //     return '';
    // }
}

