import fixArabicNumbers from './fixArabicNumber';
import { SlideInput, SlideType } from '../__generated__/globalTypes';

const verse = '[0-9]+';
const chorus = '(?:ال)?' + 'قرار';
const chorusR = new RegExp(chorus);

let currentSlide: SlideInput;
let slides: SlideInput[];
let verseCounter: number;

const resetSlide = (allSlides: boolean = false) => {
    currentSlide = {
        type: SlideType.VERSE,
        name: '1',
        lines: []
    }
    if(allSlides) {
        slides = [];
        verseCounter = 1;
    }
}
const setSlideType = (name: string) => {
    currentSlide.name = name;
    if (chorusR.test(name)) {
        currentSlide.type = SlideType.CHORUS;
    } else { // if 'VERSE'
        verseCounter = parseInt(name);
    }

}
const addSlide = (name: string = '') => {
    // console.log(currentSlide, name, verseCounter)
    if (currentSlide.lines && currentSlide.lines.length) {
        slides.push(currentSlide);
        resetSlide();
    }
    setSlideType(name);
}

const addLine = (str: string) => {
    str = str.trim().replace(/^\( */, '|:').replace(/ *\) *[x|\*]? *(\d)?$/, ':|');
    if(str.length) {
        currentSlide.lines && currentSlide.lines.push(str);
    }
}

const textBreaker = (input: string) => {
    const regex = new RegExp(`^ *(${verse}|${chorus}) *[-|–|:]* *`, 'iu');
    resetSlide(true);
    fixArabicNumbers(input.trim())
        .split(/\r\n|[\n\v\f\r\x85\u2028\u2029]/).forEach(line => {
            line = line.trim()
            if (line.length) {
                const m = regex.exec(line);
                if (m !== null) {
                    const [fullMatch, slideHeader] = m;
                    // console.log(m, m[0].length);
                    addSlide(slideHeader); //m.groups && m.groups.type_name;
                    line = line.slice(fullMatch.length);
                }
                addLine(line);
            } else if(currentSlide.lines && currentSlide.lines.length) {
                verseCounter++;
                addSlide(verseCounter.toString());
            }
        });
    addSlide();
    return slides;
}
export default textBreaker;