export const REST_CHAR = ' ';

export interface IChord {
    root?: string;
    quality?: string;
    type?: string;
    bass?: string;
    text?: string;
}

class Chord implements IChord {
    readonly root: string;
    readonly quality: string;
    readonly type: string;
    readonly bass: string;
    readonly text: string;
    constructor({ root = REST_CHAR, quality = '', type = '', bass = '', text = ' ' }: IChord) {
        this.root = root;
        this.quality = quality;
        this.type = type;
        this.bass = bass;
        this.text = text;
    }
}

export default Chord;