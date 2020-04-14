import fixArabicNumbers from './fixArabicNumber';
import strComparator from './str-comparator';
import { IChordSlide, ChordSlide } from '@bit/zhuiks.lcbot.core.chords';
import { SlideType } from '@bit/zhuiks.lcbot.core.types';

/* eslint no-useless-concat: "off" */

const verse = '[0-9]+';
const chorus = '(?:ال)?' + 'قرار';
const chorusR = new RegExp(chorus);

let currentSlide: IChordSlide;
let slides: ChordSlide[];
let verseCounter: number;

const resetSlide = (allSlides: boolean = false) => {
    currentSlide = {
        type: SlideType.VERSE,
        name: '',
        lines: []
    }
    if (allSlides) {
        slides = [];
        verseCounter = 0;
    }
}
const setCurrentSlideType = (name: string) => {
    currentSlide.name = name;
    if (chorusR.test(name)) {
        currentSlide.type = SlideType.CHORUS;
    } else { // if 'VERSE'
        // verseCounter++;
    }

}
const addNewSlide = (name: string = '') => {
    // console.log(currentSlide, name, verseCounter)
    if (currentSlide.lines?.length || currentSlide.name) {
        if (currentSlide.type === SlideType.VERSE) {
            verseCounter++;
            if (!currentSlide.name) {
                currentSlide.name = verseCounter.toString();
            }
        }
        if(slides.filter(slide => (
            strComparator(slide.lines?.join('\n'), currentSlide.lines?.join('\n'))
        )).length) {
            currentSlide.lines = [];
        }
        slides.push(new ChordSlide(currentSlide));
        resetSlide();
    }
    setCurrentSlideType(name);
}

const addCurrentSlideLine = (str: string) => {
    str = str.trim().replace(/^\( */, '|:').replace(/ *\) *[x|*]? *(\d)?$/, ':|');
    if (str.length) {
        currentSlide.lines && currentSlide.lines.push(str);
    }
}

const textBreaker = (input: string) => {
    const slideNamesRegex = new RegExp(`^ *(${verse}|${chorus}) *[-–:.]* *`, 'iu');
    resetSlide(true);
    fixArabicNumbers(input.trim())
        .split(/\r\n|[\n\v\f\r\x85\u2028\u2029]/).forEach(line => {
            line = line.trim()
            if (line.length) {
                const m = slideNamesRegex.exec(line);
                if (m !== null) {
                    const [fullMatch, slideHeader] = m;
                    // console.log(m, m[0].length);
                    addNewSlide(slideHeader); //it's a new slide 
                    line = line.slice(fullMatch.length);
                }
                addCurrentSlideLine(line);
            } else if (currentSlide.lines && currentSlide.lines.length) {
                addNewSlide();
            }
        });
    addNewSlide();
    return slides;
}
export default textBreaker;