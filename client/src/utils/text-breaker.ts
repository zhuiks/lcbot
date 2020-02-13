import fixArabicNumbers from './fixArabicNumber';

const verse = '[0-9]+';
const chorus = '(?:ال)?' + 'قرار';
const chorusR = new RegExp(chorus);

export interface slideType {
    type: string;
    name: string | null;
    text: string[];
}

let currentSlide: slideType;
let slides: slideType[];
let verseCounter: number;

const resetSlide = (allSlides: boolean = false) => {
    currentSlide = {
        type: 'VERSE',
        name: '1',
        text: []
    }
    if(allSlides) {
        slides = [];
        verseCounter = 1;
    }
}
const setSlideType = (name: string) => {
    currentSlide.name = name;
    if (chorusR.test(name)) {
        currentSlide.type = 'CHORUS';
    } else { // if 'VERSE'
        verseCounter = parseInt(name);
    }

}
const addSlide = (name: string = '') => {
    // console.log(currentSlide, name, verseCounter)
    if (currentSlide.text.length) {
        slides.push(currentSlide);
        resetSlide();
    }
    setSlideType(name);
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
                    line = line.slice(fullMatch.length).trim();
                }
                if (line.length) {
                    currentSlide.text.push(line);
                }
            } else if(currentSlide.text.length) {
                verseCounter++;
                addSlide(verseCounter.toString());
            }
        });
    addSlide();
    return slides;
}
export default textBreaker;